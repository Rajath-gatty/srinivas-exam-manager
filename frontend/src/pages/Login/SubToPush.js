import axios from 'axios';

const SubToPush = async () => {
    const pubKey = 'BATlyMlNxAlgKzAARIy1TKyrgNIGc7oTpBcHMXCTJdL3HkSDhM0j_LaH40cKKXKfiNAPOxnzGP8bE9c52lGFB-g';
    
    //urlbase64ToUint8Array
    const urlBase64ToUint8Array = (base64String) => {
        console.log('subscribing');
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    console.log('check sw ready');
    const reg = await navigator.serviceWorker.ready;
    console.log('sw ready, to subscribe');
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        console.log(permission);
        const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(pubKey)
        })
        console.log('subscribed');

        //Save browser Push Notification Endpoint to DB
        // try{
        //     await axios.post('/pushsubscribe', sub);
        // } catch(err) {
        //     console.log(err);
        // }
    } else {
        console.log('permission denied');
    } 
}

export default SubToPush