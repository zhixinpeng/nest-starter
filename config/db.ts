const productConfig = {
  mysql: {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nest-demo',
    connectionLimit: 10,
  },
  redis: {
    port: '6379',
    host: '127.0.0.1',
    db: 0,
    password: 'password'
  }
};

const localConfig = {
  mysql: {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nest-demo',
    connectionLimit: 10,
  },
  redis: {
    port: '6379',
    host: '127.0.0.1',
    db: 0,
    password: 'password'
  }
};

const config = process.env.NODE_ENV ? productConfig : localConfig;

export default config;
