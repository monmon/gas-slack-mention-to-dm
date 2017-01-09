var webhookUrl = "" // "https://hooks.slack.com/services/XXX/XXX/XXX"
var dmUserId = "";

var SlackApp = function(webhookUrl) {
  this._ = {
    webhookUrl: webhookUrl
  };
};
SlackApp.prototype = {
  postMessage: postMessage
};

function postMessage(options) {
  var sendOptions = {
    method: "post",
    payload: {"payload": JSON.stringify(options)}
  };

  if (this._.webhookUrl) {
    UrlFetchApp.fetch(this._.webhookUrl, sendOptions);
  }
};


function doPost(e) {
  if (!e) {
    return;
  }

  var regExp = new RegExp(dmUserId);
  if (!regExp.test(e.parameter.text)) {
    return;
  }

  var url = "https://" + e.parameter.team_domain + ".slack.com/archives/" + e.parameter.channel_name + "/p" + e.parameter.timestamp.replace(".", "");

  var slackApp = new SlackApp(webhookUrl);
  options = {
    text: e.parameter.text,
    channel: dmUserId,
    attachments: [{
      fields:[{
        value: url,
        short: false
      }]
    }]
  };
  slackApp.postMessage(options);
}
