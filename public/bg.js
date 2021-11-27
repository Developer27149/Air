// chrome.alarms.create("sucks", {
//   when: Date.now(),
// });

// chrome.alarms.onAlarm.addEventListener((alarm) => {
//   if (alarm.name === "sucks") {
//     chrome.notifications.create("NOTFICATION_ID", {
//       type: "basic",
//       iconUrl: "./icons/64.png",
//       title: "notification title",
//       message: "notification message",
//       priority: 2,
//     });
//   }
// });

// console.log("bg code");

// function installReason(detail) {
//   console.log(detail);
//   if (detail?.reason === "update") {
//     notification();
//   }
// }

function notification() {
  console.log("init a notification!");
  chrome.notifications.create({
    title: "sucks少时诵诗书所所所",
    message: "balabala...",
    iconUrl: "icons/32.png",
    type: "basic",
    eventTime: Date.now(),
  });
}

// chrome.runtime.onInstalled.addListener((details) => {
//   installReason(details);
// });

console.log("in bg script!!");

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "air") {
    chrome.notifications.create(
      "my notice id",
      {
        title: "title",
        message: "is a msg",
        type: "basic",
        iconUrl: "icons/32.png",
      },
      (id) => {
        console.log(id);
        console.log("notification callback function");
      }
    );
  }
});

function createAlarm() {
  chrome.alarms.create("air", {
    when: Date.now(),
  });
}

// createAlarm();
// setInterval(notification, 1000);
