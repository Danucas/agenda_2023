import React from "react";
import "./style.css";

class Cover extends React.Component {
    render() {
        return (
            <div className="cover-main-container">
                <a href="/calendar">
                    <img src={"/assets/images/covers/main-cover.png"} alt="cover-page"></img>
                </a>
            </div>
        );
    }
}

  
export default Cover;