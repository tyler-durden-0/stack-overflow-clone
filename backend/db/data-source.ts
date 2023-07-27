import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    //for local dev
    // host: 'localhost',
    // port: 5433,
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'test',
    entities: ['dist/**/*.entity{.ts,.js}'],
    logging: true,
    migrations: ['dist/**/migrations/*{.ts,.js}'],
    migrationsRun: true,
    // synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;