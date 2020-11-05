import React, { Component } from 'react';
import { Col, Row, Container, Button, Form, Modal, Dropdown, DropdownButton } from 'react-bootstrap';
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
import { Rating } from '@material-ui/lab';

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assistants: [
                { id: 0, name: 'Jack', image: Jack, rating: 4 },
                { id: 1, name: 'Andy', image: Andy, rating: 1 },
                { id: 2, name: 'Lily', image: Lily, rating: 2 },
                { id: 3, name: 'Bob', image: Bob, rating: 5 },
                { id: 4, name: 'Sarah', image: Sarah, rating: 3 },
                { id: 5, name: 'John', image: John, rating: 1 },
                { id: 6, name: 'Mady', image: Mady, rating: 5 },
            ],
            id: 7,
            selectedAssistant: 0, //assistants id
            messages: [{ id: 0, message: ["Hello", "Hi", "Wondering If you can help me with A1", "Sure, which quesion?"] }, { id: 2, message: ["Hello"] }],
            input: [], //{id:0, message:[]}, to save the text written but not sent yet
            timer: 0, // for demo, Andy sends a message after 5 seconds of recieveing a message
            interval: 0, // for demo ^
            searchInput: "",// the input from the assistant's search field
            showRatingModal: false,
            ratingPerson: 0, //the id of the person being rated
            newRating: 0
        }

    }

    //id of the selected assistant
    handleAssistantClick(id) {
        this.setState({
            selectedAssistant: id
        });
    }
    //handle send message
    handleSendMessage(id, e) {
        e.preventDefault();
        let messageIndex = this.state.messages.findIndex(({ id }) => id === this.state.selectedAssistant);
        let inputIndex = this.state.input.findIndex(({ id }) => id === this.state.selectedAssistant);
        let messages = this.state.messages;
        
        //a message has already been sent
        if (messageIndex >= 0) {
            messages[messageIndex].message.push(this.state.input[inputIndex].text);
        } else {
            messages.push({ id: id, message: [this.state.input[inputIndex].text] });
        }
        //also empty the input field
        let tempStateInput = this.state.input;
        tempStateInput[inputIndex].text = "";
        this.setState({
            input: tempStateInput,
            messages: messages
        });

        //demo only
        //if the id == 1 which is andy, start the timer, for a fake reply
        if (id === 1) {
            this.startTimer();
        }

    }

    //handle user is writing something
    onchangeMessage(inputIndex, e) {
        let input = e.target.value;
        let tempStateInput = this.state.input;
        //there is already message with that person in the message box
        if (inputIndex >= 0) {
            tempStateInput[inputIndex].text = input;
        } else {
            tempStateInput.push({ id: this.state.selectedAssistant, text: input });
        }
        this.setState({
            input: tempStateInput
        });

    }


    //search for assistants
    //set the seachInput
    handleSearch(e) {
        let input = e.target.value;
        this.setState({
            searchInput: input,
        });
    }

    //start timer(for demo only)
    startTimer() {
        let interval = setInterval(() => {
            this.setState({ timer: this.state.timer + 1 })
        }, 1000);
        this.setState({
            interval: interval
        });
    }

    //save rating and close modal
    saveRating() {
        let assistants = this.state.assistants;
        let assistantIndex = this.state.assistants.findIndex(({ id }) => id === this.state.ratingPerson);
        assistants[assistantIndex].rating = this.state.newRating;
        this.setState({
            showRatingModal: false,
            assistants: assistants,
            newRating: 0
        })
    }
    //sort assistants by raing
    sortByRating(){
        let assistants = this.state.assistants;
        //sort decrementally 
        assistants.sort((a,b) => b.rating - a.rating);
        this.setState({
            assistants : assistants
        });
    }

    render() {
        let assistantIndex= this.state.assistants.findIndex(({ id }) => id === this.state.selectedAssistant);
        let messageIndex = this.state.messages.findIndex(({ id }) => id === this.state.selectedAssistant);
        let inputIndex = this.state.input.findIndex(({ id }) => id === this.state.selectedAssistant);
        let ratingPersonIndex = this.state.assistants.findIndex(({ id }) => id === this.state.ratingPerson);
        if(this.state.timer === 5)
            clearInterval(this.state.interval);
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
                                        <Button 
                                            style={{ fontSize: "14px" }}
                                            className="btn-sm"
                                            onClick={this.sortByRating.bind(this)}
                                            >Sort by Rating</Button>
                                    </Col>
                                    <Col lg="2">
                                        <Button style={{ fontSize: "14px" }} onClick={() => this.setState({ showRatingModal: true })}>Rate</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    {/*left column*/}
                                    <Col>
                                        <div className="input-group mb-3" style={{ marginTop: "10px" }}>
                                            <div className="input-group-prepend">
                                                <img src={searchLogo} alt="searchLOGO"></img>
                                            </div>
                                            <input type="text" className="form-control searchDiv" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
                                                value={this.state.searchInput} onChange={this.handleSearch.bind(this)}
                                            />
                                        </div>
                                        <div>
                                            {this.state.assistants.map(person => {
                                                if (this.state.searchInput !== "" && (person.name.toUpperCase()).startsWith(this.state.searchInput.toUpperCase())) {
                                                    return (
                                                        <Row className="assistant" noGutters={true} key={person.id} onClick={this.handleAssistantClick.bind(this, person.id)}>
                                                            <Col>
                                                                <img src={person.image} className="personImage" alt="person" />
                                                                <h4 style={{ marginTop: "13%", marginLeft: "40%" }}>{person.name}</h4>
                                                                <Rating name="size-small" className="rating" value={person.rating || 0} size="small" readOnly />

                                                            </Col>
                                                        </Row>
                                                    )
                                                }
                                                else if (this.state.searchInput === "")
                                                    return (
                                                        <Row className="assistant" noGutters={true} key={person.id} onClick={this.handleAssistantClick.bind(this, person.id)}>
                                                            <Col>
                                                                <img src={person.image} className="personImage" alt="person" />
                                                                <h4 style={{ marginTop: "13%", marginLeft: "40%" }}>{person.name}</h4>
                                                                <Rating name="size-small" className="rating" value={person.rating || 0} size="small" readOnly />
                                                            </Col>
                                                        </Row>
                                                    )
                                                else
                                                    return null
                                            }
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    {/*right column*/}
                    <Col>
                        <Row style={{ margin: "auto", textAlign: "center" }}>
                            <Col>
                                <h4>
                                    Messages
                                </h4>
                            </Col>
                        </Row>
                        <Row className="messagesColumn">
                            <Col >
                                {/*Assistant being shown on the right, info */}
                                <Row>
                                    <Col>
                                        {this.state.assistants.length >= 1 &&
                                            <img className="personImage" style={{ width: "10%" }} src={this.state.assistants[assistantIndex].image} alt="assistant" />
                                        }
                                    </Col>
                                </Row>
                                {/*messages */}
                                <Row>
                                    <Col>
                                        {(messageIndex >= 0 && this.state.assistants[assistantIndex] !== undefined) &&
                                            this.state.messages[messageIndex].message.map((message, index) =>
                                                <Row key={index}>
                                                    <Col style={{ margin: "0 10% 0 10%" }}>
                                                        {(index < 4 && this.state.selectedAssistant === 0) ?
                                                            (
                                                                (
                                                                    (index % 2 !== 0) ? (
                                                                        <div>
                                                                            <img className="personImage" style={{ width: "6vh" }} alt="avatar" src={this.state.assistants[assistantIndex].image}></img>
                                                                            <h5 style={{ float: "left", margin: "1% 0 0 1%" }}>{message}</h5>
                                                                        </div>
                                                                    ): null
                                                                ) ||
                                                                <div>
                                                                    <img className="personImage" style={{ float: "right", width: "6vh", display: "inline-block" }} alt="avatar" src={Lily}></img>
                                                                    <h5 style={{ float: "right", margin: "1% 1% 0 0", display: "inline-block" }}>{message}</h5>
                                                                </div>
                                                            ) :
                                                            (
                                                                <div>
                                                                    <img className="personImage" style={{ float: "right", width: "5%", paddingTop: "10px" }} alt="avatar" src={Lily}></img>
                                                                    <h5 style={{ float: "right", margin: "2% 1% 0 0", display: "inline-block" }}>{message}</h5>
                                                                </div>
                                                            )
                                                        }
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                        {/*Hard coded message after 5 seconds from Andy*/}
                                        {(this.state.assistants[assistantIndex].name === "Andy" && this.state.timer === 5) &&
                                            <Row>
                                                
                                                <Col style={{ margin: "0 10% 0 10%" }}>
                                                    <div>
                                                        <img className="personImage" style={{ width: "6vh" }} alt="avatar" src={this.state.assistants[assistantIndex].image}></img>
                                                        <h5 style={{ float: "left", margin: "1% 0 0 1%" }}>{"Np, give me an hour"}</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        }

                                    </Col>
                                </Row>
                                {/*send message utility */}
                                <Row >
                                    <Col style={{ position: "absolute", bottom: 0, margin: "auto", textAlign: "center" }}>
                                        <Form>
                                            <Form.Control className="messageBox" type="text" placeholder="Message" value={inputIndex >= 0 ? this.state.input[inputIndex].text : ""} onChange={this.onchangeMessage.bind(this, inputIndex)} />
                                            <button type="submit" style={{ border: "1px solid gray", borderRadius: "10px", padding: "5px" }} onClick={this.handleSendMessage.bind(this, this.state.selectedAssistant)}>
                                                <img src={sendLogo} alt="send"></img>
                                            </button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Col>
                </Row>

                {/*modal */}
                <Modal
                    show={this.state.showRatingModal}
                    onHide={() => this.setState({ showRatingModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Rating
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row noGutters={true}>

                            <h6 style={{ marginTop: "1%" }}>
                                Select an assistant:
                            </h6>

                            <DropdownButton id="dropdown-basic-button" style={{ paddingLeft: "2%" }} title={this.state.assistants[ratingPersonIndex].name}>
                                {this.state.assistants.map((person) => {
                                    if (person.name !== this.state.assistants[ratingPersonIndex].name) {
                                        return (
                                            <Dropdown.Item key={person.id}
                                                onClick={() => {
                                                    this.setState({ ratingPerson: person.id });
                                                }}
                                            >{person.name}</Dropdown.Item>
                                        )
                                    }
                                    return null

                                }

                                )}
                            </DropdownButton>

                        </Row>
                        <Row style={{ paddingLeft: "2%" }}>
                            <img className="personImage" style={{ width: "20%", margin: "4% 0 0 0" }} src={this.state.assistants[ratingPersonIndex].image} alt="personImage" />
                            <div style={{ padding: "10% 0 0 5%" }}>

                                <Rating name="size-medium"
                                    value={
                                        (this.state.newRating === 0) 
                                            ?
                                            this.state.assistants[ratingPersonIndex].rating
                                            :
                                            this.state.newRating
                                    }
                                    size="large"
                                    onChange={(e, newValue) => this.setState({ newRating: newValue })}
                                />
                            </div>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveRating.bind(this)}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </Container>


        )
    }
}
