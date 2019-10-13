import { getSession } from '../cookieManager';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const colors = {
  base: '#2a729c',
};

export const emailApi = 'https://itsociety.su/api/email';

export const serverUrl = 'http://80.78.255.236:1337';

export const requestDataUrl = `${serverUrl}/graphql`;

export const CAPTCHA_KEY = '6LfH7KsUAAAAAE9bCsjxT03vsKFuEmNwytHjyTsX';

export const server = 'http://185.91.53.50:5000/';

export const urls = {
  auth: {
    authorization_url: `${server}oauth2/authorize`,
    signup_url: `${server}oauth2/register`,
    access_token_url: `${server}oauth2/token`,
    token_info_url: `${server}oauth2/info?access_token=${getSession()}`,
    revoke_token_url: `${server}oauth2/revoke`,
    oauth2RedirectUrl: '/auth',
  },
  profile: {
    get: uid => `${server}profile/${uid}`,
    update: uid => `${server}profile/${uid}`,
  },
};

export const auth_config = {
  client_id: 'LkfJ5OXGbaCxBRzzrJhcS9xh',
  scopes: ['user'],
};
