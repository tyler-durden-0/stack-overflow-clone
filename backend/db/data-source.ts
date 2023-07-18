import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'postgres',
    // host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'test',
    entities: ['dist/**/*.entity{.ts,.js}'],
    logging: true,
    migrations: ['dist/**/migrations/*{.ts,.js}'],
    migrationsRun: true,
    synchronize: false,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;