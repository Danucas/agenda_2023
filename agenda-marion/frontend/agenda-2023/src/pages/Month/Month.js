import React from "react";
import "./style.css";
import { getDaysInMonth, getMonthsInYear, renderMonth } from "../../utils/month";
import { sleep } from "../../utils/time";


class Month extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cover: null,
            hideCover: false
        }
    }

    async closeCover() {
        await sleep(4200);
        this.setState(()=>({hideCover: true}))
    }

    renderCover(month) {
        this.closeCover();
        return (<img onClick={(e)=>this.setState(()=>({hideCover: true}))} src={`/assets/images/covers/${month}.png`}></img>)
    }

    renderBackButton() {
        return (
            <img className="img-return" src="/assets/images/icons/back.png" onClick={()=>window.open("/calendar", "_self")}></img>
        )
    }

    render() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const mIndex = urlParams.get("i");

        const monthsInYear = getMonthsInYear();
        let month = monthsInYear[mIndex];
        let img;
        if (!this.state.hideCover) {
            img = this.renderCover(month.en.toLowerCase());
        }
        console.log(mIndex);
        const daysInMonth = getDaysInMonth(mIndex, 2023);
        console.log(daysInMonth);
        const dayCallback = true;
        const view = renderMonth(mIndex, month, daysInMonth, dayCallback, " 2023");
        const cover = this.state.cover;
        return (
            <div className="main-container">
                {img}
                {!img && this.renderBackButton()}
                <div className="month-view">
                    {view}
                </div>
                <div className="notes">
                    <h1>Notas</h1>
                    <div className="notes-list">
                        <p>Primera Nota que debe ser un poco larga para que pueda caber en esta vaina que necesitamos probar porque si no que pues quien somos</p>
                        <p>Primera Nota que debe ser un poco larga para que pueda caber en esta vaina que necesitamos probar porque si no que pues quien somos</p>
                        <p>Primera Nota que debe ser un poco larga para que pueda caber en esta vaina que necesitamos probar porque si no que pues quien somos</p>
                        <p>Primera Nota que debe ser un poco larga para que pueda caber en esta vaina que necesitamos probar porque si no que pues quien somos</p>
                        <p>Primera Nota que debe ser un poco larga para que pueda caber en esta vaina que necesitamos probar porque si no que pues quien somos</p>
                    </div>
                </div>
            </div>
        );
    }
}

  
export default Month;