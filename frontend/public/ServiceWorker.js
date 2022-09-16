//Installing Service Worker
self.addEventListener("install", event => {});

//Fetching Service Worker
self.addEventListener("fetch", event => {});

//Activating Service Worker
self.addEventListener("activate", event => {});

//Push Notification
self.addEventListener('push', (e) => {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './Icons/144.png'
    });
});