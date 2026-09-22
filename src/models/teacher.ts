import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

import User from "./user.js";
import { Status } from "../common/status.js";

interface teacherAttributes {
  id: number;
  userId: number;
  employeeId: string;
  qualification: string;
  specialization: string;
  department: string;
  designation: string;
  joiningDate: Date;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

interface teacherCreationAttributes
  extends Optional<
    teacherAttributes,
    "id" |
    "userId" |
    "employeeId" |
    "qualification" |
    "specialization" |
    "department" |
    "designation" |
    "joiningDate" |
    "status" |
    "createdAt" |
    "updatedAt" |
    "createdBy" |
    "updatedBy"
  > { }

class Teacher
  extends Model<teacherAttributes, teacherCreationAttributes>
  implements teacherAttributes {
  declare id: number;
  declare userId: number;
  declare employeeId: string;
  declare qualification: string;
  declare specialization: string;
  declare department: string;
  declare designation: string;
  declare joiningDate: Date;
  declare status: Status;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare createdBy: number;
  declare updatedBy: number;

}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",

      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    employeeId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },

    qualification: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    specialization: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    department: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    designation: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    joiningDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(...Object.values(Status)),
      allowNull: false,
      defaultValue: Status.ACTIVE
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    createdBy: {
      type: DataTypes.INTEGER,
      
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      
    }

  },
  {
    sequelize,
    tableName: "teachers",
    modelName: "Teacher",
    timestamps: true,

    indexes: [
      {
        fields: ["department"],
      },
      {
        fields: ["designation"],
      },
      {
        fields: ["status"],
      },
      {
        fields: ["department", "status"],
      },
    ]

  }
)
// User to Teacher
User.hasOne(Teacher,{
  foreignKey: "userId",
  as: "techaer"
})

//Teacher to User
Teacher.belongsTo(User,{
  foreignKey: "userId",
  as: "user"
})

export default Teacher
