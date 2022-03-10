const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const seedUsers = num => {
  let i = 0;

  while (i < num) {
    let username;
    if (i % 2 === 0) {
      username = `${faker.internet.userName()}`;
    } else if (i % 3 === 0) {
      username = `${faker.name.firstName()} ${faker.name.lastName()}`
    } else {
      username = `${faker.commerce.color()} ${faker.lorem.word()}`
    }

    const user = {
      username,
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      bio: faker.lorem.paragraph(),
      location: `${faker.address.city()}, ${faker.address.state()}`,
      profileImageURL: faker.image.avatar(),
      bannerImageURL: faker.image.imageUrl(),
      // createdAt: faker.date.past(),
      // updatedAt: faker.date.past(),
    }
    console.log(user, ',')
    i++
  }
}
// seedUsers(50);

const seedSongs = num => {
  for (let i = 0; i < num; i++) {
    let image;
    let word;
    if (i % 5 === 0) {
      image = faker.image.abstract();
      word = faker.random.word();
    } else if (i % 3 === 0) {
      image = faker.image.animals();
      word = faker.random.words();
    } else {
      image = faker.image.city();
      word = faker.lorem.word();
    }


    const user = {
      userId: (~~(Math.random() * 10)) * 5,
      // songURL: ,
      artworkURL: image,
      title: word,
      genre: faker.music.genre(),
      description: faker.lorem.sentence(),
      // duration: ,
      plays: faker.datatype.number(),
    }

    console.log(user, ',');
  }
}
// seedSongs(100)
// console.log((~~(Math.random() * 10)) * 5);


const seedLikes = num => {

  for (let i = 0; i < num; i++) {
    const songId = ~~(Math.random() * 112)
    const userId = ~~(Math.random() * 51);
    if (songId >= 112 || songId === 0) break;
    if (userId >= 51 || songId === 0) break;
    

    const like = {
      userId,
      songId,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }
    
    console.log(like, ',');
  }
}

seedLikes(500);
