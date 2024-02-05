// background.js

// Listener for messages from content scripts or other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  if (message.type === 'extractedData') {
    const dataArray = message.data;
    console.log(dataArray)
    console.log('started')
    // Check if data is extracted
    if (dataArray.length > 0) {
      // Send the extracted data to the server
      const id = 'AKfycbyJHcUiHjo6Alm4IgnIq5bWGYcTcL9fpQyutLP0rDJGcY7hbTfVVAjO4eGONekFEc7Arw'
      const url = `https://script.google.com/macros/s/${id}/exec`
        // Sending a POST request using fetch
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: dataArray }),
    })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(result => {
    console.log('Data sent successfully:', result);
  })
  .catch(error => {
    console.error('Error during POST request:', error);
    console.log('error happened')
  });
    } else {
      console.log('No data extracted');
    }
  }
});

