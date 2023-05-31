import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Raw,
  Repository,
} from 'typeorm';

@Injectable()
export class BaseRepository<
  Entity extends ObjectLiteral
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

  protected mapRelations(): Record<string, BaseRepository<any>> {
    return undefined;
  }

  protected relations(): FindOptionsRelations<Entity> {
    return undefined;
  }

  protected modifyWhere(
    conditions: FindOptionsWhere<Entity>
  ): FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[] {
    return conditions;
  }

  private mapWhere(input: FindOptionsWhere<Entity>) {
    const reducer = (curr, key) => ({
      ...curr,
      [key]: this.relations()[key] ? { id: input[key] } : input[key],
    });

    return Object.keys(input).reduce(reducer, {});
  }

  async paginated(options?: {
    search?: string;
    page?: number;
    perPage?: number;
    orderBy?: string;
    orderDir?: 'ASC' | 'DESC';
  }) {
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
      list,
      count,
      page,
      perPage,
    };
  }

  getById(id: string) {
    return this.findOne({
      where: { id: id as any },
      relations: this.relations(),
    });
  }

  public async createWithRelations(input: Record<string, any>) {
    const newItem = this.create(await this.createRelationsInput(input));
    return this.save(newItem);
  }

  public async updateWithRelations(id: string, input: Record<string, any>) {
    return this.save(await this.updateRelationsInput(id, input));
  }

  private createRelationsInput(
    input: Record<string, any>
  ): DeepPartial<Entity> {
    const relationKeys = Object.keys(this.relations());
    const reducer = (curr, key) => ({
      ...curr,
      [key]: relationKeys.includes(key) ? { id: input[key] } : input[key],
    });
    return Object.keys(input).reduce(reducer, {});
  }

  private async updateRelationsInput(
    id: string,
    input: Record<string, any>
  ): Promise<Entity> {
    const data = await this.findOneBy({ id: id as any });
    if (!data) {
      throw new NotFoundException();
    }

    for (const key of Object.keys(input)) {
      data[key as keyof typeof data] = this.mapRelations()?.[key]
        ? await this.mapRelations()[key].findOneBy({ id: input[key] })
        : input[key];
    }

    return data;
  }
}
