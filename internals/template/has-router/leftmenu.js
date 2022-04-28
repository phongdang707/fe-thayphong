const { default: APP } = require('../../appConfig');

const PARENT_PREFIX = `${APP.PREFIX}/admin`;

const LEFT_MENU = [
  {
    iconName: 'emoji-flags',
    urlPath: { first: PARENT_PREFIX, last: '/dashboard' },
    label: 'Dashboard',
  },
];

export default LEFT_MENU;
