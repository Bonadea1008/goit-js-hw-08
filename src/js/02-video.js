import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const VIDEO_CURRENT_TIME = 'videoplayer-current-time';

player.getVideoTitle().then(title => {
  console.log('title:', title);
});

const onPlay = function (data) {
  const currentTime = data.seconds;
  if (currentTime) {
    localStorage.setItem(VIDEO_CURRENT_TIME, currentTime);
  }
};

player.on('timeupdate', throttle(onPlay, 1000));
populateTime();

function populateTime() {
  if (localStorage.getItem(VIDEO_CURRENT_TIME)) {
    player.setCurrentTime(localStorage.getItem(VIDEO_CURRENT_TIME));
  }
}

// player
//   .setCurrentTime(localStorage.getItem(VIDEO_CURRENT_TIME))
//   .then(seconds => {})
//   .catch(error => {
//     switch (error.name) {
//       case 'RangeError':
//         break;
//       default:
//         break;
//     }
//   });
