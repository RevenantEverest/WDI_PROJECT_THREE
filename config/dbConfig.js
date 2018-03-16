//Configuration of the database that is used by express

module.exports = process.env.DATABASE_URL || {
  host:         process.env.DB_HOST || `localhost`,
  port:         process.env.DB_PORT || 5432,
  database:     process.env.DB_NAME || `testing_for_react_db`,
}
