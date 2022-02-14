/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
// const videogame = {
//   name: 'Super Mario Bros',
// };
const videogame = {
  name: 'Super Mario Bros',
  description: 'This was the most popular videogame in 1989',
  released: '01-01-1989',
  rating: 4.5,
  image: 'https://i.insider.com/5571adb8eab8eacc63186f29',
  genres: ['Platformer'],
  platforms: ['NES']
};

describe('Videogame routes', () => {

  before(() => conn.authenticate()

  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));

  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
  
});

