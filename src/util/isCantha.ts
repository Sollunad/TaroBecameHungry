import {Fish} from "../models/Fish";
import {Region} from "../models/Region";

export function isFishCantha(fish: Fish | null): boolean {
    if (!fish) {
        return false;
    }
    const canthaRegions = [Region.SEITUNG, Region.KAINENG, Region.ECHOVALD, Region.DRAGONSEND];
    return canthaRegions.includes(fish.region);
}