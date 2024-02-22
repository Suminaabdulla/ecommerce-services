import { DataSource } from 'typeorm';

const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  migrations: ['libs/common/src/migrations/*{.ts,.js}'],
  entities: [' libs/common/src/entities/*{.ts,.js}'],
});

export default dataSource;
