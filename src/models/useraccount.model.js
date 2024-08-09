module.exports = (sequelize, Sequelize) => {
  const UserAccount = sequelize.define("user_account", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    securityQuestion: {
      type: Sequelize.STRING,
    },
    securityAnswer: {
      type: Sequelize.STRING,
    },
    logintracking: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  });

  return UserAccount;
};
