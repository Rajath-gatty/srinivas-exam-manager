import ReactDOM from "react-dom";
import "./Modal.css";

const Backdrop = (props) => {
    return <div className="modal-backdrop" onClick={props.onClose}></div>
}

const ModalContent = (props) => {
    return <div className="modal-content-wrapper" style={{width: props.width?props.width:700}}>
        {props.children}
    </div>
}

const Modal = (props) => {
    return(
        <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,document.getElementById('modal'))}
        {ReactDOM.createPortal(<ModalContent width={props.width}>{props.children}</ModalContent>,document.getElementById('modal'))}
        </>
    )
}

export default Modal;