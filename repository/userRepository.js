const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class UserRepository {
  constructor() {
    this.userModel = prisma.user;
  }

  async findOne(id) {
    const userId = parseInt(id);
    const user = await this.userModel.findUnique({
      where: { id: userId },
      include: { profile: true }
    });

    delete user.profile.id;
    delete user.profile.userId;

    return user;
  }

  async findAll() {
    return await this.userModel.findMany();
  }

}

module.exports = UserRepository;