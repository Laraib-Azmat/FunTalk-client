import React from 'react'
import Modal from "react-modal"

const Model = (props) => {



  return (
    <Modal 
    isOpen={props.isOpen}
    onRequestClose={props.onClose}
     className="fixed inset-0 flex items-center justify-center p-4"
     overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
        {props.children}
    </Modal>
  )
}

export default Model