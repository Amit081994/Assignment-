import React, { useState } from 'react'
import '../App.css'
import { Cuboid } from './Cuboid';
const Modal = () => {
    return (
        <div className='popup-modal'>
            <div className="modal-container">
                <Cuboid />
            </div>
        </div>
    )
}

export default Modal 