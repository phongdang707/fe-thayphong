/* eslint-disable no-undef */
import {
  safeParseInt,
  safeParse,
  getAppCookieSession,
} from '../../utils/common';
import { getAppSession } from '../../utils/web/cookie';
import APP from '../../appConfig';

export function getAppPortalId(pathname) {
  let portalId = 0;
  try {
    // const arr = pathname.split('/');
    const arr = pathname.split(APP.PREFIX);

    if (arr.length >= 2) {
      const arrTmp = arr[1].split('/');
      if (arrTmp.length >= 2) {
        // console.log('arr', arrTmp);
        portalId = safeParseInt(arrTmp[2], 0);
      }
    }
    if (portalId <= 0) {
      portalId = safeParseInt(getAppSession('api_pid'), 0);
    }
  } catch (e) {
    console.error(e);
  }
  return portalId;
}

export function mapDataPortal(items, portalId) {
  const data = {
    list: [],
    map: {},
  };
  const configPortalId = parseInt(safeParse(PORTAL_CONFIG.PORTAL_ID, 0));
  // console.log('configPortalId', configPortalId, PORTAL_CONFIG);
  if (configPortalId > 0) {
    items.forEach(item => {
      // if (item.portalId !== configPortalId) {
      //   data.map[item.portalId] = item;
      // }
      data.map[item.portalId] = item;
      data.list.push(item);
    });
  } else {
    items.forEach(item => {
      data.map[item.portalId] = item;
      if (item.portalId !== portalId) {
        data.list.push(item);
      }
    });
  }
  // console.log('mapDataPortal', data);

  return data;
}

export function validateMaintainPage() {
  if (
    PORTAL_CONFIG.IS_MAINTAIN &&
    PORTAL_CONFIG.MAINTAIN_TIME - new Date().getTime() > 0
  ) {
    return true;
  }
  return false;
}
