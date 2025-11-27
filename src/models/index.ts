import { User } from "./User.js";
import { Equipment } from "./Equipment.js";

function associations() {
  User.hasMany(Equipment, { foreignKey: "userId", as: "equipments" });
  Equipment.belongsTo(User, { foreignKey: "userId", as: "user" });
}

export { associations };
