module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity{.ts,.js}'],
  //migrations: ['migrations/*{.ts,.js}'],
  logging: ['query'],
  migrationsRun: false,
  cli: {
    entitiesDir: 'entities',
    migrationsDir: 'migrations',
  },
};
