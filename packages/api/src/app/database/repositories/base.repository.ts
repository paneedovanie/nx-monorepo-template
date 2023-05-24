import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntityTarget,
  FindManyOptions,
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

  async paginated(
    options?: Pick<
      FindManyOptions<Entity>,
      Exclude<keyof FindManyOptions<Entity>, 'take' | 'skip'>
    > & {
      search?: string;
      page?: number;
      perPage?: number;
    }
  ) {
    const page = options.page ?? 1;
    const perPage = options.perPage ?? 10;
    const [list, count] = await this.findAndCount({
      ...options,
      where: options.search
        ? (this.searchFields().map((key) => ({
            ...options.where,
            [key]: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:value)`, {
              value: `%${options.search}%`,
            }),
          })) as FindOptionsWhere<Entity>[])
        : options.where,
      ...(perPage > -1 && {
        take: perPage,
        skip: (page - 1) * perPage,
      }),
    });

    return {
      list,
      count,
      page,
      perPage,
    };
  }
}
