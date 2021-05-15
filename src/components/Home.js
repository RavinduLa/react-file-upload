import React from "react";
import {Link} from "react-router-dom";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

class Home extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <center><h1>Home</h1></center>
                <Link to={'/upload'}>Uploads</Link>
                <Link to={'/download'}>Downloads</Link>
            </div>
        );
    }

}

export default Home;