module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*.js'],
  logging: ['query'],
  migrationsRun: true,
  cli: {
    entitiesDir: 'entities',
    migrationsDir: 'migrations',
  },
};
