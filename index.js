// Load .env variables
require("dotenv").config();

const http = require("http");
const openradio = require("openradio");
const radio = openradio();
const fs = require("fs");
const musicMedia = require("music-metadata");

const stream = require("./stream");
const text = require("./text");

const repeater = openradio.repeater(radio);
http
  .createServer((req, res) => {
    res.setHeader("content-type", "audio/mp3");
    if (radio.header) res.write(radio.header);
    repeater(res);
  })
  .listen(process.env.PORT || 3000);

const { extname } = require("path");
const list = fs
  .readdirSync("./music", { withFileTypes: true })
  .filter(function (item) {
    // Make it returns true
    return (
      item.isFile &&
      (extname(item.name) === ".mp3" ||
        extname(item.name) === ".ogg" ||
        extname(item.name) === ".opus" ||
        extname(item.name) === ".aac" ||
        extname(item.name) === ".m4a" ||
        extname(item.name) === ".wav" ||
        extname(item.name) === ".flac" ||
        extname(item.name) === ".ape" ||
        extname(item.name) === ".wv" ||
        extname(item.name) === ".oga")
    );
  })
  .map((songItem) => songItem.name);

let seconds = 0;
const startTime = () =>
  setInterval(() => {
    seconds += 1;
  }, 1000);

const getSongPath = (index) => {
  const random = Math.floor(Math.random() * list.length);
  const songPath = `./music/${list[index || random]}`;

  // Get music metadata
  musicMedia
    .parseFile(songPath)
    .then(({ common }) => {
      const artist = common.artist || "unknown";
      const title = common.title || "unknown";
      const song = `${artist.charAt(0).toUpperCase() + artist.slice(1)} - ${
        title.charAt(0).toUpperCase() + title.slice(1)
      }`;

      console.log("Now >>> ", song);

      // Saves the song name to show in the live screen
      text.changeText(song);

      // Saves the song on history file
      text.addInHistory(songPath, song, seconds);
    })
    .catch((error) => console.log(error.message));

  // aqui retorna a musica
  return songPath;
};

// Fetch & Play song randomly fron Music Directory!
radio.play(getSongPath());

// Starts counting seconds to include in the history of songs played
startTime();

// Starts the stream with ffmpeg
stream.Start();

// Starts a new song when the current song ends
radio.on("finish", () => {
  radio.play(getSongPath());
});
