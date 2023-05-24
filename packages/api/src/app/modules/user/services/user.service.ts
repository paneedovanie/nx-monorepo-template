import { Injectable } from '@nestjs/common';
import { RoleRepository, UserEntity, UserRepository } from '../../../database';
import { BaseService } from '../../../core';
import { FindOptionsRelations } from 'typeorm';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    protected readonly repository: UserRepository,
    private readonly roleRepository: RoleRepository
  ) {
    super(repository);
  }

  protected relations(): FindOptionsRelations<UserEntity> {
    return {
      roles: { permissions: true },
    };
  }

  public async assignRole(id: string, roleId: string) {
    const user = await this.repository.findOne({
      where: { id },
      relations: this.relations(),
    });
    const role = await this.roleRepository.findOneBy({ id: roleId });
    user.roles.push(role);

    return this.repository.save(user);
  }

  public async unassignRole(id: string, roleId: string) {
    const user = await this.repository.findOne({
      where: { id },
      relations: this.relations(),
    });
    user.roles = user.roles.filter((role) => role.id !== roleId);

    return this.repository.save(user);
  }
}
