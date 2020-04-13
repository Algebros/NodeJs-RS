const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  db.dropDatabase();
  console.log('MongoDB connected!');
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
