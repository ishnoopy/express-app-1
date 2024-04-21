const AuthRepository = require('../repository/authRepository');
const RequestError = require('../middleware/errorResponse');

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async login(email, password) {
    const user = await this.authRepository.login(email, password);
    if (!user) { throw new RequestError(400, 'Invalid email and/or password!') }

    delete user.password;
    return user;
  }

  async register(user) {
    try {
      const userExists = await this.authRepository.findUserByEmail(user.email);
      if (userExists) { throw new RequestError(400, 'Email is already taken!'); }

      const newUser = await this.authRepository.createUser(user);
      delete newUser.password;
      
      return newUser;
    } catch (error) {
      throw new RequestError(500, error.message);
    }
  }

}

module.exports = AuthService;