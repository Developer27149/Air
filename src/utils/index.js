function getStorageData(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (res) => {
      if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
      resolve(res);
    });
  });
}

function setStorageData(key, value) {
  const obj = {};
  let _value = value;
  if (value === null || typeof value !== "object") {
    _value = JSON.stringify(value);
  }
  obj[key] = _value;
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(obj, (res) => {
      if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
      resolve(res);
    });
  });
}

export { getStorageData, setStorageData };
