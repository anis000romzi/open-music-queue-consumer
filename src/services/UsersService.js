const { Pool } = require('pg');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async getUserById(userId) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = UsersService;
