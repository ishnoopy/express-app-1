const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

class ProfileRepository {
  constructor() {
    this.profileModel = prisma.profile
  }

  async getProfile(userId) {
    return await this.profileModel.findUnique({ where: { userId } });
  }

  async createProfile(data) {
    return await this.profileModel.create({ data });
  }
  
}

module.exports = ProfileRepository;