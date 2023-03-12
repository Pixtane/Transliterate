// Remove any existing context menus with the same ID
chrome.contextMenus.removeAll();
  // Create a context menu item
  chrome.contextMenus.create({
      id: "transliterate",
      title: "Transliterate",
      contexts: ["selection"],
  });


// Add an event listener for the context menu item
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    // Send message to console, that it can start working.
    chrome.tabs.sendMessage(tab.id, { action: "transliterate" });
});

chrome.commands.onCommand.addListener(function (command) {
    if (command === "transliterate") {
      // Get the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Send the message to the active tab
        chrome.tabs.sendMessage(tabs[0].id, { action: "transliterate" });
      });
    }
    if (command === "transliteratefull") {
      // Get the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Send the message to the active tab
        chrome.tabs.sendMessage(tabs[0].id, { action: "transliteratefull" });
      });
    }
  });

var chromeURLstylable;
chrome.permissions.contains({origins: ["chrome://*/*"], permissions: ["tabs"]}, function(state) {
    chromeURLstylable = state;
    console.log("chrome:// urls support", state);

    if (chromeURLstylable) {
        chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
            if (info.status == "loading" && tab.url.indexOf("chrome://") == 0) {
                chrome.tabs.insertCSS({
                    file: "style.css", 
                    runAt: "document_start",
                    allFrames: true
                });
            }
        });
    }
});