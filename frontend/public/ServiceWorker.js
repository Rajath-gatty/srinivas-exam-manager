//Installing Service Worker
self.addEventListener("install", event => {});

//Fetching Service Worker
self.addEventListener("fetch", event => {});

//Activating Service Worker
self.addEventListener("activate", event => {});

//Push Notification
self.addEventListener('push', (e) => {
    const data = e.data.json();
    console.log(data)
    self.registration.showNotification("Srinivas Exam Manager", {
      body: data,
      icon: './Icons/144.png'
    });
});

// self.addEventListener("pushsubscriptionchange", (event) => {
//   let server = "https://localhost:8080";
//   // let server = "https://localhost:8080";
//   const pubKey = 'BATlyMlNxAlgKzAARIy1TKyrgNIGc7oTpBcHMXCTJdL3HkSDhM0j_LaH40cKKXKfiNAPOxnzGP8bE9c52lGFB-g';

//   const subscription = navigator.serviceWorker.ready.pushManager
//     .subscribe(event.oldSubscription.options)
//     .then((subscription) =>
//       fetch(`${server}/updatesubscribe`, {
//         method: "post",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           sub: subscription,
//           auth: subscription.keys.auth,
//           p256dh: subscription.keys.p256dh,
//           oldauth: event.oldSubscription.keys.auth,
//           oldp256dh: event.oldSubscription.keys.p256dh,
//         }),
//       }),
//     );
//   event.waitUntil(subscription);
// }, false);