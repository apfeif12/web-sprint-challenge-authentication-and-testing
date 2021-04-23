const db = require("../../data/dbConfig.js");

function findBy(filter) {
    return db("users").where(filter);
}

async function create(user) {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
}

function findById(id) {
    return db("users").where({ id }).first();
}

module.exports = {
    create,
    findBy,
    findById,
};
