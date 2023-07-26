import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../../../database';
import { User } from '@nx-monorepo-template/global';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService
  ) {}

  async sendUserConfirmation(user: UserEntity, token: string) {
    const baseUrl = this.configService.get('baseUrl');
    const mailConfig = this.configService.get('mail');
    const url = `${baseUrl}/api/v1/auth/verify-email?accessToken=${token}`;

    await this.mailerService.sendMail({
      to: user.credential.email,
      from: mailConfig.from,
      subject: 'Please confirm your Email',
      template: 'verification',
      context: {
        name: user.firstName,
        url,
      },
    });
  }

  async sendResetPassword(user: UserEntity, token: string) {
    const baseUrl = this.configService.get('baseUrl');
    const mailConfig = this.configService.get('mail');
    const url = `${baseUrl}/reset-password?accessToken=${token}`;

    await this.mailerService.sendMail({
      to: user.credential.email,
      from: mailConfig.from,
      subject: 'Reset password request',
      template: 'reset-password',
      context: {
        name: user.firstName,
        url,
      },
    });
  }
}
