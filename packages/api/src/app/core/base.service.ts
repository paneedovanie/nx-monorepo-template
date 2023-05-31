import { Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { BaseRepository } from '../database/repositories/base.repository';

@Injectable()
export class BaseService<Entity extends ObjectLiteral> {
  constructor(protected readonly repository: BaseRepository<Entity>) {}

  getById(id: string) {
    return this.repository.getById(id);
  }

  create(input: Record<string, any>) {
    return this.repository.createWithRelations(input);
  }

  getAll(query: any) {
    return this.repository.paginated(query);
  }

  async update(id: string, input: Record<string, any>) {
    return this.repository.updateWithRelations(id, input);
  }

  async delete(id: string) {
    await this.repository.delete({ id: id as any });
  }
}
