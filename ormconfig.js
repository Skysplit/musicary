const path = require('path');

const {
  NODE_ENV,
  TYPEORM_HOST,
  TYPEORM_DATABASE,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
} = process.env;

const env = process.env.NODE_ENV || 'production';

const commonConfig = {
  name: 'default',
  type: 'mysql',
  host: TYPEORM_HOST || 'localhost',
  username: TYPEORM_USERNAME || 'root',
  password: TYPEORM_PASSWORD || '',
  port: TYPEORM_PORT || 3306,
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/server/migration',
    subscribersDir: 'src/server/subscriber',
  }
};

const productionConfig = {
  ...commonConfig,
  database: TYPEORM_DATABASE || 'nodetech_production',
  entities: ['dist/server/module/**/*.model.js'],
  migrations: ['dist/server/migration/**/*.js'],
  subscribers: ['dist/server/subscriber/**/*.js'],
}

const developmentConfig = {
  ...commonConfig,
  logging: true,
  database: TYPEORM_DATABASE || 'nodetech_development',
  entities: ['src/server/module/**/*.model.ts'],
  migrations: ['src/server/migration/**/*.ts'],
  subscribers: ['src/server/subscriber/**/*.ts'],
};


const testingConfig = {
  ...developmentConfig,
  database: TYPEORM_DATABASE || 'nodetech_testing',
  migrationsRun: false,
  logging: false,
};

const config = {
  production: productionConfig,
  development: developmentConfig,
  testing: testingConfig,
}

module.exports = config[env] || config.production;
