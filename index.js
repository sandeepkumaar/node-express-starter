// listen for request
import app from './src/index.js'

const server = app.listen(process.env.port || 8000, function () {
  const port = server.address().port;
  console.log('service listening on port:', port);
});
