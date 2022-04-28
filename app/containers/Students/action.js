import Types from "./constants";

export function getProfile(payload) {
  return {
    type: Types.GET_PROFILE,
    payload,
  };
}
export function init(payload) {
  return {
    type: Types.INIT,
    payload,
  };
}

export function initDone(payload) {
  return {
    type: Types.INIT_DONE,
    payload,
  };
}

export function switchMenu(payload) {
  return {
    type: Types.SWITCH_MENU,
    payload,
  };
}
