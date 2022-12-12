import React from "react";
import "./style.css";
import { sleep } from "../../utils/time";
import { getMonthsInYear, weekdays } from "../../utils/month";
import { getMoonSign, getSignCharacter, getSunSign } from "../../utils/moon";

class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cover: null,
            hideCover: false,
            priorities: null
        }
    }

    renderBackButton() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const month = urlParams.get("month")
        return (
            <img className="img-return" src="/assets/images/icons/back.png" onClick={()=>window.open(`/month?i=${month}`, "_self")}></img>
        )
    }
    async closeCover() {
        await sleep(4200);
        this.setState(()=>({hideCover: true}))
    }

    renderCover(month) {
        this.closeCover();
        return (<img onClick={(e)=>this.setState(()=>({hideCover: true}))} src={`/assets/images/covers/${month}.png`}></img>)
    }

    renderHours() {
        let hours = [];
        for (let h=8; h <=22; h++) {
            if (h > 12) {
                hours.push(<li>{`${h - 12}:00 pm`}</li>);
            } else {
                hours.push(<li>{`${h}:00 am`}</li>);
            }
        }
        return hours;
    }
    async getPriorities() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const mIndex = urlParams.get("month");
        const day = urlParams.get('i');
        const resp = await fetch(`http://192.168.1.10:5000/api/v0/day/priorities?month=${mIndex}&day=${day}`);

        if (resp.status == 200) {
            const data = await resp.json();
            this.setState(()=>({priorities: data.data}));
        }
    }

    async addPriorities() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const mIndex = urlParams.get("month");
        const day = urlParams.get('i');
        const resp = await fetch('http://192.168.1.10:5000/api/v0/day/priorities',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                month: mIndex,
                day: day,
                priorities: [
                    {msg: "Some priority", level: 3}
                ]
            })
        });
    }

    render() {
        let priorities;
        if (!this.state.priorities) {
            this.getPriorities();
        } else {
            priorities = this.state.priorities.map((prior, index) => {
                return (
                    <li>{index + 1}. {prior.msg}</li>
                )
            })
        }
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const mIndex = urlParams.get("month");
        const day = urlParams.get('i');

        const monthsInYear = getMonthsInYear();
        let month = monthsInYear[mIndex];

        let img;
        if (!this.state.hideCover) {
            img = this.renderCover(month.en.toLowerCase());
        }
        const date = new Date(2023, mIndex, day);
        const weekDays = weekdays();
        let title = `${month.es} ${day}/ 2023 / ${weekDays[date.getDay()]}`;
        const moon = getMoonSign(mIndex, day);
        const sun = getSunSign(mIndex, day);
        return(
            <div className="main-container day-container">
                {this.renderBackButton()}
                {img}
                <h2>{title}</h2>
                <div className="astro-data">
                    <div className="banner-1">
                        <p>Luna en {moon}</p>
                    </div>
                    <div>
                        <p>Temporada<br></br>{sun}</p>
                    </div>
                </div>
                <div className="day-sections">
                    <div className="hours-schedule">
                        <ul>
                            {this.renderHours()}
                        </ul>
                    </div>
                    <div className="mood-meter">
                        <div>
                            <p>HUMOR: </p>
                        </div>
                        <div className="priorities">
                            <h3>MIS PRIORIDADES <span onClick={()=>this.addPriorities()}>+</span></h3>
                            <ul>
                                {priorities}
                            </ul>
                        </div>

                        <div className="todo">
                            <h3>COSAS QUE HACER <span onClick={()=>this.addPriorities()}>+</span></h3>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div className="notes">
                        <h1>Notas</h1>
                        <div className="notes-list">
                            <p>Primera Nota que debe ser un poco larga para que pueda caber en esta vaina que necesitamos probar porque si no que pues quien somos</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Day