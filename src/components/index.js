import React from 'react';
import ReactDOM from 'react-dom';

import {Grid, Row, Col, ButtonToolbar, Button, Modal, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import {Logo} from './Logo/'
import {GoodsTable} from './Table'
import {List} from './Category'
import {Modale} from './Modal'



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
        <Button
          bsStyle="primary"
          onClick={this.open}
        >
          Launch demo modal
        </Button>
        <Modale close={this.close} showModal={this.state.showModal}>
          <div>Content</div>
        </Modale>
      </div>
    );
  }
});


export class Layout extends React.Component {

render() {
    return <div >
            <Grid>
              <div className="header">
                <Row>
                    <Col xs={12} md={3} className="header__logo">
                        <Logo></Logo>
                    </Col>
                    <Col xs={12} md={9} className="header__menu">
                        <ButtonToolbar>
                        <Button href="#">Link</Button>
                        <Button>Button</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
              </div>
              <div className="main">
                <Row>
                    <Col xs={12} md={3} className="aside">
                        <List />
                        <Example/>
                    </Col>
                    <Col xs={12} md={9} className="content">
                        <GoodsTable />
                    </Col>
                </Row>
              </div>
            </Grid>
        </div>
    
}
}