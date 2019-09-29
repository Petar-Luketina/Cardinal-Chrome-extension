console.log('BG running');
var count = 0;
var onOff = 'off'

var json = {
  left: '',
  right: ''
}

chrome.commands.onCommand.addListener(function(command) {

  if (command === 'toggle-on') {
    onOff = 'on'
  }
  else if (command === 'toggle-off') {
    onOff = 'off'
  }
  console.log(onOff)
});

chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {

  if (response.message === 'onOff') {
    sendResponse(onOff);
    return;
  }

  else if (response.message === 'check count') {
    sendResponse(count);
  }

  else if (response.message === 'get json') {
    sendResponse(json);
  }

  else if (response.message === 'complete') {
    if (count === 0) {
      json.left = response.info;
      // chrome.tabs.move(sender.tab.id, {windowId: sender.tab.windowId,index: -1});

      url = 'https://centineltestadmin.cardinalcommerce.com/core/default.asp';
      chrome.tabs.update(sender.tab.id, {url:url, active:true, highlighted:true});
    }
    else {
      json.right = response.info;
      url = 'http://www.jsondiff.com';
      chrome.tabs.update(sender.tab.id, {url:url, active:true, highlighted:true});
      //target the jsondiff page
    }
    count++;
    sendResponse(true);
  };
});
