module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: "user_accounts",
        key: "id",
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    // contactinfo: {
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
      references: {
        model: "user_accounts",
        key: "email",
      },
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // }
  });

  User.associate = (models) => {
    User.belongsTo(models.UserAccount, {
      foreignKey: "UserAccountId",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };

  return User;
};
