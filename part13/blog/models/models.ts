import Blog from "./Blog";
import User from "./User";
User.hasMany(Blog);
Blog.belongsTo(User);
Blog.sync({ alter: true });
User.sync({ alter: true });

export { Blog, User };
