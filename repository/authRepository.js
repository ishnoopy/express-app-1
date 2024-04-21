const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthRepository {
  constructor() {
    this.userModel = prisma.user;
    this.bcrypt = bcrypt;
  }

  async createUser(user) {
    user.password = await this.bcrypt.hash(user.password, 10);
    return await this.userModel.create({ data: user });
  }

  async findUserByEmail(email) {
    return await this.userModel.findUnique({ where: { email: email } });
  }
  
  async login(email, password) {
    const user = await this.userModel.findUnique({ where: { email: email } });

    if (user && await this.bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      delete user.password;
      return { user, accessToken }
    } else {
      return null;
    }
  }
}

module.exports = AuthRepository;