import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationOptions, cleanObject } from '@nx-monorepo-template/global';
import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  ObjectLiteral,
  Raw,
  Repository,
} from 'typeorm';

@Injectable()
export class BaseRepository<
  Entity extends ObjectLiteral,
  C = Record<string, any>,
  U = Record<string, any>,
  F extends PaginationOptions = PaginationOptions
> extends Repository<Entity> {
  constructor(
    protected entity: EntityTarget<Entity>,
    private dataSource: DataSource
  ) {
    super(entity, dataSource.createEntityManager());
  }

  protected searchFields(): string[] {
    return [];
  }

  protected mapRelations(): Record<
    string,
    BaseRepository<unknown> | ((input: C | U) => any)
  > {
    return undefined;
  }

  protected relations(): FindOptionsRelations<Entity> {
    return {};
  }

  protected modifyWhere(
    conditions: FindOptionsWhere<Entity>
  ): FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[] {
    return conditions;
  }

  protected async modifyResult(item: Entity): Promise<any> {
    return item;
  }

  private mapWhere(input: Record<string, any>) {
    const reducer = (curr, key) => ({
      ...curr,
      [key]: this.relations()[key]
        ? { id: Array.isArray(input[key]) ? In(input[key]) : input[key] }
        : input[key],
    });

    return Object.keys(input).reduce(reducer, {});
  }

  async paginated(options?: F) {
    const {
      search,
      page = 1,
      perPage = 10,
      orderBy,
      orderDir = 'ASC',
      ...otherOptions
    } = options;
    const mappedWhere = this.mapWhere(otherOptions);
    const findAndCountOptions: FindManyOptions<Entity> = {
      ...otherOptions,
      relations: this.relations(),
      where: this.modifyWhere(mappedWhere),
    };

    if (search) {
      findAndCountOptions.where = this.searchFields().map((key) => ({
        ...this.modifyWhere(mappedWhere),
        [key]: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:value)`, {
          value: `%${search}%`,
        }),
      })) as FindOptionsWhere<Entity>[];
    }

    if (perPage > -1) {
      findAndCountOptions.take = perPage;
      findAndCountOptions.skip = (page - 1) * perPage;
    }

    const convertStringToObject = (str: string, dir: string) => {
      const keys = str.split('.');
      const result = {};

      let currentObj = result;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        currentObj[key] = i === keys.length - 1 ? dir : {};
        currentObj = currentObj[key];
      }

      return result;
    };

    if (orderBy) {
      findAndCountOptions.order = convertStringToObject(
        orderBy,
        orderDir
      ) as unknown as FindOptionsOrder<Entity>;
    }

    const [list, count] = await this.findAndCount(findAndCountOptions);

    return {
      list: await Promise.all(
        list.map(async (item) => await this.modifyResult(item))
      ),
      count,
      page,
      perPage,
    };
  }

  async getById(id: string): Promise<Entity> {
    return this.modifyResult(
      await this.findOne({
        where: { id: id as any },
      })
    );
  }

  async getByIdWithRelations(id: string): Promise<Entity> {
    return this.modifyResult(
      await this.findOne({
        where: { id: id as any },
        relations: this.relations(),
      })
    );
  }

  async getManyByIds(ids: string[]) {
    const items = await this.find({
      where: { id: In(ids) as any },
    });
    return await Promise.all(
      items.map(async (item) => await this.modifyResult(item))
    );
  }

  async getManyByIdsWithRelations(ids: string[]) {
    const items = await this.find({
      where: { id: In(ids) as any },
      relations: this.relations(),
    });
    return await Promise.all(
      items.map(async (item) => await this.modifyResult(item))
    );
  }

  private async getPropertyValue(input: Record<string, any>, key: string) {
    const getValue = async (key: string, value: any) => {
      return typeof this.mapRelations()[key] === 'function'
        ? (
            (await this.mapRelations()[key]) as (
              input: Record<string, any>
            ) => any
          )(input)
        : (this.mapRelations()[key] as BaseRepository<unknown>).getById(value);
    };
    return this.mapRelations()?.[key]
      ? await getValue(key, input[key])
      : input[key];
  }

  public async createWithRelations(input: C) {
    const newItem = this.create(await this.createRelationsInput(input));
    await this.save(newItem);
    return this.getByIdWithRelations(newItem.id);
  }

  public async updateWithRelations(id: string | Record<string, any>, input: U) {
    const data = await this.updateRelationsInput(id, input);
    await this.save(data);
    return this.getByIdWithRelations(data.id);
  }

  private async createRelationsInput(input: C): Promise<DeepPartial<Entity>> {
    for (const key of Object.keys(input)) {
      input[key] = await this.getPropertyValue(input, key);
    }

    return input as DeepPartial<Entity>;
  }

  private async updateRelationsInput(
    id: string | Record<string, any>,
    input: U
  ): Promise<Entity> {
    const data =
      typeof id === 'string'
        ? await this.findOneBy({ id: id as any })
        : await this.findOneBy(id);
    if (!data) {
      throw new NotFoundException();
    }

    for (const key of Object.keys(input)) {
      data[key as keyof typeof data] = await this.getPropertyValue(input, key);
    }

    return cleanObject(data) as Entity;
  }
}
