import mongoose from 'mongoose';
const NODE_ENV = process.env.NODE_ENV;
const MONGO_URI = NODE_ENV === "development" ? process.env.MONGODB_URI_LOCAL as string : "";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '‼ Connection Error ‼️ : '));
db.once('open', () => console.log(`📚 Connected to MongoDB at ${MONGO_URI}`));