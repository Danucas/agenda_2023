export function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() == month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
}

export function weekdays() {
    return ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
}

export function renderMonth(mIndex, month, allDays, dayCallback, text=null) {
    let days;

    const daysToFill = allDays[0].getDay();
    const daysToLeft = 6 - allDays[allDays.length - 1].getDay();

    days = allDays.map((date)=>{
        let availability = 'available';
        if (date.getDay() < 2) {
            availability = 'disabled';
        }
        return (
            <h1 onClick={(e)=> (dayCallback && window.open(`/day?month=${mIndex}&i=${date.getDate()}`, "_self")) }>{`${date.getDate()}`}</h1>
        )
    })

    const firstDay = new Date(allDays[0].getTime());

    for (let i=0; i < daysToFill; i++) {
        firstDay.setDate(firstDay.getDate() - 1);
        days.unshift(<h1 className='outbound'></h1>);
    }

    const endDay = new Date(allDays[allDays.length -1 ].getTime());

    for (let i=0; i < daysToLeft; i++) {
        endDay.setDate(endDay.getDate() + 1);
        days.push(<h1 className='outbound'></h1>);
    }
    return (
        <div className="month-card" onClick={(e)=>(!dayCallback && window.open(`/month?i=${mIndex}`, "_self"))}>
            <h2>{month.es}{text}</h2>
            <div className='days-grid'>
                <p>D</p>
                <p>L</p>
                <p>M</p>
                <p>Mi</p>
                <p>J</p>
                <p>V</p>
                <p>S</p>
                {days}
            </div>
        </div>
    );
}

export function getMonthsInYear() {
    return [
        {
            en: "January",
            es: "Enero"
        },
        {
            en: "February",
            es: "Febrero"
        },
        {
            en: "March",
            es: "Marzo"
        },
        {
            en: "April",
            es: "Abril"
        },
        {
            en: "May",
            es: "Mayo"
        },
        {
            en: "June",
            es: "Junio"
        },
        {
            en: "July",
            es: "Julio"
        },
        {
            en: "August",
            es: "Agosto"
        },
        {
            en: "September",
            es: "Septiembre"
        },
        {
            en: "October",
            es: "Octubre"
        },
        {
            en: "November",
            es: "Noviembre"
        },
        {
            en: "December",
            es: "Diciembre"
        },
    ]
}
