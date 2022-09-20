import axios from 'axios';

const SubToPush = async (data) => {
    const pubKey = 'BATlyMlNxAlgKzAARIy1TKyrgNIGc7oTpBcHMXCTJdL3HkSDhM0j_LaH40cKKXKfiNAPOxnzGP8bE9c52lGFB-g';
    
    //urlbase64ToUint8Array converter
    const urlBase64ToUint8Array = (base64String) => {
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

    const reg = await navigator.serviceWorker.ready;
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(pubKey)
        })
        
        //Save browser Push Notification Endpoint to DB
        try{
            const res = await axios.post('/pushsubscribe', {sub, data}); 
            console.log(res.data);
        } catch(err) {
            console.log(err);
        }
    } else {
        console.log('permission denied');
    } 
}

export default SubToPush