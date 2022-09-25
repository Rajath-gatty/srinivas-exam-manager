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

self.addEventListener('pushsubscriptionchange', function(event) {
  let serverUrl = "https://exam-manager-backend.herokuapp.com";
  // let serverUrl = "http://localhost:8080";

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user.email;
  const role = user.role;

  event.waitUntil(
    fetch(`${serverUrl}/pushsubscriptionchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        old_endpoint: event.oldSubscription ? event.oldSubscription.endpoint : null,
        new_endpoint: event.newSubscription ? event.newSubscription.endpoint : null,
        new_p256dh: event.newSubscription ? event.newSubscription.toJSON().keys.p256dh : null,
        new_auth: event.newSubscription ? event.newSubscription.toJSON().keys.auth : null,
        email,
        role
      })
    })
  );
});