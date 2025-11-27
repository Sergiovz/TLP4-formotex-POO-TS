import { DataTypes, Model } from "sequelize";
import { Database } from "../config/database.js";
import { encryptSync } from "../helpers/bcrypt.js";

const sequelizeConnection = Database.getInstance().getConnection();

export class User extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: "admin" | "user";

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "user"]],
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
    timestamps: true,
    paranoid: true,
  }
);

User.beforeSave(async (user: User) => {
  if (user.changed("password")) {
    user.password = encryptSync(user.password, 10);
  }
});
