process.env.NOD_ENV = 'test';

import chai from 'chai'
import chaiHttp from 'chai-http';
import app from '../src/server';
import config from '../../config.json'

chai.use(chaiHttp);
chai.should();

const network = config['default_network'];
const network_name = config['network'][network]['name'];

console.log("~~~ Running tests on: " + network_name.toUpperCase() + " ~~~\n");

describe('Client server.ts', () => {
    describe("GET /api/v1/getRegistration/{test_public_key}", () => {
        // Test to get single registration
        it(`should lookup the registration for a known registration on ${network_name}`, (done) => {
            const pubkey = "0x16df5cb8b1ab4232227f0a5e0c5682a04020a7686cc23a";
            chai.request(app)
                .get(`/api/v1/getRegistration/${pubkey}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});