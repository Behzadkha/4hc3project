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
            messages: [{ id: 0, message: ["Hello", "Hi", "Wondering If you can help me with A1", "Sure, which quesion?"] }, { id: 2, message: ["Hello"] }],
            input: [{}] //id:0, message:[], to save the text written but not sent yet
        }
    }

    //id of the selected assistant
    handleAssistantClick(id) {
        this.setState({
            selectedAssistant: id
        });
    }
    //handle send message
    handleSendMessage(id,e){
        e.preventDefault();
        let messageIndex = this.state.messages.findIndex(({id}) => id === this.state.selectedAssistant);
        let inputIndex = this.state.input.findIndex(({id}) => id === this.state.selectedAssistant);
        let messages = this.state.messages;
        //a message has already been sent
        if(messageIndex >= 0){
            messages[messageIndex].message.push(this.state.input[inputIndex].text);
        }else{
            messages.push({id : id, message: [this.state.input[inputIndex].text]});   
        }
        //also empty the input field
        let tempStateInput = this.state.input;
        tempStateInput[inputIndex].text = "";
        this.setState({
            input : tempStateInput,
            messages : messages
        });
    }

    //handle user is writing something
    onchangeMessage(inputIndex, e){
        let input = e.target.value;
        let tempStateInput = this.state.input;
        //there is already message with that person in the message box
        if (inputIndex >= 0){
            tempStateInput[inputIndex].text = input;
        }else{
            tempStateInput.push({id:this.state.selectedAssistant, text : input});
        }
        this.setState({
            input : tempStateInput
        });

    }

    render() {
        let messageIndex = this.state.messages.findIndex(({id}) => id === this.state.selectedAssistant);
        let inputIndex = this.state.input.findIndex(({id}) => id === this.state.selectedAssistant);
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
                                                        <h4 style={{ marginTop: "13%", marginLeft: "40%" }}>{person.name}</h4>
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
                        <Row style={{margin: "auto", textAlign : "center"}}>
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
                                                                            <img className="personImage" style={{ width: "6vh" }} alt="avatar" src={this.state.assistants[this.state.selectedAssistant].image}></img>
                                                                            <h5 style={{ float: "left", margin: "1% 0 0 1%" }}>{message}</h5>
                                                                        </div>
                                                                    )
                                                                ) ||
                                                                <div>
                                                                    <img className="personImage" style={{ float: "right", width: "6vh", display: "inline-block" }} alt="avatar" src={Lily}></img>
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
                                    <Col style={{ position: "absolute", bottom: 0 , margin: "auto", textAlign : "center"}}>
                                        <Form>
                                            <Form.Control className="messageBox" type="text" placeholder="Message" value={inputIndex >= 0 ? this.state.input[inputIndex].text : ''} onChange={this.onchangeMessage.bind(this, inputIndex)}/>
                                            <button type="submit" style={{border : "1px solid gray" ,borderRadius : "10px", padding : "5px"}} onClick={this.handleSendMessage.bind(this,this.state.selectedAssistant)}>
                                                <img src={sendLogo} alt="send"></img>
                                            </button>
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
