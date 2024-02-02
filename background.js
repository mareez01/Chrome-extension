chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'sendToGoogleSheets') {
      var data = request.data;
  
      // Specify your Google Apps Script web app URL
      var scriptUrl = 'https://script.google.com/macros/s/AKfycbz8Gq8fmWzePFJYa6YowVxODTpKYlGcMjzKtN-Yw-mfa_jqfTmInLQ1Z6FfYgpZ96Fn/exec';
  
      // Send data to Google Sheets using POST request
      fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error('Error sending data to Google Sheets:', error));
    }
  });
  