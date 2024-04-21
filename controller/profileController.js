const { createProfileDTO } = require("../dto/profile");
const RequestError = require("../middleware/errorResponse");
const ProfileService = require("../service/profileService");

class ProfileController {
  constructor() {
    this.profileService = new ProfileService();
  }

  async getProfile(req, res, next) {
    const id = req.user.id;
    try {
      const profile = await this.profileService.getProfile(id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async getProfileById(req, res, next) {
    const id = req.params.id;
    try {
      const profile = await this.profileService.getProfile(id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async createProfile(req, res, next) {
    const profile = req.body;
    profile.userId = req.user.id;

    const { error } = createProfileDTO.validate(profile);
    if (error) { return res.status(400).json({ message: error.details[0].message }); }

    const userProfile = await this.profileService.getProfile(profile.userId);
    if (userProfile) { return res.status(400).json({ message: 'Profile already exists!' }); }

    try {
      const newProfile = await this.profileService.createProfile(profile);
      res.json(newProfile);
    } catch (error) {
      next(error);
    }

  }
}

module.exports = ProfileController;