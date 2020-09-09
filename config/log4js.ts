import * as path from 'path';
const baseLogPath = path.resolve(__dirname, '../../logs');

const log4jsConfig = {
  appenders: {
    console: {
      // 会打印到控制台
      type: 'console',
    },
    access: {
      // 会写入文件，并按照日期分类
      type: 'dateFile',
      // 日志文件名
      filename: `${baseLogPath}/access/access.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      keepFileExt: true,
      category: 'http',
      numBackups: 3,
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      keepFileExt: true,
      numBackups: 3,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      keepFileExt: true,
      numBackups: 3,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG',
    },
    info: {
      appenders: ['console', 'app', 'errors'],
      level: 'info',
    },
    access: {
      appenders: ['console', 'app', 'errors'],
      level: 'info',
    },
    http: {
      appenders: ['access'],
      level: 'DEBUG',
    },
  },
  // 使用 pm2 管理项目时打开
  pm2: true,
  // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
  pm2InstanceVar: 'INSTANCE_ID',
};

export default log4jsConfig;
