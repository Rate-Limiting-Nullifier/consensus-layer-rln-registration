process.env.NOD_ENV = 'test';

import chai from 'chai'
import chaiHttp from 'chai-http';
import app from '../src/public/App.vue';
import config from '../../config.json'

chai.use(chaiHttp);
chai.should();

const network = config['default_network'];
const network_name = config['network'][network]['name'];

console.log("~~~ Running tests on: " + network_name.toUpperCase() + " ~~~\n");

describe('Client Frontend', () => {
    describe("GET /", () => {
        // Test to get return the home page
        it("should get return index.html", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.html;
                    done();
                });
        });
    });
});