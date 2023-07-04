import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CategoryEntity, PermissionEntity, RoleEntity } from '../entities';
import { roles, permissions } from '../../config/roles-permissions';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(CategoryEntity);
    const permissionRepository = dataSource.getRepository(PermissionEntity);
    const roleRepository = dataSource.getRepository(RoleEntity);

    const rolesPermissions: Record<string, PermissionEntity[]> = roles.reduce(
      (curr, item) => ({ ...curr, [item.title]: [] }),
      {}
    );

    for (const item of permissions) {
      const { generatedMaps } = await categoryRepository.upsert(
        {
          title: item.title,
          description: item.description,
          type: 'permission',
        },
        ['title', 'type', 'parent']
      );

      const newPermissions = await permissionRepository.upsert(
        item.permissions.map((permission) => ({
          ...permission,
          category: generatedMaps[0],
        })),
        ['code']
      );
      newPermissions.generatedMaps.forEach((permission, i) => {
        item.permissions[i].roles.forEach((key) => {
          rolesPermissions[key].push(permission as PermissionEntity);
        });
      });
    }

    for (const role of roles) {
      const newRole =
        (await roleRepository.findOneBy({ title: role.title })) ??
        new RoleEntity();
      newRole.title = role.title;
      newRole.description = role.description;
      newRole.permissions = rolesPermissions[role.title];
      await roleRepository.save(newRole);
    }
  }
}
