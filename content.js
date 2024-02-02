// content.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'injectCode') {
      var script = document.createElement('script');
      script.textContent = request.code;
      document.head.appendChild(script).parentNode.removeChild(script);
    }
  });
  