import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import '../ComponentStyles/Messages.css';
import searchLogo from '../search.svg';
import Jack from '../Images/1.jpg';
import Andy from '../Images/2.jpg';
import Lily from '../Images/3.jpg';
import Bob from '../Images/4.jpg';
import Sarah from '../Images/5.jpg';
import John from '../Images/6.jpg';
import Mady from '../Images/7.jpg';

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assistants: [
                { id: 1, name: 'Jack', image: Jack },
                { id: 2, name: 'Andy', image: Andy },
                { id: 3, name: 'Lily', image: Lily },
                { id: 4, name: 'Bob', image: Bob },
                { id: 5, name: 'Sarah', image: Sarah },
                { id: 6, name: 'John', image: John },
                { id: 7, name: 'Mady', image: Mady },
            ],
            selectedAssistant : 0 //assistants id
        }
    }
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
                                <Row>
                                    <Col>
                                        <h6>Assistants</h6>
                                    </Col>
                                    <Col lg="4">
                                        <Button style={{ fontSize: "14px" }}>Sort by Rate</Button>
                                    </Col>
                                    <Col lg="2">
                                        <Button style={{ fontSize: "14px" }}>Rate</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    {/*left column*/}
                                    <Col>
                                        <div className="input-group mb-3" style={{ marginTop: "10px" }}>
                                            <div className="input-group-prepend">
                                                <img src={searchLogo} alt="searchLOGO"></img>
                                            </div>
                                            <input type="text" className="form-control searchDiv" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                        <div>
                                            {this.state.assistants.map(person =>
                                                <Row noGutters={true} key={person.id} style={{ borderBottom: "1px solid lightGray", paddingTop: "2%", paddingBottom: "2%" }}>
                                                    <Col>
                                                        <img src={person.image} className="personImage" alt="person" />
                                                        <h4 style={{ marginTop: "13%", marginRight: "30%" }}>{person.name}</h4>
                                                    </Col>
                                                </Row>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    {/*right column*/}
                    <Col>
                        <Row>
                            <Col>
                                <h4>
                                    Messages
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="messagesBox">
                                <img className="personImage" style={{width : "10%"}} src={this.state.assistants[this.state.selectedAssistant].image} alt="assistant"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                sd
                            </Col>
                        </Row>


                    </Col>
                </Row>
            </Container>
        )
    }
}
