class User {
  constructor({ id, name, email, picture }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.picture = picture;
  }

  static fromGooglePayload(payload) {
    return new User({
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    });
  }
}

module.exports = User;
