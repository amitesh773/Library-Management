import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import User from "./user.js";
import { Status } from "../common/status.js";

interface StudentAttributes {
  id: number;
  userId: number;
  className: string;
  rollNo: string;
  division: string;
  semester: number;
  course: string;
  department: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

interface StudentCreationAttributes
  extends Optional<
    StudentAttributes,
    "id" |
    "userId"|
    "className"|
    "rollNo"|
    "division"|
    "semester"|
    "course"|
    "department"|
    "status" |
    "createdAt" |
    "updatedAt" |
    "createdBy" |
    "updatedBy"
  > {}

class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  declare id: number;
  declare userId: number;
  declare className: string;
  declare rollNo: string;
  declare division: string;
  declare semester: number;
  declare course: string;
  declare department: string;
  declare status: Status;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare createdBy: number;
  declare updatedBy: number;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",
      },
    },

    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rollNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    division: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(...Object.values(Status)),
      allowNull: false,
      defaultValue: Status.ACTIVE,
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
    tableName: "student",
    modelName: "Student",
    timestamps: true,

    indexes: [
      {
        fields: ["userId"],
        unique: true,
      },
      {
        fields: ["rollNo"],
      },
      {
        fields: ["course"],
      },
      {
        fields: ["department"],
      },
    ],
  }
);

// User → Student
User.hasOne(Student, {
  foreignKey: "userId",
  as: "student",
});

// Student → User
Student.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default Student;