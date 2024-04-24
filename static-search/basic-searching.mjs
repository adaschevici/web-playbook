import Fuse from 'fuse.js';

const options = {
  includeScore: true,
}

const books = [
  'The Great Gatsby',
  'The Catcher in the Rye',
  'To Kill a Mockingbird',
  'The Grapes of Wrath',
  'The Great Expectations',
  'One Hundred Years of Solitude',
  'Moby Dick',
  'Old Man and the Sea',
  'Old Mans War',
]

const fuse = new Fuse(books, options);

async function main(engine) {
  const results = engine.search('Old Man')
  console.log(results)
}

main(fuse)
