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
    contactinfo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.belongsTo(models.UserAccount, {
      foreignKey: "id",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };

  return User;
};
