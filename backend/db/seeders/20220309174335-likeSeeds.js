'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Likes', [
    {
      userId: 10,
      songId: 58,
      createdAt: "2021-11-04T14:10:40.319Z",
      updatedAt: "2021-06-23T21:54:59.477Z",
    } ,
    {
      userId: 29,
      songId: 84,
      createdAt: "2021-07-24T02:21:52.902Z",
      updatedAt: "2021-03-13T02:57:45.098Z",
    } ,
    {
      userId: 10,
      songId: 81,
      createdAt: "2021-05-28T07:29:09.681Z",
      updatedAt: "2022-03-08T11:37:17.149Z",
    } ,
    {
      userId: 26,
      songId: 97,
      createdAt: "2021-07-10T21:58:25.241Z",
      updatedAt: "2021-08-13T19:26:05.341Z",
    } ,
    {
      userId: 7,
      songId: 15,
      createdAt: "2021-03-25T00:36:59.952Z",
      updatedAt: "2021-12-13T01:41:52.802Z",
    } ,
    {
      userId: 41,
      songId: 72,
      createdAt: "2021-10-25T13:55:38.281Z",
      updatedAt: "2022-03-01T02:53:32.395Z",
    } ,
    {
      userId: 25,
      songId: 102,
      createdAt: "2021-05-04T14:16:12.707Z",
      updatedAt: "2022-01-07T08:30:46.621Z",
    } ,
    {
      userId: 2,
      songId: 82,
      createdAt: "2021-12-02T08:19:55.742Z",
      updatedAt: "2021-10-03T02:17:01.233Z",
    } ,
    {
      userId: 41,
      songId: 31,
      createdAt: "2021-08-24T05:08:15.632Z",
      updatedAt: "2021-08-30T19:23:33.858Z",
    } ,
    {
      userId: 9,
      songId: 88,
      createdAt: "2021-12-20T11:56:05.713Z",
      updatedAt: "2021-04-30T11:28:11.965Z",
    } ,
    {
      userId: 25,
      songId: 50,
      createdAt: "2022-01-26T17:59:15.049Z",
      updatedAt: "2021-05-31T08:00:03.014Z",
    } ,
    {
      userId: 1,
      songId: 46,
      createdAt: "2021-03-22T02:52:40.036Z",
      updatedAt: "2021-10-11T12:15:09.236Z",
    } ,
    {
      userId: 41,
      songId: 69,
      createdAt: "2021-10-03T12:58:06.892Z",
      updatedAt: "2022-02-24T02:07:54.129Z",
    } ,
    {
      userId: 24,
      songId: 90,
      createdAt: "2021-10-01T00:59:33.859Z",
      updatedAt: "2021-07-06T19:33:26.721Z",
    } ,
    {
      userId: 44,
      songId: 105,
      createdAt: "2021-09-23T04:36:14.987Z",
      updatedAt: "2021-05-05T16:04:01.074Z",
    } ,
    {
      userId: 17,
      songId: 37,
      createdAt: "2021-10-29T20:01:18.386Z",
      updatedAt: "2021-03-22T20:38:47.535Z",
    } ,
    {
      userId: 35,
      songId: 3,
      createdAt: "2021-06-05T06:20:24.469Z",
      updatedAt: "2021-12-25T20:11:22.020Z",
    } ,
    {
      userId: 1,
      songId: 74,
      createdAt: "2021-12-07T05:53:42.655Z",
      updatedAt: "2022-02-08T01:59:06.215Z",
    } ,
    {
      userId: 16,
      songId: 54,
      createdAt: "2022-02-27T01:08:02.727Z",
      updatedAt: "2021-08-27T10:46:49.187Z",
    } ,
    {
      userId: 16,
      songId: 20,
      createdAt: "2021-09-20T08:55:42.275Z",
      updatedAt: "2021-10-22T16:56:48.567Z",
    } ,
    {
      userId: 33,
      songId: 56,
      createdAt: "2021-06-01T01:45:21.753Z",
      updatedAt: "2022-02-28T21:34:58.193Z",
    } ,
    {
      userId: 32,
      songId: 11,
      createdAt: "2021-12-31T12:11:17.119Z",
      updatedAt: "2021-07-17T15:04:51.686Z",
    } ,
    {
      userId: 29,
      songId: 12,
      createdAt: "2022-01-09T08:08:29.127Z",
      updatedAt: "2021-09-10T15:55:54.135Z",
    } ,
    {
      userId: 31,
      songId: 14,
      createdAt: "2021-08-06T01:57:29.092Z",
      updatedAt: "2021-12-23T13:51:21.073Z",
    } ,
    {
      userId: 4,
      songId: 83,
      createdAt: "2021-07-28T10:12:22.106Z",
      updatedAt: "2022-03-04T09:50:51.674Z",
    } ,
    {
      userId: 31,
      songId: 36,
      createdAt: "2021-10-19T16:53:38.104Z",
      updatedAt: "2021-12-14T14:19:56.700Z",
    } ,
    {
      userId: 2,
      songId: 98,
      createdAt: "2021-05-24T14:44:12.605Z",
      updatedAt: "2021-11-30T23:23:50.443Z",
    } ,
    {
      userId: 14,
      songId: 84,
      createdAt: "2021-08-06T00:18:38.779Z",
      updatedAt: "2021-04-21T23:26:56.739Z",
    } ,
    {
      userId: 40,
      songId: 45,
      createdAt: "2021-07-02T09:38:49.487Z",
      updatedAt: "2021-06-23T22:48:36.299Z",
    } ,
    {
      userId: 8,
      songId: 12,
      createdAt: "2021-10-21T14:06:28.021Z",
      updatedAt: "2021-08-13T00:55:16.040Z",
    } ,
    {
      userId: 7,
      songId: 80,
      createdAt: "2021-11-15T19:19:24.393Z",
      updatedAt: "2021-03-11T15:09:51.435Z",
    } ,
    {
      userId: 28,
      songId: 36,
      createdAt: "2021-11-19T00:38:14.650Z",
      updatedAt: "2021-09-18T18:08:45.699Z",
    } ,
    {
      userId: 35,
      songId: 64,
      createdAt: "2021-09-26T19:02:18.170Z",
      updatedAt: "2021-07-31T16:28:10.434Z",
    } ,
    {
      userId: 49,
      songId: 73,
      createdAt: "2021-09-23T02:41:22.474Z",
      updatedAt: "2021-12-12T19:43:10.627Z",
    } ,
    {
      userId: 30,
      songId: 7,
      createdAt: "2021-10-16T12:30:13.860Z",
      updatedAt: "2021-12-12T00:28:25.224Z",
    } ,
    {
      userId: 37,
      songId: 74,
      createdAt: "2021-07-21T12:09:15.857Z",
      updatedAt: "2022-02-16T01:15:22.920Z",
    } ,
    {
      userId: 30,
      songId: 81,
      createdAt: "2021-08-22T18:26:48.518Z",
      updatedAt: "2021-09-21T03:00:49.772Z",
    } ,
    {
      userId: 11,
      songId: 30,
      createdAt: "2021-10-08T19:12:09.660Z",
      updatedAt: "2021-07-24T15:10:39.721Z",
    } ,
    {
      userId: 21,
      songId: 100,
      createdAt: "2022-02-13T12:16:05.274Z",
      updatedAt: "2021-09-03T11:15:00.256Z",
    } ,
    {
      userId: 34,
      songId: 22,
      createdAt: "2021-06-20T03:52:54.663Z",
      updatedAt: "2021-06-01T02:55:06.691Z",
    } ,
    {
      userId: 32,
      songId: 92,
      createdAt: "2022-01-08T02:41:20.174Z",
      updatedAt: "2022-01-12T03:59:47.670Z",
    } ,
    {
      userId: 48,
      songId: 20,
      createdAt: "2021-06-12T11:13:13.863Z",
      updatedAt: "2021-12-17T01:16:36.697Z",
    } ,
    {
      userId: 40,
      songId: 48,
      createdAt: "2022-01-19T08:12:47.004Z",
      updatedAt: "2022-02-16T21:47:55.058Z",
    } ,
    {
      userId: 15,
      songId: 67,
      createdAt: "2022-01-27T01:55:47.344Z",
      updatedAt: "2022-01-23T17:36:17.411Z",
    } ,
    {
      userId: 48,
      songId: 59,
      createdAt: "2021-09-20T06:35:46.415Z",
      updatedAt: "2021-11-15T23:18:31.557Z",
    } ,
    {
      userId: 5,
      songId: 71,
      createdAt: "2021-12-28T00:10:01.583Z",
      updatedAt: "2022-02-05T10:42:24.471Z",
    } ,
    {
      userId: 36,
      songId: 51,
      createdAt: "2021-10-20T04:57:01.363Z",
      updatedAt: "2022-02-27T09:42:13.273Z",
    } ,
    
    // hgyuvkblkj dhliafbjjvhlabfjdssjvlakbfsvbhlakbfjlvjkzhd
    
    {
      userId: 42,
      songId: 78,
      createdAt: "2021-07-09T18:00:23.106Z",
      updatedAt: "2021-07-17T07:54:53.018Z",
    } ,
    {
      userId: 16,
      songId: 107,
      createdAt: "2021-07-09T01:11:39.906Z",
      updatedAt: "2021-10-21T12:03:09.289Z",
    } ,
    {
      userId: 41,
      songId: 3,
      createdAt: "2021-09-22T17:06:19.066Z",
      updatedAt: "2021-08-07T01:41:51.329Z",
    } ,
    {
      userId: 14,
      songId: 22,
      createdAt: "2021-11-18T02:45:27.072Z",
      updatedAt: "2021-07-01T23:14:29.494Z",
    } ,
    {
      userId: 30,
      songId: 25,
      createdAt: "2021-06-27T14:47:52.871Z",
      updatedAt: "2021-06-10T14:58:56.079Z",
    } ,
    {
      userId: 43,
      songId: 43,
      createdAt: "2021-06-05T02:19:22.568Z",
      updatedAt: "2021-08-21T02:13:45.643Z",
    } ,
    {
      userId: 1,
      songId: 67,
      createdAt: "2021-10-21T17:14:57.629Z",
      updatedAt: "2021-10-27T10:20:48.106Z",
    } ,
    {
      userId: 29,
      songId: 34,
      createdAt: "2021-04-02T10:51:52.390Z",
      updatedAt: "2021-08-16T19:14:48.479Z",
    } ,
    {
      userId: 1,
      songId: 8,
      createdAt: "2021-05-09T10:12:00.017Z",
      updatedAt: "2021-07-21T22:34:17.900Z",
    } ,
    {
      userId: 50,
      songId: 97,
      createdAt: "2021-03-19T12:48:19.916Z",
      updatedAt: "2021-12-11T13:29:29.955Z",
    } ,
    {
      userId: 33,
      songId: 3,
      createdAt: "2021-09-09T11:42:46.254Z",
      updatedAt: "2021-12-25T03:41:45.936Z",
    } ,
    {
      userId: 33,
      songId: 52,
      createdAt: "2021-09-02T04:02:15.482Z",
      updatedAt: "2021-09-15T22:49:33.227Z",
    } ,
    {
      userId: 40,
      songId: 9,
      createdAt: "2021-04-04T06:25:46.844Z",
      updatedAt: "2021-12-17T10:04:35.593Z",
    } ,
    {
      userId: 42,
      songId: 33,
      createdAt: "2021-11-15T17:57:19.720Z",
      updatedAt: "2021-07-29T19:57:51.509Z",
    } ,
    {
      userId: 5,
      songId: 49,
      createdAt: "2022-01-21T14:13:47.464Z",
      updatedAt: "2021-05-06T17:54:58.109Z",
    } ,
    {
      userId: 4,
      songId: 81,
      createdAt: "2021-10-23T03:39:36.274Z",
      updatedAt: "2021-12-31T06:59:16.123Z",
    } ,
    {
      userId: 46,
      songId: 108,
      createdAt: "2021-11-29T00:49:09.904Z",
      updatedAt: "2021-07-13T05:36:17.329Z",
    } ,
    
    
    
    // a;ksjdfkajsbdfjanskdnjfkasdjfasd;fad 2
    {
      userId: 14,
      songId: 46,
      createdAt: "2022-02-12T00:48:45.273Z",
      updatedAt: "2021-04-29T16:48:04.728Z",
    } ,
    {
      userId: 30,
      songId: 111,
      createdAt: "2021-08-20T17:45:00.229Z",
      updatedAt: "2021-12-15T21:28:24.041Z",
    } ,
    {
      userId: 48,
      songId: 70,
      createdAt: "2022-02-24T05:28:35.980Z",
      updatedAt: "2021-09-30T19:30:29.949Z",
    } ,
    {
      userId: 27,
      songId: 77,
      createdAt: "2021-12-27T20:22:05.094Z",
      updatedAt: "2021-12-13T06:04:10.895Z",
    } ,
    {
      userId: 32,
      songId: 110,
      createdAt: "2021-12-20T13:57:47.195Z",
      updatedAt: "2021-11-21T00:00:02.180Z",
    } ,
    {
      userId: 31,
      songId: 12,
      createdAt: "2021-08-28T23:46:28.634Z",
      updatedAt: "2021-05-05T17:30:09.348Z",
    } ,
    {
      userId: 6,
      songId: 85,
      createdAt: "2021-12-31T14:30:52.454Z",
      updatedAt: "2021-09-30T03:17:54.977Z",
    } ,
    {
      userId: 5,
      songId: 95,
      createdAt: "2022-01-30T07:29:57.559Z",
      updatedAt: "2021-07-24T14:11:57.007Z",
    } ,
    {
      userId: 11,
      songId: 91,
      createdAt: "2022-02-01T12:42:14.035Z",
      updatedAt: "2021-03-29T23:24:25.927Z",
    } ,
    {
      userId: 35,
      songId: 3,
      createdAt: "2021-10-04T09:36:24.747Z",
      updatedAt: "2021-12-29T09:43:16.795Z",
    } ,
    {
      userId: 5,
      songId: 16,
      createdAt: "2021-04-14T14:24:01.520Z",
      updatedAt: "2022-02-11T01:35:26.571Z",
    } ,
    {
      userId: 48,
      songId: 66,
      createdAt: "2021-10-05T02:58:37.673Z",
      updatedAt: "2021-08-14T16:18:14.427Z",
    } ,
    {
      userId: 6,
      songId: 98,
      createdAt: "2022-01-13T06:44:50.350Z",
      updatedAt: "2021-07-08T06:27:04.156Z",
    } ,
    {
      userId: 46,
      songId: 92,
      createdAt: "2021-08-14T00:46:14.515Z",
      updatedAt: "2021-10-21T15:49:23.590Z",
    } ,
    {
      userId: 12,
      songId: 40,
      createdAt: "2022-01-23T04:47:57.104Z",
      updatedAt: "2022-03-02T11:14:46.350Z",
    } ,
    {
      userId: 30,
      songId: 24,
      createdAt: "2021-05-29T20:22:10.662Z",
      updatedAt: "2022-02-12T23:35:23.665Z",
    } ,
    {
      userId: 41,
      songId: 3,
      createdAt: "2021-08-01T18:44:52.780Z",
      updatedAt: "2022-02-17T05:14:16.079Z",
    } ,
    {
      userId: 47,
      songId: 35,
      createdAt: "2022-01-04T20:53:09.080Z",
      updatedAt: "2021-03-10T05:26:07.709Z",
    } ,
    {
      userId: 1,
      songId: 80,
      createdAt: "2022-01-01T15:46:49.652Z",
      updatedAt: "2021-08-21T21:48:11.753Z",
    } ,
    {
      userId: 22,
      songId: 17,
      createdAt: "2021-12-07T01:28:12.731Z",
      updatedAt: "2021-10-11T11:54:38.733Z",
    } ,
    {
      userId: 20,
      songId: 15,
      createdAt: "2021-06-13T00:25:45.006Z",
      updatedAt: "2022-02-06T18:03:08.038Z",
    } ,
    {
      userId: 5,
      songId: 71,
      createdAt: "2021-04-10T07:13:04.328Z",
      updatedAt: "2021-03-15T23:51:26.740Z",
    } ,
    {
      userId: 35,
      songId: 55,
      createdAt: "2021-11-23T02:20:15.877Z",
      updatedAt: "2021-10-02T14:28:38.541Z",
    } ,
    {
      userId: 34,
      songId: 106,
      createdAt: "2021-09-23T12:12:17.333Z",
      updatedAt: "2021-07-21T21:07:26.326Z",
    } ,
    {
      userId: 23,
      songId: 22,
      createdAt: "2021-05-21T12:33:56.446Z",
      updatedAt: "2021-03-30T23:01:04.093Z",
    } ,
    {
      userId: 5,
      songId: 5,
      createdAt: "2022-02-21T05:27:49.481Z",
      updatedAt: "2021-04-25T05:01:35.813Z",
    } ,
    {
      userId: 10,
      songId: 10,
      createdAt: "2022-01-26T21:26:01.231Z",
      updatedAt: "2021-03-27T02:13:27.453Z",
    } ,
    {
      userId: 1,
      songId: 85,
      createdAt: "2021-03-29T06:30:41.574Z",
      updatedAt: "2021-12-28T01:57:19.921Z",
    } ,
    {
      userId: 38,
      songId: 24,
      createdAt: "2021-10-09T11:43:30.000Z",
      updatedAt: "2021-06-20T10:25:48.112Z",
    } ,
    {
      userId: 1,
      songId: 16,
      createdAt: "2021-07-16T16:42:40.237Z",
      updatedAt: "2021-09-22T18:18:16.689Z",
    } ,
    {
      userId: 21,
      songId: 33,
      createdAt: "2021-06-30T10:27:39.134Z",
      updatedAt: "2021-04-25T23:44:54.161Z",
    } ,
    {
      userId: 49,
      songId: 38,
      createdAt: "2022-02-20T05:59:50.748Z",
      updatedAt: "2021-09-11T17:58:44.883Z",
    } ,
    {
      userId: 23,
      songId: 88,
      createdAt: "2021-06-28T04:53:28.953Z",
      updatedAt: "2021-07-08T10:16:19.630Z",
    } ,
    {
      userId: 15,
      songId: 32,
      createdAt: "2022-02-10T22:41:56.387Z",
      updatedAt: "2021-08-03T16:25:56.651Z",
    } ,
    {
      userId: 50,
      songId: 91,
      createdAt: "2021-04-24T09:08:45.072Z",
      updatedAt: "2021-05-21T08:44:39.783Z",
    } ,
    {
      userId: 16,
      songId: 55,
      createdAt: "2021-10-21T01:19:14.070Z",
      updatedAt: "2021-05-13T08:53:25.131Z",
    } ,
    {
      userId: 8,
      songId: 90,
      createdAt: "2021-06-01T15:56:44.152Z",
      updatedAt: "2021-09-30T04:50:40.870Z",
    } ,
    {
      userId: 5,
      songId: 40,
      createdAt: "2022-02-25T02:06:11.879Z",
      updatedAt: "2021-08-16T21:52:48.655Z",
    } ,
    {
      userId: 49,
      songId: 91,
      createdAt: "2021-04-11T03:55:50.723Z",
      updatedAt: "2021-04-10T23:50:19.473Z",
    } ,
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Likes', null, {});
  }
};
