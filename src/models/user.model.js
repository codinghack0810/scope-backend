module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    contactinfo: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
