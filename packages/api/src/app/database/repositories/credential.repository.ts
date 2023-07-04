import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CredentialEntity } from '../entities';
import { BaseRepository } from '../../core';

@Injectable()
export class CredentialRepository extends BaseRepository<CredentialEntity> {
  constructor(dataSource: DataSource) {
    super(CredentialEntity, dataSource);
  }
}
