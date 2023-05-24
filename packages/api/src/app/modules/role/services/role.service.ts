import { Injectable } from '@nestjs/common';
import {
  PermissionRepository,
  RoleEntity,
  RoleRepository,
} from '../../../database';
import { BaseService } from '../../../core';
import { FindOptionsRelations } from 'typeorm';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    protected readonly repository: RoleRepository,
    protected readonly permissionRepository: PermissionRepository
  ) {
    super(repository);
  }

  protected relations(): FindOptionsRelations<RoleEntity> {
    return {
      permissions: true,
    };
  }

  public async updatePermissions(id: string, permissionIds: string[]) {
    const role = await this.repository.findOne({
      where: { id },
      relations: { permissions: true },
    });

    const permissionIdsSet = new Set(permissionIds);

    role.permissions = role.permissions.filter(({ id }) => {
      if (permissionIdsSet.has(id)) {
        permissionIdsSet.delete(id);
        return true;
      }
      return false;
    });

    for (const permissionId of Array.from(permissionIdsSet)) {
      const permission = await this.permissionRepository.findOneBy({
        id: permissionId,
      });
      role.permissions.push(permission);
    }

    return this.repository.save(role);
  }
}
