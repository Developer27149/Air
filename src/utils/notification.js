export async function notification() {
  console.log("init a notification!");
  // chrome.notifications.create({
  //   title: "sucks",
  //   message: "balabala...",
  //   iconUrl: "icons/32.png",
  //   type: "basic",
  // });
  try {
    const noticePromise = await Notification.requestPermission();
    console.log(noticePromise);
    if (noticePromise === "granted") {
      const nt = new Notification("test", {
        body: "balabala...",
        icon: "./icons/32.png",
      });
      console.log(nt);
    }
  } catch (error) {
    console.log(error);
  }
}
