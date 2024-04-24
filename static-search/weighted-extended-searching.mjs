import Fuse from 'fuse.js';

const options = {
  includeScore: true,
  keys: [
    {
      name: "title",
      weight: 0.7 // title takes priority
    },
    {
      name: "author",
      weight: 0.3
    }
  ],
  useExtendedSearch: true
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
  { title: 'Old Mans War', author: 'John Scalzi' },
  { title: "Queen Margot", author: "Sandra Killmington" }
]

const fuse = new Fuse(books, options);

async function main(engine) {
  let results = engine.search("'Man 'Old | Rye$")
  console.log(results)
  results = engine.search("'Man 'Old | Lee$")
  console.log(results)
}

main(fuse)
