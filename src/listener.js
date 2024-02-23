class Listener {
  constructor(cacheService, usersService, mailSender) {
    this._cacheService = cacheService;
    this._usersService = usersService;
    this._mailSender = mailSender;

    this.listenVerify = this.listenVerify.bind(this);
    this.listenResetPassword = this.listenResetPassword.bind(this);
  }

  async listenVerify(message) {
    try {
      const { userId, email, otp } = JSON.parse(message.content.toString());

      await this._cacheService.set(`verify:${userId}`, otp);
      const result = await this._mailSender.sendVerifyEmail(email, otp);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async listenResetPassword(message) {
    try {
      const {
        userId, username, email, otp,
      } = JSON.parse(message.content.toString());

      await this._cacheService.set(`forgot:${userId}`, otp);
      const result = await this._mailSender.sendResetPasswordEmail(email, { otp, username });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
