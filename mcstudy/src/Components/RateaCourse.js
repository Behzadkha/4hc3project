import React, { Component } from 'react'
import { Container, Row, Col, Dropdown, Button, InputGroup, FormControl } from 'react-bootstrap'
import '../ComponentStyles/RateaCourse.css';
export default class RateaCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: ["CS-Human Computer Interfaces", "English-Shakespeare", "EARTHSC-Earth and the Environment", "CS-Software Requirements", "CS-Capstone Project", "Physics-Introductory Physics ", "Math-Calculus", "CS-Databases", "CS-Data Structures and Algorithms", "CS-Discrete Mathematics", "ART-Digital Practices", "MMEDIA-Multimedia and Digital Society", "ECON-Introduction to Microeconomics"],
            ReviewCourse: "Select a course", RateCourse: { RateCourse: "Select a course", YourProfessor: "", Date: "When did you take this course?", finalGrade: "Your final grade (out of 12)", Comment: "" }, year: ["2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010"], grade: [12,11,10,9,8,7,6,5,'Fail'],
            submitted: false, showSubmittedtext: false, submittedMessage: "",
            submittedReviews: [
                { RateCourse: "CS-Software Requirements", YourProfessor: "Richard Paige", Date: "2020", finalGrade: "11", Comment: "Best prof, he cares about his students" },
                { RateCourse: "CS-Capstone Project", YourProfessor: "Jacques Carette", Date: "2020", finalGrade: "12", Comment: "I learned a lot in this course." },
                { RateCourse: "CS-Human Computer Interfaces", YourProfessor: "kevin browne", Date: "2020", finalGrade: "10", Comment: "I learned a lot in this course." },
                { RateCourse: "CS-Capstone Project", YourProfessor: "Jacques Carette", Date: "2019", finalGrade: "11", Comment: "I really liked this course. I learned a lot about software development life cycle " }
            ]
        }
    }
    render() {
        let original = { RateCourse: "Select a course", YourProfessor: "", Date: "When did you take this course?", finalGrade: "Your final grade (out of 12)", Comment: "" }
        return (
            <div style={{ textAlign: "center" }}>
                <Container style={{ marginTop: "5%" }}>
                    <Row >
                        <Col>
                            <h3 className="RateaCourseTitle" >Reviews</h3>
                            <Dropdown style={{ marginTop: "10%" }}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="btn-block" >
                                    {this.state.ReviewCourse}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="btn-block">
                                    {this.state.courses.map((course, index) => { return <Dropdown.Item key={index} onClick={() => { this.setState({ ReviewCourse: course }) }}>{course}</Dropdown.Item> })}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant="primary" className="mt-3" onClick={() => {
                                this.props.history.push({
                                    pathname: '/coursereviews',
                                    state: { ReviewCourse: this.state.ReviewCourse, submittedReviews: this.state.submittedReviews }
                                })
                            }}>Search</Button>
                        </Col>


                        <Col className="RateaCourseTitle">OR</Col>
                        <Col>
                            <h3 className="RateaCourseTitle">Rate a Course</h3>
                            {/* Selecting a course */}
                            <Dropdown style={{ marginTop: "10%" }}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="btn-block" >
                                    {this.state.RateCourse.RateCourse}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="btn-block">
                                    {this.state.courses.map((course, index) => { return <Dropdown.Item key={index} onClick={() => { var temp = this.state.RateCourse; temp.RateCourse = course; this.setState({ RateCourse: temp, showSubmittedtext: false, submittedMessage: '' }) }}>{course}</Dropdown.Item> })}
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* Professor name */}
                            <InputGroup className="mt-3">
                                <FormControl
                                    placeholder="Your professor's full name"
                                    value={this.state.RateCourse.YourProfessor}
                                    aria-label="Professor full nameeee"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => { var temp = this.state.RateCourse; temp.YourProfessor = e.target.value; this.setState({ RateCourse: temp }) }}
                                />
                            </InputGroup>
                            {/* date */}
                            <Dropdown className="mt-3">
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="btn-block" >
                                    {this.state.RateCourse.Date}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="btn-block">
                                    {this.state.year.map((year, index) => { return <Dropdown.Item key={index} onClick={() => { var temp = this.state.RateCourse; temp.Date = year; this.setState({ RateCourse: temp }) }}>{year}</Dropdown.Item> })}
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* Grade */}

                            <Dropdown className="mt-3">
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="btn-block" >
                                    {this.state.RateCourse.finalGrade}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="btn-block">
                                    {this.state.grade.map((mygrade, index) => { return <Dropdown.Item key={index} onClick={() => { var temp = this.state.RateCourse; temp.finalGrade = mygrade; this.setState({ RateCourse: temp }) }}>{mygrade}</Dropdown.Item> })}
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* Comment */}
                            <InputGroup className="mt-3">
                                <FormControl as="textarea" placeholder="Your comment..." value={this.state.RateCourse.Comment} aria-label="With textarea" onChange={(e) => { var temp = this.state.RateCourse; temp.Comment = e.target.value; this.setState({ RateCourse: temp }) }} />
                            </InputGroup>
                            {/* Submit button */}
                            <Button variant="primary" className="mt-3" onClick={() => {
                                if(this.state.RateCourse.RateCourse !== "Select a course" && this.state.RateCourse.YourProfessor !== "Your professor's full name"){
                                    this.setState({ submittedReviews: [...this.state.submittedReviews, this.state.RateCourse], RateCourse: original, showSubmittedtext: true })
                                }
                                else{
                                    this.setState({submittedMessage: "Make sure you have selected a course."})
                                }
                                
                            }}>Submit</Button>
                            {this.state.showSubmittedtext ? <h3>Thank you for submitting your course evaluation</h3> : <h3>{this.state.submittedMessage}</h3>}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
