module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  db: {
    username: process.env.DB_USERNAME || process.env.RDS_USERNAME,
    password: process.env.DB_PASSWORD || process.env.RDS_PASSWORD,
    database: process.env.DB_DATABASE || process.env.RDS_DB_NAME,
    host: process.env.DB_HOST || process.env.RDS_HOSTNAME
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN
  }
};
