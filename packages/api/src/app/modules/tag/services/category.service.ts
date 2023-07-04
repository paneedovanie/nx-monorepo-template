import { Injectable } from '@nestjs/common';
import { TagEntity, TagRepository } from '../../../database';
import { BaseService } from '../../../core';

@Injectable()
export class TagService extends BaseService<TagEntity> {
  constructor(protected readonly repository: TagRepository) {
    super(repository);
  }
}
