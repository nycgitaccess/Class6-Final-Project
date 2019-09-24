import React from "react";
import ReactDOM from "react-dom";
import "./style/main.less";
import 'bootstrap/dist/css/bootstrap.css';

class Welcome extends React.Component {
    render () {
        return (
            <div className="main">
                <h1 className="bg-success header">Hello World from class five final project</h1>
                <h1>the enviroment  for the front-end is ready to use !</h1>
            </div>
        );
    }
}

ReactDOM.render(<Welcome />, document.getElementById("root"));
