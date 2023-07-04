import { SetMetadata } from '@nestjs/common';

export const AllowUnauthorize = () => SetMetadata('ALLOW_UNAUTHORIZE', true);
