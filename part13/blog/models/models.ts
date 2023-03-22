import Blog from "./Blog";
import User from "./User";
User.hasMany(Blog, {
  foreignKey: {
    allowNull: false,
  },
});
Blog.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});
Blog.sync({ alter: true });
User.sync({ alter: true });

export { Blog, User };
