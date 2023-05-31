import { Injectable } from '@nestjs/common';
import { PermissionEntity, PermissionRepository } from '../../../database';
import { BaseService } from '../../../core';

@Injectable()
export class PermissionService extends BaseService<PermissionEntity> {
  constructor(protected readonly repository: PermissionRepository) {
    super(repository);
  }
}
