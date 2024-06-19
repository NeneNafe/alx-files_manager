const { MongoClient, ObjectID } = require('mongodb');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(database);
      this.users = this.db.collection('user');
    }).catch((err) => {
      console.log(err);
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.db.collection('users');
    const docNum = await users.countDocuments();
    return docNum;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const fileNum = await files.countDocuments();
    return fileNum;
  }

  async createUser(email, password) {
    const users = this.db.collection('users');
    const result = await users.insertOne({ email, password });
    return result.ops[0];
  }

  async getUserByEmail(email) {
    const users = this.db.collection('users');
    const user = await users.findOne({ email });
    return user;
  }

  async getUserById(id) {
    const users = this.db.collection('users');
    return users.findOne({ _id: new ObjectID(id) });
  }

  async getFileById(id) {
    const files = this.db.collection('files');
    return files.findOne({ _id: new ObjectID(id) });
  }

  async createFile(fileData) {
    const files = this.db.collection('files');
    const result = await files.insertOne(fileData);
    return result.ops[0];
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
