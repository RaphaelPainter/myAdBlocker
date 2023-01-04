console.log("Hello from background script !!!");
var isBlockingActive = true;

const url = "https://dbl.oisd.nl/basic/";
var blockedUrls = [];
var blockedRequestsCount = 0;

fetch(url)
  .then((response) => response.text())
  .then((responseText) => {
    //get blocked url then format
    blockedUrls = responseText
      .split("\n")
      .filter(Boolean)
      .filter((e) => !e.startsWith("#"))
      .map((e) => "*://" + e + "/*");
    //block urls

    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.msg === "toggleAdBlocking") {
        console.log("background toggleAdBlocking");
        if (isBlockingActive) {
          chrome.webRequest.onBeforeRequest.removeListener(blockAd);
        } else {
          chrome.webRequest.onBeforeRequest.addListener(
            blockAd,
            { urls: blockedUrls },
            ["blocking"]
          );
        }
      }
    });
  });

function blockAd(details) {
  blockedRequestsCount++;
  console.log(blockedUrls);
  console.log(details + "was blocked");
  chrome.browserAction.setBadgeText({
    text: blockedRequestsCount.toString(),
  });
  return { cancel: true };
}
