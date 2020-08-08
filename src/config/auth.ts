export default {
  jwt: {
    secret: process.env.APP_SECRET || 'appsecret',
    expiresIn: '1d',
  },
};
