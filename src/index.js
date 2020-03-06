
import config from './config';
import common from './common';
import {CustomizeDialog} from './CustomizeDialog';

kintone.events.on('app.record.index.show', (event) => {
  const oauthCode = common.extractUrlValue('code');
  if (!oauthCode) {
    return event;
  }

  const dialog = new CustomizeDialog(event);
  document.body.append(dialog.render());
  dialog.show();

  const authBase64Encode = btoa(`${config.clientId}:${config.clientSecret}`);
  const url = config.tokenUrl.replace('${oauthCode}', oauthCode);
  const header = {
    Authorization: `Basic ${authBase64Encode}`
  };

  return kintone.proxy(url, 'POST', header, {}, (rsp) => {
    localStorage.setItem("access_token", JSON.parse(rsp).access_token);
  }, (error) => {
    console.log(error);
  });
});

kintone.events.on(['app.record.edit.show', 'app.record.create.show'], (event) => {
  const record = event.record;
  record[localStorage.getItem("zoom_url")]['disabled'] = true;
  return event;
})

kintone.events.on('app.record.create.submit', (event) => {
  const header = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json'
  }
  const record = event.record
  const createMettingData = {
    topic: record[localStorage.getItem("zoom_topic")].value,
    type: 1,
    start_time: record[localStorage.getItem("zoon_end_time")].value,
    timezone: "Asia/Saigon",
    password: "1234",
    agenda: "string",
    action: 'Start'
  }

  return common.sendRequest(config.getUserUrl, 'GET', header, {}).then((rsp) => {
    const createMeetingUrl = config.postMeetingUrl.replace('userId', JSON.parse(rsp).users[0].id);
    createMettingData.user_info = JSON.parse(rsp).users[0];
    
    return common.sendRequest(createMeetingUrl, 'POST', header, createMettingData);
  }).then(rsp => {
    record[localStorage.getItem("zoom_url")].value = JSON.parse(rsp).join_url;
    return event;
  }).catch((err) => {
    console.log(err);
  });
});