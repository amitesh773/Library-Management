import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import { Status, UserRole } from "../common/status.js";

interface userAttributs {
  id: number,
  name: string,
  surname: string,
  email: string,
  phone: string,
  password: string,
  role: UserRole,
  status: Status
  createdAt: Date,
  updatedAt: Date,
  createdBy: number,
  updatedBy: number

}

interface userCreationAttributs extends Optional<
  userAttributs,
  "id" |
  "name" |
  "surname"|
  "email" |
  "phone" |
  "password" |
  "role" |
  "status" |
  "createdAt" |
  "updatedAt" |
  'createdBy' |
  "updatedBy"
> { }

class User
  extends Model<userAttributs, userCreationAttributs>
  implements userAttributs {
  declare id: number;
  declare name: string;
  declare surname: string;
  declare email: string;
  declare phone: string;
  declare password: string;
  declare role: UserRole;
  declare status: Status;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare createdBy: number;
  declare updatedBy: number;

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: true,
      defaultValue: UserRole.STUDENT

    },
    status: {
      type: DataTypes.ENUM(...Object.values(Status)),
      allowNull: true,
      defaultValue: Status.ACTIVE
    },
    createdAt: {
      type: DataTypes.DATE,

    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user",
    modelName: "User",
    timestamps: true,

    indexes: [
      {
        fields: ["email"],
        unique: true
      },
      {
        fields: ["phone"],
        unique: true,
      },
      {
        fields: ["role"]
      }
    ]
  }
)

export default User