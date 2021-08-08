
import { app }  from "../app";
import * as request from "supertest";

jest.useFakeTimers();


describe("Test the root path", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});


