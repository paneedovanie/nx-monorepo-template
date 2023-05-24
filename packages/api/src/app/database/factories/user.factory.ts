import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '../entities';

export default setSeederFactory(UserEntity, (faker) => {
  const user = new UserEntity();
  user.firstName = faker.name.firstName('male');
  user.lastName = faker.name.lastName('male');

  return user;
});
