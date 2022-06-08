/* eslint-disable linebreak-style */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../src/index';

dotenv.config();
chai.should();
chai.use(chaiHttp);

describe('POST /api/v1/user', () => {
  /**
     * Should POST a new user
     */

  it('It should POST a new user', (done) => {
    const userId = Math.floor(Math.random() * 1000);
    const newUser = {
      firstname: `Abi${userId}`,
      lastname: `Seth${userId}`,
      email: `abi${userId}@gmail.com`,
      roleId: '9340272366132983293',
      phoneNumber: '0781294147',
      password: 'pass12345'
    };

    chai.request(server)
      .post('/api/v1/user')
      .send(newUser)
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.a('object');
        response.body.should.have.property('success').eq(true);
        response.body.should.have.property('message').eq('Account created. Please verify via email!');
        response.body.should.have.property('data').be.a('object');
        done();
      });
  });

  /**
     * Should NOT POST a duplicate user email
     */

  it('It should NOT POST a duplicate user email', (done) => {
    const newUser = {
      firstname: 'Abi',
      lastname: 'Seth',
      email: 'abi_seth@gmail.com',
      roleId: '9340272366132983293',
      phoneNumber: '0781294147',
      password: 'pass12345'
    };

    chai.request(server)
      .post('/api/v1/user')
      .send(newUser)
      .end((err, response) => {
        response.should.have.status(403);
        response.body.should.have.property('success').eq(false);
        response.body.should.have.property('message').eq('This email address has already been used!');
        done();
      });
  });
});
