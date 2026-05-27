const AuthService = require("../services/authService");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  googleLogin = async (req, res) => {
    try {
      const { credential } = req.body;

      const user = await this.authService.verifyGoogleCredential(credential);
      const token = this.authService.generateToken(user);

      res.json({ token, user });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Invalid login" });
    }
  };
}

module.exports = AuthController;
