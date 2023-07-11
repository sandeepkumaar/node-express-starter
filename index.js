// listen for request
import config from 'config';
import app from './src/index.js'


const { port } = config.server;

const server = app.listen(port, function () {
  const port = server.address().port;
  console.log('service listening on port:', port);
});
