
export default () => ({
    secret_key: process.env.JWT_SECRET_KEY,
    expires_in: process.env.JWT_ESPIRES_IN
  });