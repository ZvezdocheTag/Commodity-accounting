import React from 'react';
import ReactDOM from 'react-dom';

import {Grid, Row, Col, ButtonToolbar, Button, Modal, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import {Logo} from './Logo/'
import {GoodsTable} from './Table'
import {List} from './Category'

const Example = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {


    return (
      <div>
        <p>Click to get the full Modal experience!</p>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Launch demo modal
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            <h4>Overflowing text to show scroll behavior</h4>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                 vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});


export class Layout extends React.Component {

render() {
    return <div >
            <Grid>
                <Row>
                    <Col xs={12} md={4}>
                        <Logo></Logo>
                    </Col>
                    <Col xs={12} md={8}>
                        <ButtonToolbar>
                        <Button href="#">Link</Button>
                        <Button>Button</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <List />
                        <Example/>
                    </Col>
                    <Col xs={12} md={8}>
                        <GoodsTable />
                    </Col>
                </Row>
            </Grid>
        </div>
    
}
}