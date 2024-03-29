import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  ChangePassword,
  Login,
  Register,
  ResetPassword,
  User,
} from '@nx-monorepo-template/global';
import { DataSource } from 'typeorm';
import {
  CredentialRepository,
  RoleRepository,
  UserEntity,
  UserRepository,
} from '../../../database';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/';
import { checkPassword, hashPassword } from '../../../helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly credentialRepository: CredentialRepository,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async register({ firstName, lastName, email, password }: Register) {
    if (await this.credentialRepository.findOneBy({ email })) {
      throw new BadRequestException('Email already exists');
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const user = this.userRepository.create({ firstName, lastName });
    const credential = this.credentialRepository.create({
      email,
      password: await hashPassword(password),
    });
    await queryRunner.startTransaction();

    try {
      user.roles = [
        await this.roleRepository.findOne({ where: { title: 'User' } }),
      ];
      await queryRunner.manager.save(user);
      credential.user = user;
      await queryRunner.manager.save(credential);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    const accessToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '15m' }
    );

    delete credential.user;

    user.credential = credential;
    await this.mailService.sendUserConfirmation(user, accessToken);

    return user;
  }

  async validateUser({ email, password }: Login) {
    const credential = await this.credentialRepository.findOne({
      where: { email },
      relations: ['user'],
    });

    if (!credential || !(await checkPassword(password, credential.password))) {
      throw new UnauthorizedException();
    }

    return credential.user;
  }

  async login(user: UserEntity) {
    const payload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async changePassword(
    id: string,
    { currentPassword, newPassword }: ChangePassword
  ) {
    const credential = await this.credentialRepository.findOneBy({
      user: { id },
    });

    if (
      !credential ||
      !(await checkPassword(currentPassword, credential.password))
    ) {
      throw new ForbiddenException();
    }

    credential.password = await hashPassword(newPassword);

    await this.credentialRepository.save(credential);
  }

  async verifyEmail(token: string) {
    try {
      const result = await this.jwtService.verify(token);
      const credential = await this.credentialRepository.findOne({
        where: {
          user: { id: result.sub },
        },
        relations: ['user'],
      });

      credential.verified = true;

      await this.credentialRepository.save(credential);

      return 'Thank you for verifying your email!';
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async resendVerifyEmail(id: string) {
    const payload = { sub: id };
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['credential'],
    });

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    await this.mailService.sendUserConfirmation(user, accessToken);

    return {
      accessToken,
    };
  }

  async verifyClientToken(token) {
    try {
      const result = await this.jwtService.verify(token);
      return this.userRepository.findOneBy({ id: result.sub });
    } catch (err) {
      return;
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        credential: {
          email: email,
        },
      },
      relations: ['credential'],
    });
    if (!user) {
      throw new NotFoundException(
        `No user associated with this email "${email}"`
      );
    }
    const payload = { sub: user.id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '5m' });

    await this.mailService.sendResetPassword(user, accessToken);

    return {
      accessToken,
    };
  }

  async resetPassword(id: string, input: ResetPassword) {
    const credential = await this.credentialRepository.findOneBy({
      user: { id },
    });

    if (!credential || input.newPassword !== input.confirmPassword) {
      throw new ForbiddenException();
    }

    credential.password = await hashPassword(input.newPassword);

    await this.credentialRepository.save(credential);

    return true;
  }
}
