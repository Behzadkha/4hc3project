import React, { Component } from 'react';
import { Col, Row, Container, Button, Form } from 'react-bootstrap';
import '../ComponentStyles/Messages.css';
import searchLogo from '../search.svg';
import sendLogo from '../send.svg';
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
                { id: 0, name: 'Jack', image: Jack },
                { id: 1, name: 'Andy', image: Andy },
                { id: 2, name: 'Lily', image: Lily },
                { id: 3, name: 'Bob', image: Bob },
                { id: 4, name: 'Sarah', image: Sarah },
                { id: 5, name: 'John', image: John },
                { id: 6, name: 'Mady', image: Mady },
            ],
            id : 7,
            selectedAssistant: 0, //assistants index
            messages: [{ id: 0, message: ["Hello", "Hi", "Wondering If you can help me with A1", "Sure, which quesion?"] }, { id: 2, message: ["Hello"] }]
        }
    }

    //id of the selected assistant
    handleAssistantClick(id) {
        this.setState({
            selectedAssistant: id
        });
    }
    //handle send message
    handleSendMessage(id){
        let messageIndex = this.state.messages.findIndex(({id}) => id === this.state.selectedAssistant);
        let messages = this.state.messages;
        //a message has already been sent
        if(messageIndex >= 0){
            messages[messageIndex].message.push("hello");
        }else{
            messages.push({id : id, message: ["hello"]});   
        }
        this.setState({
            messages : messages
        });
    }

    render() {
        let messageIndex = this.state.messages.findIndex(({id}) => id === this.state.selectedAssistant);
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
                                                <Row className="assistant" noGutters={true} key={person.id} onClick={this.handleAssistantClick.bind(this, person.id)}>
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
                        <Row className="messagesColumn">
                            <Col >
                                {/*Assistant being contacted, info */}
                                <Row>
                                    <Col>
                                        <img className="personImage" style={{ width: "10%" }} src={this.state.assistants[this.state.selectedAssistant].image} alt="assistant" />
                                    </Col>
                                </Row>
                                {/*messages */}
                                <Row>
                                    <Col>
                                        {messageIndex >= 0 &&
                                            this.state.messages[messageIndex].message.map((message, index) =>
                                                <Row key={index}>
                                                    <Col style={{ margin: "0 10% 0 10%" }}>
                                                        {(index < 4 && this.state.selectedAssistant === 0) && 
                                                            (
                                                                (
                                                                    (index % 2 !== 0) && (
                                                                        <div>
                                                                            <img className="personImage" style={{ width: "5%" }} alt="avatar" src={this.state.assistants[this.state.selectedAssistant].image}></img>
                                                                            <h5 style={{ float: "left", margin: "1% 0 0 1%" }}>{message}</h5>
                                                                        </div>
                                                                    )
                                                                ) ||
                                                                <div>
                                                                    <img className="personImage" style={{ float: "right", width: "5%" }} alt="avatar" src={Lily}></img>
                                                                    <h5 style={{ float: "right", margin: "1% 1% 0 0", display: "inline-block" }}>{message}</h5>
                                                                </div>
                                                            )||
                                                            (
                                                                <div>
                                                                    <img className="personImage" style={{ float: "right", width: "5%", paddingTop : "10px"}} alt="avatar" src={Lily}></img>
                                                                    <h5 style={{ float: "right", margin: "2% 1% 0 0", display: "inline-block" }}>{message}</h5>
                                                                </div>
                                                            )
                                                        }
                                                    </Col>
                                                </Row>
                                            )}
                                    </Col>
                                </Row>
                                {/*send message utility */}
                                <Row >
                                    <Col style={{ position: "absolute", bottom: 0 }}>
                                        <Form>
                                            <Form.Control className="messageBox" type="text" placeholder="Message" />
                                            <span style={{ border: "1px solid gray", borderRadius: "10px", padding: "0.4%" }} onClick={this.handleSendMessage.bind(this,this.state.selectedAssistant)}>
                                                <img src={sendLogo} alt="send"></img>
                                            </span>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        )
    }
}
