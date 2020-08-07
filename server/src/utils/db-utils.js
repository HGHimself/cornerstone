const buildConnectionUri = (c) => `${c.DIAL}://${c.USER}:${c.PASS}@${c.HOST}:${c.PORT}`;

module.exports = {buildConnectionUri};
