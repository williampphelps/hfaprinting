import mongoose from 'mongoose';

import { MONGODB_URI, DATABASE_NAME } from '$env/static/private';

let connection = {};

async function dbConnect(action = 'connect') {

  if (action == 'connect') {
    console.log('Trying to connect...')
  }
  if (action == 'disconnect') {
    console.log('Trying to disconnect...')
  }
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(MONGODB_URI + DATABASE_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
    maxPoolSize: 5
  });

  connection.isConnected = db.connections[0].readyState;
}

async function dbDisconnect() {
  mongoose.disconnect();
}

export default dbConnect;