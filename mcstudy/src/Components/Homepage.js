import React, { Component } from 'react'
import '../ComponentStyles/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import course1 from '../Images/course1.png';
import course2 from '../Images/course2.png';
import course3 from '../Images/course3.png';
import course4 from '../Images/course4.png';
import course5 from '../Images/course5.png';
import course6 from '../Images/course6.png';
import course7 from '../Images/course7.png';
import course8 from '../Images/course8.png';
import course9 from '../Images/course9.png';
import course10 from '../Images/course10.png';
export default class Homepage extends Component {
    constructor(props){
        super(props);
        this.state= {
            courses: ['course1','course2','course3','course4','course5','course6','course7','course8','course9','course10']
        }
    }
    render() {
        let coursesimage = this.state.courses.map((course, index) => {
            return <img key={index} src={course} id="HomepageFavoriteImages" alt="First slide"/>
        });
        return (
            <div>
                <h1 id="HomepageTitle">McStudy</h1>
                <Button variant="primary" className="shadow p-3 mb-5 rounded" id="HomepageButtons" style={{ marginLeft: "50%" }}>Manage Homepage</Button>
                <Button variant="primary" className="shadow p-3 mb-5 rounded" id="HomepageButtons" style={{ marginLeft: "0.1%" }}>Rate a Course</Button>
                <div className="shadow-lg p-3 mb-5 bg-white rounded" style={{marginLeft: "10%", marginRight: "10%" }}>
                    <h1 id="HomepageTitle2" style={{fontSize: "200%", color: "blue", textDecoration: "underline" }}>Favorite</h1>
                    <div className="p-3" style={{marginLeft: "12%", marginRight: "12%", overflowX: "scroll", whiteSpace: "nowrap"}}>
                        {coursesimage}
                    </div>

                </div>
            </div>
        )
    }
}
