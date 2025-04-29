let db = null;

const setDb = (connection) => {
  db = connection;
};

const getDb = () => db;

module.exports = { setDb, getDb };
