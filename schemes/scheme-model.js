const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("steps")
    .join("schemes as s", "steps.scheme_id", "s.id")
    .where("steps.scheme_id", id)
    .select("s.id", "s.scheme_name", "steps.step_number", "steps.instructions");
}

function add(scheme, id) {
  return db("schemes")
    .insert(scheme)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(updatedScheme => findById(id));
}

function remove(id) {
  const deletedScheme = findById(id);
  return db("schemes")
    .where("id", id)
    .del()
    .then(deleted => deletedScheme);
}
