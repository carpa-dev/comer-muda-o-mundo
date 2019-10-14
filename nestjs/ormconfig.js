// this has to be duplicated
// since zeit's now pack into a single file
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*.js'],
  migrationsRun: true,
  retryAttempts: 1,
  extra: {
    ssl: !!process.env.DATABASE_SSL,
  },
  cli: {
    entitiesDir: 'entities',
    migrationsDir: 'migrations',
  },
};
