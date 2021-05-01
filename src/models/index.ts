import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1/caregiver-server-ts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, '‼ Connection Error ‼️ : '));
db.once('open', () => console.log('Connected to mongoose'))