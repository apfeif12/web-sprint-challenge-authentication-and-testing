const request = require("supertest");
const server = require("./server");
const testUser = { username: "alex", password: "alexpass" };
const db = require("../data/dbConfig");

test("sanity", () => {
    expect(false).toBe(true);
});
