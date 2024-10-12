
export default () =>({
    type: 'mysql',
    host: process.env.HOST,
    port: +process.env.PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: process.env.ENTITY
});