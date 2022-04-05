export default (app) => {
  app.get('/', (req, res) => {
    res.json({
      message: 'Server is up!',
      FlureeBaseURL,
      env: process.env
    });
  });

  app.post('/user/add', (req, res, next) => {

  });
}
