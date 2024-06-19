const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static getStatus(request, response) {
    response.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(request, response) {
    const userNum = await dbClient.nbUsers();
    const fileNum = await dbClient.nbFiles();
    response.status(200).json({ users: userNum, files: fileNum });
  }
}

module.exports = AppController;
