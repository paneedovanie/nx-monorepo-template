import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PermissionEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionEntity> {
  constructor(dataSource: DataSource) {
    super(PermissionEntity, dataSource);
  }
}
