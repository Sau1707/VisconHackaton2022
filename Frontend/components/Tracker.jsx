import React, { Component } from 'react';  
import { Bluetooth } from 'react-bootstrap-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class Tracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            percentage: 60
        };
    }

    render() {
        var myStyle = {
            marginLeft: 200,
            width: 200,
            height: 200
        }
        return (
            <div style = {myStyle}>
                <CircularProgressbar value={this.state.percentage} text={`${this.state.percentage}%` } strokeWidth={18} styles={buildStyles({
          pathColor: "fuchsia", textColor: "fuchsia"
        })}/>
            </div>
        )
    }

}

export default Tracker;