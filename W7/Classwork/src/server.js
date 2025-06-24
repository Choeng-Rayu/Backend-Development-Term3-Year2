import sequelize from "./db/database.js"; 
import { Author, Book } from "./models/user.js";

try {

  const result = await sequelize.sync(); // connect sequelized
  // console.log(result);
  const author1 = await Author.create({ name: 'Ronan The best', birthYear: 1990});
  const author2 = await Author.create({name: 'Kim Ang', birthYear: 1995});
  const author3 = await Author.create({name: 'Hok Tim', birthYear: 2015 });
  
  const book1 = await author1.createBook({title: 'mae ah nang', publicationYear: 'testing mae ah nang', pages: 12});
  const book2= await author1.createBook({title: 'mae ah nang 1', })
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
