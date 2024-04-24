import Fuse from 'fuse.js';

const options = {
  includeScore: true,
  keys: [['author', 'firstName'], 'title'],
}

const books = [
  {
    title: 'The Great Gatsby',
    author: {
      firstName: 'F. Scott',
      lastName: 'Fitzgerald'
    }
  },
  {
    title: 'The Catcher in the Rye',
    author: {
     firstName: 'J.D.',
     lastName: 'Salinger'
    }
  },
  {
    title: 'To Kill a Mockingbird',
    author: {
      firstName: 'Harper',
      lastName: 'Lee'
    }
  },
  {
    title: 'The Grapes of Wrath',
    author:
    {
      firstName: 'John',
      lastName: 'Steinbeck'
    }
  },
  {
    title: 'The Great Expectations',
    author:
    {
      firstName: 'Charles',
      lastName: 'Dickens'
    }
  },
  {
    title: 'One Hundred Years of Solitude',
    author:
    {
      firstName: 'Gabriel',
      lastName: 'Garcia Marquez'
    }
  },
  {
    title: 'Moby Dick',
    author: {
      firstName: 'Herman',
      lastName: 'Melville'
    }
  },
  {
    title: 'Old Man and the Sea',
    author: {
      firstName: 'Ernest',
      lastName: 'Hemingway'
    }
  },
  {
    title: 'Old Mans War',
    author: {
     firstName: 'John',
     lastName: 'Scalzi'
    }
  }
]

const fuse = new Fuse(books, options);

async function main(engine) {
  let results = engine.search({
    $and: [{ $path: ['author', 'firstName'], $val: 'kill'}, {$path: 'title', $val: 'path'} ],
  })
  console.log(results)
  results = engine.search({
    $or: [{ $path: ['author', 'firstName'], $val: 'kill'}, {$path: 'title', $val: 'path'} ],
  })
  console.log(results)
}

main(fuse)
