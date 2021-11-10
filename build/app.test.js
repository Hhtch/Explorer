var request = require("supertest");
var app = require("./app");
describe("Test the root path", function () {
    test("It should response the GET method", function (done) {
        request(app)
            .get("/")
            .then(function (response) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
