chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'extractLinkedInInfo') {
      var firstName = getValueBySelector('.pv-top-card-section__first-name');
      var lastName = getValueBySelector('.pv-top-card-section__last-name');
      var position = getValueBySelector('.pv-top-card-section__headline');
      var company = getValueBySelector('.pv-top-card-section__company');
  
      chrome.runtime.sendMessage({
        action: 'sendToGoogleSheets',
        data: { firstName, lastName, position, company }
      });
    }
  });
  
  function getValueBySelector(selector) {
    var element = document.querySelector(selector);
    return element ? element.innerText.trim() : '';
  }
  