const express = require('express');
const needle = require('needle');
const cors = require('cors');
const config = require('dotenv').config();
const TOKEN = process.env.TWITTER_BEARER_TOKEN;
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

const streamURL = 'https://api.twitter.com/2/users/2359834170/tweets';

let jactTweets = [];

needle.get(
  streamURL,
  { headers: { Authorization: `Bearer ${TOKEN}` } },
  (error, res) => {
    if (!error && res.statusCode == 200) {
      jactTweets.push(res.body);
      console.log(jactTweets);
    }
  }
);

app.post('/', function (req, res) {
  res.send(jactTweets);
});

app.listen(PORT, () => console.log(`listning on port ${PORT}`));
