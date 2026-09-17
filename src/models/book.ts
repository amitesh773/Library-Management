import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import { BookStatus } from "../common/status.js";

interface BookAttributes {
  id: number,
  title: string,
  author: string,
  isbn : string,
  category: string,
  publisher: string,
  publishedYear: number,
  totalCopies: number,
  availableCopies: number,
  status: BookStatus,
  createdAt: Date,
  updatedAt: Date,
  createdBy: number,
  updatedBy: number
}

interface BookCreationAttributes extends Optional <
      BookAttributes,
      "id"|
      "title"|
      "author"|
      "isbn"|
      "category"|
      "publisher"|
      "publishedYear"|
      "totalCopies"|
      "availableCopies"|
      "status"|
      "createdAt"|
      "updatedAt"|
      "createdBy"|
      "updatedBy"
>{}

class Book 

extends Model <BookAttributes, BookCreationAttributes>
implements BookAttributes {
  declare id: number;
  declare title: string;
  declare author: string;
  declare isbn: string;
  declare category: string;
  declare publisher: string;
  declare publishedYear: number;
  declare totalCopies: number;
  declare availableCopies: number;
  declare status: BookStatus;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare createdBy: number;
  declare updatedBy: number;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalCopies: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    availableCopies: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },status: {
      type: DataTypes.ENUM(...Object.values(BookStatus)),
      allowNull: true,
      defaultValue: BookStatus.AVAILABLE
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
    tableName: "book",
    modelName: "Book",
    timestamps: true,

    indexes: [
      {
        fields: ["isbn"],
        unique: true
      },
      {
      fields: ["title"]
      },
      {
        fields : ["category"]
      }

    ]
  }
)

export default Book