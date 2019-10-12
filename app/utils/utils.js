import 'whatwg-fetch';

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
