import sequelize from "./db/database.js"; 
// import "./models/user.js"; // 👈 this line is critical
import { Author, Book} from './models/user.js';

try {
  // TODO - Call sequelize.sync()
 
  await sequelize.sync();

  // // Create 3 authors with at least 2 books each.
  // await Author.create({
  //   name: 'Ronan The Best',
  //   birthYear: 1990,
  //   Books: [
  //     { title: 'Book 1', publicationYear: 2010, pages: 200 },
  //     { title: 'Book 2', publicationYear: 2015, pages: 300 }
  //   ]
  // }, { include: [Book] });

  // await Author.create({
  //   name: 'Kim Ang',
  //   birthYear: 1995,
  //   Books: [
  //     { title: 'Book 3', publicationYear: 2018, pages: 250 },
  //     { title: 'Book 4', publicationYear: 2020, pages: 400 }
  //   ]
  // }, { include: [Book] });

  // await Author.create({
  //   name: 'Hok Tim',
  //   birthYear: 2015,
  //   Books: [
  //     { title: 'Book 5', publicationYear: 2022, pages: 150 },
  //     { title: 'Book 6', publicationYear: 2023, pages: 180 }
  //   ]
  // }, { include: [Book] });  


  // // Fetch All Books by a Given Author
  // const ronan = await Author.findOne({ where: { name: 'Ronan The Best' } });
  // const ronanBooks = await ronan.getBooks();
  // console.log(ronanBooks);

  // //Create a New Book for an Existing Author Using .createBook()
  // const author = await Author.findOne({ where: { name: 'Kim Ang' } });
  // const newBook = await author.createBook({ title: 'New Book', publicationYear: 2024, pages: 350 });
  // console.log(newBook);

  // List All Authors Along with Their Books (Using include)
  const authors = await Author.findAll({ include: [Book] });
  console.log(JSON.stringify(authors, null, 2)) 
  
  
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

