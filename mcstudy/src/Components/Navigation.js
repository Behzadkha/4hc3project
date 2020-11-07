import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap';
export default class Navigation extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light">
                    <Navbar.Brand href="/"><h2 id="HomepageTitle">McStudy</h2></Navbar.Brand>
                </Navbar>
                
            </div>
        )
    }
}
