// popup.js

document.getElementById('openDevTools').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'openDevTools' });
  });
  