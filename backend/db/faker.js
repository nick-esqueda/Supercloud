const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

// const randomNumber = num => Math.floor(Math.random) * Math.floor(num) +

const fakeDate = () => {
  const date = faker.date.past();

  return `${date}`
}

// fakeDate();

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
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }
    console.log(user, ',')
    i++
  }

}

seedUsers(50);
