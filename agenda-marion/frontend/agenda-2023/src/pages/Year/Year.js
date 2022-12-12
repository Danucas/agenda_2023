import React from "react";
import './style.css';
import { getDaysInMonth, getMonthsInYear, renderMonth } from "../../utils/month";


class Year extends React.Component {

    render() {
        let months = [];
        const monthsInYear = getMonthsInYear();
        console.log(monthsInYear);

        for (let i=0; i < monthsInYear.length; i++) {
            let month = monthsInYear[i];
            const daysInMonth = getDaysInMonth(i, 2023);
            console.log(daysInMonth);
            const view = renderMonth(i, month, daysInMonth, false);
            months.push(view);

        }

        return (
            <div className="main-container">
                <h1 onClick={()=>window.open("/", "_self")}>2023</h1>
                <div className="months">
                    {months}
                </div>
            </div>
        );
    }
}

  
export default Year;