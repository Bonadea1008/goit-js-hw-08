import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const VIDEO_CURRENT_TIME = 'videoplayer-current-time';

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (data) {
  const currentTime = data.seconds;
  localStorage.setItem(VIDEO_CURRENT_TIME, currentTime);
};

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(localStorage.getItem(VIDEO_CURRENT_TIME));
