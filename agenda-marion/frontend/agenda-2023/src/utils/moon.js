import { getMonthsInYear } from "./month";
import { moonSigns } from "./moon_signs";
import { sunSigns } from "./sun_signs";
getMonthsInYear()

export function getSunSign(month, day) {
    const monthName = getMonthsInYear()[month];
    const signkey = Object.keys(sunSigns[monthName.en])[0];
    console.log(signkey);
    console.log(sunSigns);
    return sunSigns[monthName.en][signkey].sign;
}

export function getSignCharacter(sign) {
    const signs = {
        aries: 9800,
        tauro: 9801,
        geminis: 9802,
        cancer: 9803,
        leo: 9804,
        virgo: 9805,
        libra: 9806,
        escorpio: 9807,
        sagitario: 9808,
        capricornio: 9809,
        acuario: 9810,
        piscic: 9811,
    }
    return String.fromCharCode(signs[sign]);
}

export function getMoonSign(month, day) {
    const monthName = getMonthsInYear()[month];
    const days = Object.keys(moonSigns[monthName.en]);
    let singDay;
    if (days.includes(day)) {
        return moonSigns[monthName.en][day].sign;
    } else {
        for (let da of days) {
            if (Number(da) > Number(day)) {
                break;
            }
            singDay = moonSigns[monthName.en][da].sign;
        }
    }

    return singDay;
}