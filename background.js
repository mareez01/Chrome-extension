// background.js

// Listener for messages from content scripts or other parts of the extension
// background.js

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log(message);

  if (message.type === 'extractedData') {
    const dataArray = message.data;
    console.log(dataArray);
    console.log('started');

    // Check if data is extracted
    if (dataArray.length > 0) {
      const id = 'AAKfycbxYH41B0vimUGL8jgRQNRFbDU0GZO_jhONYCzzHmiElrIPEVmUlmZ_8gJ4SJDW5deHeUA';
      const url = `https://script.google.com/macros/s/${id}/exec`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: dataArray }),
        });
        console.log(response)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //const result = await response.json();
        console.log('Data sent successfully:', response);
      } catch (error) {
        console.error('Error during POST request:', error);
        console.log('Error happened');
      }
    } else {
      console.log('No data extracted');
    }
  }
});
