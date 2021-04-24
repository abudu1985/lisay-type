import React from "react";
import "./modal.css";


const Modal = ({ start, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button type="button" className="button" onClick={start}>
                    Start
                </button>
            </section>
        </div>
    );
};

export default Modal;