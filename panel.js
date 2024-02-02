// panel.js

document.getElementById('inspectButton').addEventListener('click', function() {
    var codeToInject = "var element = document.querySelector('.text-heading-xlarge.inline.t-24.v-align-middle.break-words'); if (element) { var elementValue = element.textContent.trim(); console.log('Element Value:', elementValue); } else { console.error('Element not found.'); }";
  
    chrome.devtools.inspectedWindow.eval(codeToInject, function(result, isException) {
      if (isException) {
        console.error('Error injecting code:', result);
      } else {
        console.log('Code injected successfully.');
        // Send the result to background script to handle Google Sheets integration
        chrome.runtime.sendMessage({ action: 'handleLinkedInData', data: result });
      }
    });
  });
  