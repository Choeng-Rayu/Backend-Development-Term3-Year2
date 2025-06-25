import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";


const Author = sequelize.define('Author', {
  name: DataTypes.STRING,
  birthYear: DataTypes.INTEGER
});

const Book = sequelize.define('Book', {
  title: DataTypes.STRING,
  publicationYear: DataTypes.INTEGER,
  pages: DataTypes.INTEGER
});

Author.hasMany(Book);
Book.belongsTo(Author);

export {Author, Book};

