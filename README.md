# 24/7 Radio Twitch/Youtube stream

Use your computer to create a 24/7 radio station by streaming music to youtube or twitch

## Usage

To use this you need to create a `.env` file.<br>
Example:

## For Twitch.tv

```
STREAM_KEY=YOUR-TWITCH-STREAM-KEY
VIDEO_SIZE=1280x720
BITRATE=3000
PORT=3000
```

## For YouTube

Add `INGEST` variable with YouTube rmpt url

```
PORT=3001
VIDEO_SIZE=1280x720
BITRATE=3000
INGEST=rtmp://a.rtmp.youtube.com/live2/YOUR-YOUTUBE-STREAM-KEY
```

- Install the dependencies using `npm install`
- Create your `.env` file
- Put your songs in the `./music` folder
- Run `npm start` command
- Enjoy your 24/7 radio

> Be careful with the choice of songs to avoid copyright issues

> This project is a modification of [this macedonga project](https://github.com/macedonga/lofi.twitch.auto.stream)
