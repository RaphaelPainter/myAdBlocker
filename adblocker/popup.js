console.log("Hello from popup script !!!");

console.log("popup script loaded");
console.log(document);
// listens to the click of the button into the popup content
document.getElementById("toggleButton").addEventListener("click", function () {
  console.log("toggleButton worked");
  chrome.runtime.sendMessage({ msg: "toggleAdblocking" });
});
