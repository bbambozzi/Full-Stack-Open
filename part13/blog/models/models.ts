import Blog from "./Blog";
import User from "./User";
import ReadingListEntry from "./ReadingListEntry";
import ActiveSession from "./activeSession";

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

User.hasMany(ReadingListEntry, {
  foreignKey: {
    allowNull: false,
  },
});

ReadingListEntry.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

Blog.hasMany(ReadingListEntry, {
  foreignKey: {
    allowNull: false,
  },
});

ReadingListEntry.belongsTo(Blog, {
  foreignKey: {
    allowNull: false,
  },
});

User.belongsToMany(Blog, { through: ReadingListEntry });
Blog.belongsToMany(User, { through: ReadingListEntry });

User.hasOne(ActiveSession);
ActiveSession.hasOne(User);

Blog.sync();
User.sync();
ReadingListEntry.sync();
ActiveSession.sync();

export { Blog, User, ReadingListEntry };
