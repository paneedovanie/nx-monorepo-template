import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { BaseRepository } from './base.repository';
import { PaginationOptions } from '@nx-monorepo-template/global';

@Injectable()
export class BaseService<
  Entity extends ObjectLiteral,
  C = Record<string, any>,
  U = Record<string, any>,
  F = PaginationOptions
> {
  constructor(protected readonly repository: BaseRepository<Entity>) {}

  get(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]
  ): Promise<Entity> {
    return this.repository.getWithRelations(where);
  }

  getById(id: string): Promise<Entity> {
    return this.repository.getByIdWithRelations(id);
  }

  getManyByIds(ids: string[]) {
    return this.repository.getManyByIdsWithRelations(ids);
  }

  async create(input: C) {
    const res = await this.repository.createWithRelations(input);
    this.onCreated(res);
    return res;
  }

  getAll(query: F) {
    return this.repository.paginated(query);
  }

  async update(id: string | Record<string, any>, input: U): Promise<Entity> {
    const prev =
      typeof id === 'string'
        ? await this.getById(id)
        : await this.repository.findOne(id);
    const res = await this.repository.updateWithRelations(id, input);
    this.onUpdated(res, prev);
    return res;
  }

  async delete(id: string, soft?: boolean) {
    const res = await this.getById(id);
    if (soft) {
      await this.repository.softDelete({ id: id as any });
    } else {
      await this.repository.delete({ id: id as any });
    }
    this.onDeleted(res);
    return;
  }

  protected onCreated(value: Entity) {
    return;
  }

  protected onUpdated(value: Entity, prevValue: Entity) {
    return;
  }

  protected onDeleted(value: Entity) {
    return;
  }
}
