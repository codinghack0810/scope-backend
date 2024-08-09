module.exports = (sequelize, Sequelize) => {
  const UserAccount = sequelize.define("user_account", {
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    securityquestion: {
      type: Sequelize.STRING,
    },
    logintracking: {
      type: Sequelize.NUMBER,
      default: 0,
    },
  });

  return UserAccount;
};
