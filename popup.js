// popup.js
var element;
var position;
var link;
var connection;
var emailsInContainer ;
let dataArray;
// Trigger data extraction when the extension button is clicked
document.getElementById('extractData').addEventListener("click", extractData);
function extractData(){
  // Execute content script to extract data
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        element = document.querySelector('.text-heading-xlarge.inline.t-24.v-align-middle.break-words').textContent;
        //position = document.querySelector('.text-body-medium.break-words').textContent;
        link=window.location.href;
        dataArray =[element, link]
        try {
          connection = document.querySelector('.t-normal.t-black--light.t-14.hoverable-link-text');
          if (connection) {
            connection = connection.textContent.trim();
            if (connection && connection.toLowerCase().includes('animesh singhal')) {
              if (connection.toLowerCase().includes('connection')){
              console.log('Connection:', connection);
              dataArray.push('Y');
            }} else {
              dataArray.push('N');
              console.log('Connection not matching:', connection);
            }
          } else {
            dataArray.push('N');
            console.log('Connection element not found');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
        
        //mails
        try{
          emailContainers = document.querySelectorAll('.pv-contact-info__ci-container.t-14');
          console.log(emailContainers)
          function extractEmails(text) {
            var regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
            return text.match(regex) || [];
          }
          // Loop through each email container
           emailContainers.forEach(function(container) {
            // Get the text content of the container
            var containerText = container.innerText;
          
            // Extract email addresses from the container text
            emailsInContainer = extractEmails(containerText);
          
            // Check if any email addresses were found
            if (emailsInContainer.length > 0) {
              console.log('Emails in container:', emailsInContainer[0]);
              dataArray.push(emailsInContainer[0])
              alert(`Mail Found`)
            }
            else{dataArray}
          });
        }catch(error){
          console.error('Error:', error.message);
        }

        console.log(dataArray)
        // Move the alert inside the asynchronous block
        alert('Process Completed');
        chrome.runtime.sendMessage({ type: 'extractedData', data: dataArray });
      }
    })
})
}

