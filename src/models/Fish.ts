import { Region } from "./Region";
import { Rarity } from "./Rarity";
import { Time } from "./Time";

export class Fish {
    region: Region;
    rarity: Rarity;
    icon: string;
    name: string;
    hole: string;
    bait: string;
    time: Time;
}