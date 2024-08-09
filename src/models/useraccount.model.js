module.exports = (sequelize, Sequelize) => {
  const UserAccount = sequelize.define("user_account", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    securityQuestion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    securityAnswer: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    logintracking: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return UserAccount;
};
