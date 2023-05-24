import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import configuration from '../config/configuration';

config();

export default new DataSource(configuration().database);
