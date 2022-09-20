import {toast} from 'react-toastify';
import { MdDevices } from "react-icons/md";

const Pwa = () => {
    let deferredPrompt;

    //Install PWA triggered by Toast
    const InstallPwa = async () =>{
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(outcome)
            deferredPrompt = null;
        } else {
            alert("Prompt Failed");
        }
    }

    const Msg = ({ closeToast, toastProps }) => (
        <div className="PwaContainer flex">
          Install PWA App
          <button className='PwaBtn flex' onClick={InstallPwa}>
            <MdDevices color='inherit' size={25}/>
            <span>Install</span>
          </button>
        </div>
    );

    //Before Install Prompt: Show Toast
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        toast(<Msg /> , {
            position: "top-right",
            autoClose: false,
        })
    });

    //Show Toast after Install
    window.addEventListener("appinstalled", () => {
        deferredPrompt = null;
        console.log("PWA was installed");
        toast.success("PWA installed 👍", {
            position: "top-right",
            autoClose: 8000,
        });
    });
}

export default Pwa