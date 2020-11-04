import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import '../ComponentStyles/Messages.css';
import searchLogo from '../search.svg';

export default class Messages extends Component {
    render() {
        return (
            <Container fluid className="messagesContainer">
                <Row className="shadow">
                    <Col lg="3">
                        <h6 id="courseName">
                            4HC3 - Human Computer Interface
                        </h6>
                        <Row className="shadow messagesAssistants">
                            <Col>
                                <h6>Assistants</h6>
                            </Col>
                            <Col lg="4">
                                <Button>Sort by Rate</Button>
                            </Col>
                            <Col lg="2">
                                <Button>Rate</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <img src={searchLogo} alt="searchLOGO"></img>
                                    </div>
                                    <input type="text" className="form-control searchDiv" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <h4>
                            Messages
                        </h4>
                    </Col>
                </Row>
            </Container>
        )
    }
}
