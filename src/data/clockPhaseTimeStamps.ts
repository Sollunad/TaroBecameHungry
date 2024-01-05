import {ClockPhase} from "../models/ClockPhase";
import {RegionalClockPhaseTimeStamps} from "../models/ClockPhaseTimeStamps";

export const clockPhaseTimeStampsTyria = new Map<ClockPhase, RegionalClockPhaseTimeStamps>([
    [ClockPhase.DAY, {
        start: [0, 30, 0],
        end: [1, 39, 59],
    }],
    [ClockPhase.DUSK, {
        start: [1, 40, 0],
        end: [1, 44, 59],
    }],
    [ClockPhase.NIGHT, {
        start: [1, 45, 0],
        end: [0, 24, 59],
    }],
    [ClockPhase.DAWN, {
        start: [0, 25, 0],
        end: [0, 29, 59],
    }],
]);

export const clockPhaseTimeStampsCantha = new Map<ClockPhase, RegionalClockPhaseTimeStamps>([
    [ClockPhase.DAY, {
        start: [0, 40, 0],
        end: [1, 34, 59],
    }],
    [ClockPhase.DUSK, {
        start: [1, 35, 0],
        end: [1, 39, 59],
    }],
    [ClockPhase.NIGHT, {
        start: [1, 40, 0],
        end: [0, 34, 59],
    }],
    [ClockPhase.DAWN, {
        start: [0, 35, 0],
        end: [0, 39, 59],
    }],
]);