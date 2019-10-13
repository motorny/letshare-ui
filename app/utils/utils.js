import 'whatwg-fetch';

export const BASE64_RE = /^data:image\/(png|jpg|jpeg);base64,/;

export function getDataFromResp(resp) {
  const res = {};
  for (let i = 0; i < resp.length; i += 1) {
    res[resp[i].name] = resp[i];
  }
  return res;
}

export function post(url, params, callback) {
  window
    .fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    .then(callback);
}

export const parseQueryString = str => {
  if (!str) return {};
  const arr = str.split('&');
  arr.forEach((v, i, _arr) => {
    _arr[i] = `"${v.replace('=', '":"')}"`;
  });
  return str
    ? JSON.parse(
      `{${arr.join()}}`,
      (key, value) => (key === '' ? value : decodeURIComponent(value)),
    )
    : {};
};
