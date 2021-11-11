"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("./app");
describe("Test the root path", () => {
    test("It should response the GET method", async () => {
        await (0, supertest_1.default)(app_1.app)
            .get("/")
            .expect(200);
    });
});
//# sourceMappingURL=app.test.js.map