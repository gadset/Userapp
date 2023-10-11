importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyD_xFelva7LZ0acor-ZM7gSDkLXpJxI5lI",
    authDomain: "webpush-6fd79.firebaseapp.com",
    projectId: "webpush-6fd79",
    storageBucket: "webpush-6fd79.appspot.com",
    messagingSenderId: "147881428135",
    appId: "1:147881428135:web:4677670c981448aa874782",
    measurementId: "G-X02NZSZQNR"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});