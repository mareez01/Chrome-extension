chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'sendToGoogleSheets') {
      // Implement logic to send data to Google Sheets (e.g., using Google Sheets API or Google Apps Script)
      // This might involve making an HTTP request to your Apps Script web app endpoint
      console.log('Data received in background.js:', request.data);
    }
  });
  