module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'postgym',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
