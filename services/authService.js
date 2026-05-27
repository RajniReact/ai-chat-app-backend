const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { googleClientId, jwtSecret } = require("../config/env");
const User = require("../models/User");

class AuthService {
  constructor() {
    this.client = new OAuth2Client(googleClientId);
  }

  async verifyGoogleCredential(credential) {
    const verifyToken = await this.client.verifyIdToken({
      idToken: credential,
      audience: googleClientId,
    });

    return User.fromGooglePayload(verifyToken.getPayload());
  }

  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );
  }
}

module.exports = AuthService;
