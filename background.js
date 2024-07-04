chrome.runtime.onInstalled.addListener(() => {
  console.log('Visitor Interaction Analysis Extension Installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'logInteraction') {
      console.log('Interaction logged from content script:', message.data);
      // Here you can add code to process or store the interaction data
      sendResponse({status: 'success'});
  }
});
