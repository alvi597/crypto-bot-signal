const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
// You need to create a Firebase project and generate a service account key JSON file.
// Place that JSON file in the server folder and name it 'serviceAccountKey.json'
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware to verify Firebase ID token sent from client
async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).send('Unauthorized: No token provided');

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).send('Unauthorized: Invalid token');
  }
}

// Dummy crypto signals data (replace with real data source if needed)
const cryptoSignals = [
  { id: 1, name: 'Bitcoin', icon: '₿', price: '$28,000', signal: 'BUY' },
  { id: 2, name: 'Ethereum', icon: 'Ξ', price: '$1,850', signal: 'SELL' },
  { id: 3, name: 'Binance Coin', icon: 'ⓑ', price: '$310', signal: 'BUY' },
  { id: 4, name: 'Cardano', icon: '₳', price: '$0.45', signal: 'BUY' },
  { id: 5, name: 'Solana', icon: '◎', price: '$22', signal: 'SELL' },
  { id: 6, name: 'Ripple', icon: '✕', price: '$0.38', signal: 'BUY' },
  { id: 7, name: 'Polkadot', icon: '●', price: '$6.8', signal: 'SELL' },
  { id: 8, name: 'Dogecoin', icon: 'Ð', price: '$0.07', signal: 'BUY' },
  { id: 9, name: 'Litecoin', icon: 'Ł', price: '$95', signal: 'SELL' },
  { id: 10, name: 'Chainlink', icon: '⧫', price: '$7.2', signal: 'BUY' },
];

// Protected route to get crypto signals
app.get('/api/signals', verifyToken, (req, res) => {
  res.json(cryptoSignals);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
