import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';
import { BaseRepository } from '../database/repositories/base.repository';

@Injectable()
export class BaseService<Entity extends ObjectLiteral> {
  constructor(protected readonly repository: BaseRepository<Entity>) {}

  getById(id: string) {
    return this.repository.findOne({
      where: { id: id as any },
      relations: this.relations(),
    });
  }

  create(input: Record<string, any>) {
    const newProduct = this.repository.create(this.createRelationsInput(input));

    return this.repository.save(newProduct);
  }

  getAll(input: any) {
    return this.repository.paginated(this.getAllInput(input));
  }

  async update(id: string, input: Record<string, any>) {
    console.log(await this.updateRelationsInput(id, input));
    return this.repository.save(await this.updateRelationsInput(id, input));
  }

  async delete(id: string) {
    await this.repository.delete({ id: id as any });
  }

  protected mapRelations(): Record<string, BaseRepository<any>> {
    return undefined;
  }

  protected relations(): FindOptionsRelations<Entity> {
    return undefined;
  }

  protected where(
    conditions: FindOptionsWhere<Entity>
  ): FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[] {
    return conditions;
  }

  private getAllInput({ page, perPage, search, ...input }) {
    const reducer = (curr, key) => {
      return {
        ...curr,
        [key]: this.relations()[key] ? { id: input[key] } : input[key],
      };
    };

    return {
      where: this.where(Object.keys(input).reduce(reducer, {})),
      page,
      perPage,
      search,
      relations: this.relations(),
    };
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
    const data = await this.repository.findOneBy({ id: id as any });
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
