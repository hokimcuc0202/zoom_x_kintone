import axios from 'axios';

function extractUrlValue(key, url) {
  if (typeof (url) === 'undefined')
    url = window.location.href;
  var match = url.match('[?&]' + key + '=([^&]+)');
  return match ? match[1] : null;
}

function _handleZoomBtnClick(e) {
  const Client_ID = 'p0FxpTgbSlXpIW1ruaGfA';
  const Client_Secret = 'bMiMUZ1Ae5fxjIKHW6XRXJ6RI8RoCO2P';
  var authBase64Encode = btoa(`${Client_ID}:${Client_Secret}`);
  // cDBGeHBUZ2JTbFhwSVcxcnVhR2ZBOmJNaU1VWjFBZTVmeGpJS0hXNlhSWEo2Ukk4Um9DTzJQ

  const oauthCode = extractUrlValue('code');

  const url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${oauthCode}&redirect_uri=https%3A%2F%2Fsdd-demo.cybozu.com%2Fk%2F445%2F`;
  const header = {
    Authorization: `Basic ${authBase64Encode}`
  };

  kintone.proxy(url, 'POST', header, (resp) => {
    console.log(resp);
  }, (error) => {
    console.log(error);
  });
};

kintone.events.on('app.record.index.show', (event) => {
  var btnEl = document.createElement('button');
  btnEl.textContent = 'zoom';
  btnEl.onclick = _handleZoomBtnClick;

  kintone.app.getHeaderMenuSpaceElement().appendChild(btnEl);
});
