const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class PostRepository {
  constructor() {
    this.postModel = prisma.post;
  }

  async createPost(data){
    throw new Error('Not implemented');
  }


}