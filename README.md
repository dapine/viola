# viola

viola is an experimental subtitles editor with a simple UI and subtitles styling.

## Installation
Tested in Linux and Windows. At the moment there is no release packages, so should be built with `npm` manually. You need the latest stable version of `npm` and `node.js`. Download or clone this repo then `cd` into the directory and run the following command:

```
npm run electron-pack
```

## Running dev environment
To run development version on browser, you need to preload the video by placing it on `public` directory.
Then create a `.env.development.local` file with the variable `REACT_APP_DEV_VIDEO_PATH` pointing to the video absolute path, e.g.:
```
REACT_APP_DEV_VIDEO_PATH=/BigBuckBunny.mp4
```
After the env setup, run `npm start` and `npm run electron-dev` in another terminal if you want to run electron.
