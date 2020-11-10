import React, { Component } from 'react'
import '../ComponentStyles/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import circle from '../Images/circle.png';
export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allcourses: ["CS-Human Computer Interfaces", "English-Shakespeare", "EARTHSC-Earth and the Environment", "CS-Software Requirements", "CS-Capstone Project", "Physics-Introductory Physics ", "Math-Calculus", "CS-Databases", "CS-Data Structures and Algorithms", "CS-Discrete Mathematics", "ART-Digital Practices", "MMEDIA-Multimedia and Digital Society", "ECON-Introduction to Microeconomics"],
            favoriteCourses: ["CS-Software Requirements", "CS-Capstone Project"],
            generalCourses: ["CS-Software Requirements", "CS-Capstone Project", "Physics-Introductory Physics ", "Math-Calculus", "CS-Databases", "CS-Data Structures and Algorithms", "CS-Discrete Mathematics", "ART-Digital Practices", "MMEDIA-Multimedia and Digital Society", "ECON-Introduction to Microeconomics"],
            addCourseModal: false, SelectedCourseFromDropDown: "", addCoursetoFavoriteModal: false, manageHomepage: false
        }
    }
    render() {
        return (
            <div>
                <div style={{ paddingLeft: "70%" }}>
                    <Button variant="primary" className="shadow p-3 mb-5 rounded" id="HomepageButtons" onClick={() => { this.setState({ manageHomepage: true }) }}>Manage Homepage</Button>
                    <Button variant="primary" className="shadow p-3 mb-5 rounded ml-1" id="HomepageButtons" onClick={() => { this.props.history.push('/rateacourse') }}>Rate a Course</Button>
                </div>
                <div className="shadow-lg p-3 mb-5 bg-white rounded" style={{ marginLeft: "10%", marginRight: "10%" }}>
                    {/*Favorite part*/}
                    <h1 id="HomepageTitle2">My Favorites</h1>
                    <div className="shadow p-3 mb-5 rounded" style={{ marginLeft: "12%", marginRight: "12%", overflowX: "auto", whiteSpace: "nowrap" }}>
                        <div className="courses courseImages" onClick={() => { this.setState({ addCoursetoFavoriteModal: true }) }} style={{ display: "inline-block", cursor: "pointer" }}>
                            <img style={{blockSize : "120px"}} src={circle} alt="circle" />
                            <p className="coursetext" style={{ color: "blue" }}>ADD COURSE TO FAVORITES</p>
                        </div>

                        {this.state.favoriteCourses.map((course, index) => {
                            return (
                                <div key={index} className="courses courseImages" style={{ display: "inline-block", cursor : "pointer"}}
                                    onClick={() => {
                                            this.props.history.push({pathname: '/messages',state: { courseName: course }})
                                    }
                                    }
                                >
                                    <img style={{blockSize : "120px"}} src={circle} alt="circle" />
                                    <p className="coursetext">{course}</p>
                                </div>
                            )
                        })}
                        
                    </div>
                    <hr></hr>
                    {/*General part*/}
                    <h1 id="HomepageTitle2" >General</h1>
                    <div className="shadow p-3 mb-5 rounded" style={{ marginLeft: "12%", marginRight: "12%", overflowY: "scroll", maxHeight: "250px"}}>
                        <div className="courses" onClick={() => { this.setState({ addCourseModal: true }) }} style={{ display: "inline-block", cursor: "pointer" }}>
                            <img style={{blockSize : "120px"}} src={circle} alt="circle" />
                            <p className="coursetext" style={{ color: "blue" }}>ADD COURSE</p>
                        </div>
                        {this.state.generalCourses.map((course, index) => {
                            return (
                                <div key={index} className="courses courseImages" style={{ display: "inline-block" , cursor : "pointer"}}
                                onClick={() => {
                                        this.props.history.push({pathname: '/messages',state: { courseName: course }})
                                }
                                }
                                >
                                    <img style={{ blockSize: "120px" }} src={circle} alt="circle" />
                                    <p className="coursetext">{course}</p>
                                </div>
                            )
                        })}
                    </div>
                    {/*adding courses to the favorites*/}
                    {this.state.addCoursetoFavoriteModal ? (<Modal show={this.state.addCoursetoFavoriteModal} onHide={() => { this.setState({ addCoursetoFavoriteModal: false, selectedCourseFromDropDown: "" }) }}>
                        <Modal.Header>
                            <Modal.Title>Add a course to your favorites</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Label>Course List:</Form.Label>
                            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                                {this.state.generalCourses.map((course, index) =>
                                    <Dropdown.Item key={index} onClick={() => { if (!this.state.favoriteCourses.includes(course)) { this.setState({ selectedCourseFromDropDown: `${course} added to your favorites`, favoriteCourses: [course, ...this.state.favoriteCourses] }) } else { this.setState({ selectedCourseFromDropDown: `OOPS ${course} is already added to your courses` }) } }}>{course}</Dropdown.Item>
                                )}
                            </DropdownButton>
                        </Modal.Body>
                        <Form.Label style={{ paddingLeft: "20px", fontWeight: "bold" }}>{this.state.selectedCourseFromDropDown}</Form.Label>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { this.setState({ addCoursetoFavoriteModal: false, selectedCourseFromDropDown: "" }) }}>Close</Button>
                        </Modal.Footer>
                    </Modal>) : ''}

                    {/*adding courses to the bottom part*/}
                    {this.state.addCourseModal ? (<Modal show={this.state.addCourseModal} onHide={() => { this.setState({ addCourseModal: false, selectedCourseFromDropDown: "" }) }}>
                        <Modal.Header>
                            <Modal.Title>Add a course to your courses</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Label>Course List:</Form.Label>
                            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                                {this.state.allcourses.map((course, index) =>
                                    <Dropdown.Item key={index} onClick={() => { if (!this.state.generalCourses.includes(course)) { this.setState({ selectedCourseFromDropDown: `${course} added to your courses`, generalCourses: [course, ...this.state.generalCourses] }) } else { this.setState({ selectedCourseFromDropDown: `OOPS ${course} is already added to your courses` }) } }}>{course}</Dropdown.Item>
                                )}
                                <Dropdown.Item>More Courses will be added...</Dropdown.Item>
                            </DropdownButton>
                        </Modal.Body>
                        <Form.Label style={{ paddingLeft: "20px", fontWeight: "bold" }}>{this.state.selectedCourseFromDropDown}</Form.Label>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { this.setState({ addCourseModal: false, selectedCourseFromDropDown: "" }) }}>Close</Button>
                        </Modal.Footer>
                    </Modal>) : ''}
                    {/*Manage homepage*/}
                    {this.state.manageHomepage ? (<Modal show={this.state.manageHomepage} onHide={() => { this.setState({ manageHomepage: false, selectedCourseFromDropDown: "" }) }}>
                        <Modal.Header>
                            <Modal.Title>Delete courses</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Label>Delete course:</Form.Label>
                            <Form.Label>Hint: Deleting a course from general list will delete the course from favorites too.</Form.Label>
                            <Form.Label style={{ fontWeight: "bold" }}>General list:</Form.Label>
                            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                                {this.state.generalCourses.map((course, index) =>
                                    <Dropdown.Item key={index} onClick={() => {
                                        var temp = this.state.generalCourses
                                        var tempfavorite = this.state.favoriteCourses
                                        const i = temp.indexOf(course)
                                        const ifa = tempfavorite.indexOf(course)
                                        if (i > -1) { temp.splice(i, 1); if (ifa > -1) { tempfavorite.splice(i, 1) } };
                                        this.setState({ selectedCourseFromDropDown: `${course} deleted successfully`, generalCourses: temp })
                                    }
                                    }>{course}</Dropdown.Item>
                                )}
                            </DropdownButton>

                            <Form.Label style={{ fontWeight: "bold" }}>Favorites:</Form.Label>
                            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                                {this.state.favoriteCourses.map((course, index) =>
                                    <Dropdown.Item key={index} onClick={() => {
                                        var temp = this.state.favoriteCourses
                                        const i = temp.indexOf(course)
                                        if (i > -1) { temp.splice(i, 1) };
                                        this.setState({ selectedCourseFromDropDown: `${course} deleted successfully from your favorites`, favoriteCourses: temp })
                                    }
                                    }>{course}</Dropdown.Item>
                                )}
                            </DropdownButton>
                        </Modal.Body>
                        <Form.Label style={{ paddingLeft: "20px", fontWeight: "bold" }}>If you accidently delete a course you can simply add it to your list again.</Form.Label>
                        <Form.Label style={{ paddingLeft: "20px", fontWeight: "bold" }}>{this.state.selectedCourseFromDropDown}</Form.Label>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { this.setState({ manageHomepage: false, selectedCourseFromDropDown: "" }) }}>Close</Button>
                        </Modal.Footer>
                    </Modal>) : ''}



                </div>
            </div>
        )
    }
}
