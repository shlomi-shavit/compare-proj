import React from 'react';
import classes from './Popup.module.scss';
//import CloseButton from '../CloseButton/CloseButton';

const popup = (props) => {

    let showPopup = props.show ? 'show-popup' : 'hide-popup';

    return (
        <div className={showPopup}>
            <div className={classes.popup_overlay} onClick={props.formFilled}>

            <div className={classes.Popup}>
                <div onClick={props.formFilled}>x</div>
                {props.children}
            </div>

            </div>
        </div>
    )

}

export default popup;