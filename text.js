const fs = require("fs");

const secondsToTime = (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let fminutes = String(minutes).padStart(2, "0");
  let fhours = String(hours).padStart(2, "0");
  let fseconds = String(seconds).padStart(2, "0");

  return `${fhours}:${fminutes}:${fseconds}`;
};

module.exports.changeText = (text) => {
  try {
    fs.writeFileSync("./assets/livetext.txt", text);
  } catch {}
};

module.exports.addInHistory = (file, song, seconds) => {
  const data = JSON.parse(fs.readFileSync("./assets/history.json"));
  data.push({ song, file, time: secondsToTime(seconds) });
  try {
    fs.writeFileSync("./assets/history.json", JSON.stringify(data, null, 2));
  } catch {}
};
