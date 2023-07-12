import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { TagEntity } from '../entities';
import { BaseRepository } from '../../core';
import { CreateTag, UpdateTag } from '@nx-monorepo-template/global';

@Injectable()
export class TagRepository extends BaseRepository<
  TagEntity,
  CreateTag,
  UpdateTag
> {
  constructor(dataSource: DataSource) {
    super(TagEntity, dataSource);
  }

  protected relations(): FindOptionsRelations<TagEntity> {
    return {
      stores: true,
    };
  }

  searchFields(): string[] {
    return ['title'];
  }
}
