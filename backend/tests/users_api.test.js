const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const User = require("../models/user");
const helpers = require("./test_helpers");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany();

  const user = new User(helpers.initialUsers[0]);
  await user.save();
});

//Get users
describe("When there are users saved", () => {
  test("correct number of users in JSON are returned", async () => {
    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helpers.initialUsers.length);
  });

  test("a specific user can be viewed", async () => {
    const usersAtStart = await helpers.usersInDb();
    const userToView = usersAtStart[0];

    const response = await api
      .get(`/api/users/${userToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.username).toEqual(userToView.username);
  });

  test("all users have field id", async () => {
    const response = await api.get("/api/users");

    response.body.forEach((user) => {
      expect(user.id).toBeDefined();
    });
  });
});

describe("creation of a user", () => {
  test("succeeds with valid name, username and password", async () => {
    const user = {
      username: "tester1",
      name: "Tester Vu",
      password: "testingPassword",
    };

    const usersAtStart = await helpers.usersInDb();

    await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helpers.usersInDb();
    const usernames = usersAtEnd.map((user) => user.username);
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(usernames).toContain(user.username);
  });

  test("fails with a proper error if username is too short", async () => {
    const user = {
      username: "te",
      name: "Tester Vu",
      password: "testingPassword",
    };

    const usersAtStart = await helpers.usersInDb();

    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helpers.usersInDb();
    const usernames = usersAtEnd.map((user) => user.username);
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(usernames).not.toContain(user.username);

    expect(response.body.error).toContain(
      "`username` (`te`) is shorter than the minimum allowed length (3)."
    );
  });

  test("fails with a proper error if password is too short", async () => {
    const user = {
      username: "tester1",
      name: "Tester Vu",
      password: "te",
    };

    const usersAtStart = await helpers.usersInDb();
    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helpers.usersInDb();
    const usernames = usersAtEnd.map((user) => user.username);
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(usernames).not.toContain(user.username);

    expect(response.body.error).toContain(
      "`password` is shorter than the minimum allowed length (3)"
    );
  });

  test("fails with a proper error if username is not unique", async () => {
    const user = {
      username: helpers.initialUsers[0].username,
      name: "tester2",
      password: "testingPassword2",
    };

    const usersAtStart = await helpers.usersInDb();
    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helpers.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    expect(response.body.error).toContain("expected `username` to be unique.");
  });
});

//Login, log out
afterAll(async () => {
  await mongoose.connection.close();
});
