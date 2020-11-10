import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
export default class CourseReviews extends Component {
    render() {
        var noReview = false;
        return (
            <div>
                <h1 style={{ marginBottom: "2%", fontSize: "200%", marginTop: "2%", marginLeft: "2%"}}>Reviews for <span style={{color: "#0020C2", textDecoration: "underline"}}>{this.props.location.state.ReviewCourse}</span></h1>
                <div style={{marginLeft: "10%", marginRight: "10%"}}>
                    {this.props.location.state.submittedReviews.map((review, index) => {
                        if (review.RateCourse === this.props.location.state.ReviewCourse && index > -1) {
                            return (
                                <Table key={index} className="shadow p-1 mb-1 bg-white rounded" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "10%" }}>Professor</th>
                                            <th style={{ width: "5%" }}>Date</th>
                                            <th style={{ width: "10%" }}>My final grade</th>
                                            <th style={{ width: "50%" }}>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{review.YourProfessor}</td>
                                            <td>{review.Date}</td>
                                            <td>{review.finalGrade}</td>
                                            <td>{review.Comment}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            )
                        }
                        else {
                            noReview = true;
                            return ''
                        }
                    })}
                </div>
                {noReview ? <h5 style={{ textAlign: "center" }}>There are no more reviews at the moment</h5> : ''}
            </div>
        )
    }
}
