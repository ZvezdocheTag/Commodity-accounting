import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap'

export const Modale = (props) => {
  return (
        <Modal show={props.showModal} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {props.children}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.close}>Close</Button>
          </Modal.Footer>
        </Modal>
  )
}