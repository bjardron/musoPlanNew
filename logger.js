const fs = require('fs').promises;
const path = require('path');

class Logger {
  constructor(logDir = 'logs') {
    this.logDir = logDir;
    this.logFile = path.join(logDir, `app-${new Date().toISOString().split('T')[0]}.log`);
  }

  async log(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} [${level}] ${message}\n`;

    try {
      await fs.mkdir(this.logDir, { recursive: true });
      await fs.appendFile(this.logFile, logEntry);
      console.log(logEntry.trim());
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  async info(message) {
    await this.log('INFO', message);
  }

  async warn(message) {
    await this.log('WARN', message);
  }

  async error(message) {
    await this.log('ERROR', message);
  }

  async debug(message) {
    await this.log('DEBUG', message);
  }
}

module.exports = new Logger();