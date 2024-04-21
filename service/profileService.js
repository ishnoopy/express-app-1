const UserRepository = require('../repository/userRepository');
const ProfileRepository = require('../repository/profileRepository');
const RequestError = require('../middleware/errorResponse');

class ProfileService {
  constructor() {
    this.userRepository = new UserRepository();
    this.profileRepository = new ProfileRepository();
  }

  async getProfile(id) {
    try {
      const user = await this.userRepository.findOne(id);
      
      if (!user) { throw new RequestError(404, 'User not found!') }
      
      delete user.password;
      return user;
    } catch (error) {
      throw new RequestError(500, error.message);
    }
  } 

  async createProfile(profile) {
    try {
      const user = await this.userRepository.findOne(profile.userId);
      
      if (!user) { throw new RequestError(404, 'User not found!') }
      
      const newProfile = await this.profileRepository.createProfile(profile);
      return newProfile;
    } catch (error) {
      throw new RequestError(500, error.message);
    }
  }
}

module.exports = ProfileService;