import request from './request';
import { getSession } from '../cookieManager';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function requestAuth(url, options) {
  let optionsAuth;
  if (options) {
    if (!options.headers)
      options.headers = {};
    options.headers.authorization = `Bearer ${getSession()}`;
  }
  else
    options = {
      headers: {
        authorization: `Bearer ${getSession()}`,
      },
    };
  console.log(options);
  return request(url, options);
}
