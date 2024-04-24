import Fuse from 'fuse.js';

const options = {
  includeScore: true,
  keys: ['author', 'title']
}

const books = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { title: 'The Grapes of Wrath', author: 'John Steinbeck' },
  { title: 'The Great Expectations', author: 'Charles Dickens' },
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez' },
  { title: 'Moby Dick', author: 'Herman Melville' },
  { title: 'Old Man and the Sea', author: 'Ernest Hemingway' },
  { title: 'Old Mans War', author: 'John Scalzi' }
]

const fuse = new Fuse(books, options);

async function main(engine) {
  const results = engine.search('Old Man')
  console.log(results)
}

main(fuse)
