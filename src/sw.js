const publicVapidKey = 'BJs-1rAgTehzrIsAOwkqNHiwhTNB2Iudrw5XRzAen9wFcpcvICqVzpxwA7vwdyT1grGNOaKW9kdconwzjnHWWIg';

if('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}

async function send() {
  console.log("Registering service worker");
  const register = await navigator.serviceWorker.register('/Appnew.js', {
    scope: '/'
  });
  console.log('Service worker registered')
}