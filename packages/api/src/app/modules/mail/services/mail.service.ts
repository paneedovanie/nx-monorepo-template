import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../../../database';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService
  ) {}

  async sendUserConfirmation(user: UserEntity, token: string) {
    const url = `${this.configService.get('host')}:${this.configService.get(
      'port'
    )}/api/v1/auth/verify-email?accessToken=${token}`;

    await this.mailerService.sendMail({
      to: user.credential.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Please confirm your Email',
      template: 'verification',
      context: {
        name: user.firstName,
        url,
      },
    });
  }
}
