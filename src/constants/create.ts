export const ALBUM_COVER_IMAGES = Object.freeze([
  require('../assets/icons/albumCover/First.png'),
  require('../assets/icons/albumCover/Second.png'),
  require('../assets/icons/albumCover/Third.png'),
  require('../assets/icons/albumCover/Fourth.png'),
  require('../assets/icons/albumCover/Fifth.png'),
]);

export const SLIDER_BREAKPOINTS = Object.freeze({
  0: {
    slidesPerView: 1.4,
  },
  320: {
    slidesPerView: 2.4,
  },
  480: {
    slidesPerView: 3.4,
  },
  645: {
    slidesPerView: 4.4,
  },
  768: {
    slidesPerView: 5,
  },
});

export const ERROR_MESSAGES = Object.freeze({
  TITLE: '앨범명을 입력해주세요.',
  SUBTITLE: '부제목을 입력해주세요.',
});

export const API_ENDPOINTS = Object.freeze({
  ALBUM_WRITE: 'https://port-0-cutalbum-back-jvpb2alnz8cuvj.sel5.cloudtype.app/user/album/write',
});

export const ICON_PROPERTIES = Object.freeze({
  BACK_ICON: {
    COLOR: '#666666',
    WIDTH: 20,
    HEIGHT: 20,
  },
});

export const DEFAULT_COVER_INDEX = 1;
