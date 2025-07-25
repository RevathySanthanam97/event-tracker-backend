// index.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const TICKETMASTER_API_KEY = 'SlX8PX1oC33TwpySjmIuMGdmg3MAZUND'; // 🔐 Put your real key here

app.get("/", (req, res) => {
  res.send("Backend is live");
});


app.get('/events', async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&latlong=${lat},${lon}&radius=25`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
    console.log(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching events.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
