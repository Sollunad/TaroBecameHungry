import {ClockPhase, clockPhaseOrder} from "../models/ClockPhase";
import {clockPhaseTimeStampsCantha, clockPhaseTimeStampsTyria} from "../data/clockPhaseTimeStamps";

export function getCurrentClockPhase(isCantha: boolean, date: Date) {
    return getCurrentClockPhaseUTC(isCantha, getUTCArray(date));
}

export function getFormattedTimeUntilNextClockPhase(isCantha: boolean, date: Date) {
    return getFormattedTimeUntilNextClockPhaseUTC(isCantha, getUTCArray(date));
}

export function getNextClockPhase(isCantha: boolean, date: Date) {
    return getNextClockPhaseUTC(isCantha, getUTCArray(date));
}

function getUTCArray(date: Date): [number, number, number] {
    return [date.getUTCHours() % 2, date.getUTCMinutes(), date.getUTCSeconds()];
}

function getSeconds(utcArray: [number, number, number]): number {
    return utcArray[0] * 60 * 60 + utcArray[1] * 60 + utcArray[2];
}

function getCurrentClockPhaseUTC(isCantha: boolean, utcArray: [number, number, number]): ClockPhase {
    const regionalTimeStamps = isCantha ? clockPhaseTimeStampsCantha : clockPhaseTimeStampsTyria;
    const currentSeconds = getSeconds(utcArray);

    for (const clockPhase of clockPhaseOrder) {
        const timeStampStartSeconds = getSeconds(regionalTimeStamps.get(clockPhase).start);
        const timeStampEndSeconds = getSeconds(regionalTimeStamps.get(clockPhase).end);
        if (currentSeconds <= timeStampEndSeconds && currentSeconds >= timeStampStartSeconds) {
            return clockPhase;
        }
    }
    // if no clock phase matches, the time must be at the start of the cutover between two 2 hour cycles
    return ClockPhase.NIGHT;
}

function getNextClockPhaseUTC(isCantha: boolean, utcArray: [number, number, number]): ClockPhase {
    const currentIndex = clockPhaseOrder.indexOf(getCurrentClockPhaseUTC(isCantha, utcArray));
    return clockPhaseOrder[(currentIndex + 1) % 4];
}

function getFormattedTimeUntilNextClockPhaseUTC(isCantha: boolean, utcArray: [number, number, number]): string {
    const nextClockPhase = getNextClockPhaseUTC(isCantha, utcArray);
    const secondsUntil = getRemainingSecondsUntil(nextClockPhase, isCantha, utcArray);
    return `${Math.floor(secondsUntil / 60)}:${String(secondsUntil % 60).padStart(2, '0')}`;
}

function getRemainingSecondsUntil(clockPhase: ClockPhase, isCantha: boolean, utcArray: [number, number, number]): number {
    if (clockPhase === getCurrentClockPhaseUTC(isCantha, utcArray)) {
        return 0;
    }
    const regionalTimeStamps = isCantha ? clockPhaseTimeStampsCantha : clockPhaseTimeStampsTyria;
    const phaseTimeStamps = regionalTimeStamps.get(clockPhase);
    const currentSeconds = getSeconds(utcArray);
    const timeStampStartSeconds = getSeconds(phaseTimeStamps.start);
    const diff = timeStampStartSeconds - currentSeconds;
    return diff > 0 ? diff : 7200 + diff;
}