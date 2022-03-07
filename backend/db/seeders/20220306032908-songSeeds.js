'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Songs', [
      {
        userId: 1,
        songURL: 'https://supercloud-bucket.s3.amazonaws.com/(Disc+2)+09+-+Hey+Ya!+(Radio+Mix+_+Club+Mix).mp3',
        artworkURL: 'https://supercloud-bucket.s3.amazonaws.com/(Disc+2)+09+-+Hey+Ya!+(Radio+Mix+_+Club+Mix).jpg',
        title: 'Hey Ya! (Radio Mix _ Club Mix)',
        genre: 'Hip Hop',
        description: 'alright alright alright alright alright alright alright alright alright alright alright alright alright alright alright alright alright alright ',
        duration: '3:55',
        plays: 1234567,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        songURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+%26burn.mp3',
        artworkURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+.jpg',
        title: '&burn',
        genre: 'pop',
        description: 'the eyelash',
        duration: '2:59',
        plays: 800123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        songURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+001.mp3',
        artworkURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+001.jpg',
        title: '001',
        genre: 'misc',
        description: '...',
        duration: '1:03',
        plays: 623,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        songURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+1v1+(Original+Mix).mp3',
        artworkURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+1v1+(Original+Mix).jpg',
        title: '1v1',
        genre: 'Dubstep',
        description: "1v1 Most Addictive Records - Buy Now! mostaddictive.ffm.to/drozi1v1",
        duration: '2:59',
        plays: 423201,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        songURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+2HUNNID.mp3',
        artworkURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+2HUNNID.jpg',
        title: '2HUNNID',
        genre: 'Hybrid Trap',
        description: 'i got 2 hunnid in my',
        duration: '3:29',
        plays: 400125,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        songURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+404.mp3',
        artworkURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+404.jpg',
        title: '404',
        genre: 'Tearout',
        description: 'aksdhfkajdhfkjahdf kjahdfaehfla kejhrf alkerfh alkrfjh ajlkrfh ajrfh aljkf alekjf hsf bruh',
        duration: '3:26',
        plays: 250600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        songURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+Anarchy+%5BGentlemens+Club+Remix%5D.mp3',
        artworkURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+Anarchy+%5BGentlemens+Club+Remix%5D.jpg',
        title: 'Anarchy',
        genre: 'Dubstep',
        description: 'bruh',
        duration: '4:00',
        plays: 96520,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        songURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+Angel+Style.mp3',
        artworkURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+Angel+Style.jpg',
        title: 'Angel Style',
        genre: 'Dubstep',
        description: '',
        duration: '4:05',
        plays: 666420,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        songURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+Another+Day.mp3',
        artworkURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+Another+Day.jpg',
        title: 'Another Day',
        genre: 'Dubstep',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ",
        duration: '3:23',
        plays: 52350,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        songURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+Anywhere+You+Go+(Kotek+Remix)+%5Bfeat.+Timmy+Trumpet%5D.mp3',
        artworkURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+Anywhere+You+Go+(Kotek+Remix)+%5Bfeat.+Timmy+Trumpet%5D.jpg',
        title: 'Anywhere You Go (Kotek Remix) [feat. Timmy Trumpet]',
        genre: 'Future Bass',
        description: 'a chill one',
        duration: '3:21',
        plays: 5960,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        songURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+Babatunde+(VIP).mp3',
        artworkURL: 'https://supercloud-bucket.s3.amazonaws.com/01+-+Babatunde+(VIP).jpg',
        title: 'Babatunde (VIP)',
        genre: 'Hybrid Trap',
        description: 'oresnjffhegornbfshuglijsbnfdlisa',
        duration: '3:18',
        plays: 125002,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
