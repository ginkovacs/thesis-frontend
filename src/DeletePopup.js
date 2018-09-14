import React from "react";
import Popup from "reactjs-popup";
import './DeletePopup.css'
//import DeleteForm from './DeleteForm'

export default () => (
    <Popup trigger={<button className="button"> &times; </button>} modal>
        {close => (
            <div className="modal">
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="content">
                    Are you sure you want to delete this customer?
                </div>
                <div className="actions">
                    <button className="button">
                        Yes
                    </button>
                    <button className="button" onClick={ () => {close()} }>
                        No
                    </button>
                </div>
            </div>
        )}
    </Popup>
);