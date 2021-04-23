const request = require("supertest");
const server = require("./server");
const testUser = { username: "alex", password: "alexpass" };
const db = require("../data/dbConfig");

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db("users").truncate();
});

afterAll(async () => {
    await db.destroy();
});

test("sanity", () => {
    expect(true).toBe(true);
});

describe("server", () => {
    describe("[POST] /users", () => {
        it("Returns a 201 and the user on successful register", async () => {
            let res = await request(server)
                .post("/api/auth/register")
                .send(testUser);
            expect(res.status).toEqual(201);
        });
    });

    describe("[POST] /login", () => {
        it("returns a 200 on successful login", async () => {
            await request(server).post("/api/auth/register").send(testUser);
            let res = await request(server)
                .post("/api/auth/login")
                .send(testUser);
            expect(res.status).toEqual(200);
        });
    });
});
