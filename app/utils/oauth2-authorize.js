import request from '../utils/request';
import { setLogined, setSession, setUser } from '../cookieManager';
import { parseQueryString } from './utils';
import { urls, auth_config } from './constants';

const btoa = str => {
  let buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = new Buffer(str.toString(), 'utf-8');
  }

  return buffer.toString('base64');
};

const buildFormData = data => {
  const formArr = [];

  for (const name in data) {
    const val = data[name];
    if (val !== undefined && val !== '') {
      formArr.push(
        [name, '=', encodeURIComponent(val).replace(/%20/g, '+')].join(''),
      );
    }
  }
  return formArr.join('&');
};

export function getToken(state, uri, redirectUrl, onAuth, onError) {
  let qp = new URL(uri);
  if (/code|token|error/.test(qp.hash)) {
    qp = qp.hash.substring(1);
  } else {
    qp = qp.search.substring(1);
  }
  qp = parseQueryString(qp);

  const isValid = qp.state === state;
  if (!isValid) {
    console.log("Authorization may be unsafe, passed state was changed in server Passed state wasn't returned from auth server");
  }

  if (qp.code) {
    const form = {
      redirect_uri: redirectUrl,
      grant_type: "authorization_code",
      client_id: auth_config.client_id,
    };
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `code=${qp.code}`,
    };
    const url = [urls.auth.access_token_url, buildFormData(form)].join(
      urls.auth.access_token_url.indexOf('?') === -1 ? '?' : '&',
    );
    getTokenRequest(url, options, onAuth, onError);
  } else {
    let oauthErrorMsg;
    if (qp.error) {
      oauthErrorMsg = `[${qp.error}]: ${
        qp.error_description
          ? `${qp.error_description}. `
          : 'no accessCode received from the server. '
      }${qp.error_uri ? `More info: ${qp.error_uri}` : ''}`;
    }
    onError(oauthErrorMsg || "No accessCode received from the server");
  }
}

function getTokenRequest(tokenUrl, options, onAuth, onError) {
  request(tokenUrl, options)
    .then(resp => {
      setSession(resp.access_token);
      setLogined(true);
      setUser(resp.username);
      onAuth(resp);
    })
    .catch(err => {
      if (err.response)
        err.response.json().then(resp => onError(resp.error));
      else
        onError(err.message);
    });
}

export default function authorize(login, password, onAuth, onError) {
  const query = [];
  const redirectUrl = window.location.origin + urls.auth.oauth2RedirectUrl;
  const state = btoa(new Date());

  query.push('response_type=code');
  query.push(`client_id=${encodeURIComponent(auth_config.client_id)}`);
  query.push(`redirect_uri=${encodeURIComponent(redirectUrl)}`);
  if (Array.isArray(auth_config.scopes) && auth_config.scopes.length > 0) {
    const scopeSeparator = ' ';
    query.push(
      `scope=${encodeURIComponent(auth_config.scopes.join(scopeSeparator))}`,
    );
  }
  query.push(`state=${encodeURIComponent(state)}`);

  const url = [urls.auth.authorization_url, query.join('&')].join(
    urls.auth.authorization_url.indexOf('?') === -1 ? '?' : '&',
  );
  const body = {
    username: login,
    password,
  };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json, application/x-www-form-urlencoded',
    },
    body: JSON.stringify(body),
  };
  request(url, options)
    .then(resp => {
      getToken(state, resp.uri, redirectUrl, onAuth, onError);
    })
    .catch(err => {
      if (err.response)
        err.response.json().then(resp => onError(resp.error));
      else
        onError(err.message);
    });
}
