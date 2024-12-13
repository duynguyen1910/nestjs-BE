export default () => ({
  database: {
    type: 'mysql',
    host: process.env.BASE_URL,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
  },
});
