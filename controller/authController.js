const AuthService = require('../service/authService');
const RequestError = require('../middleware/errorResponse');
const { registerDTO, loginDTO } = require('../dto/auth');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async login(req, res, next) {
    const { error } = loginDTO.validate(req.body);
    if (error) { return res.status(400).json( { message: error.details[0].message }); }

    const { email, password } = req.body;
    try {
    const user = await this.authService.login(email, password);
    console.log(user)
    res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    const { error } = registerDTO.validate(req.body);
    if (error) { return res.status(400).json( { message: error.details[0].message } ) }

    const { name, email, password } = req.body;
    try {
      const user = await this.authService.register({ name, email, password });
      console.log(user)
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;