import React from 'react';
import { Modal } from 'react-bootstrap'


export const Modale = (props) => {
  return (
        <Modal show={props.showModal} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {props.children}
          </Modal.Body>
        </Modal>
  )
}
