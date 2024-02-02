// background.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'handleLinkedInData') {
      // Implement Google Sheets integration logic here
      updateGoogleSheets(request.data);
    } else if (request.action === 'openDevTools') {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'openDevTools' });
      });
    }
  });
  
  function updateGoogleSheets(data) {
    // Replace 'YOUR_WEB_APP_URL' with the actual URL of your Google Apps Script web app
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbymXcWb8hnDn31-bxqwyeAfgalYbToSjs5wAQeRdo81UZUUvD-Eb8Jh43tFn5H5Gcex/exec';
  
    // Prepare the payload to be sent to the web app
    const payload = {
      data: data,
    };
  
    // Send a POST request to the Google Apps Script web app
    fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(result => {
      console.log('Google Sheets updated successfully:', result);
    })
    .catch(error => {
      console.error('Error updating Google Sheets:', error);
    });
  }
  