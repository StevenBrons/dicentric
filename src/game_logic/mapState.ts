import { cloneDeep } from "lodash";
import GameEvent from "./events/gameEvent";
import MapNode from "./mapNode";

class MapState {
    location : MapNode;
    startNode: MapNode;
    endNode : MapNode;
    map : MapNode[];
    eventPool : {event: (GameEvent|null), image: string}[];
    image : string;
    mapSize : {width : number, height : number};
    originalmap : MapNode[];

    constructor(map : MapNode[], eventPool : {event: (GameEvent|null), image: string}[], image : string, mapSize : {width : number, height : number}) {
        if(map.length === 0) {
            throw Error("trying to construct MapState with empty map")
        } 
        this.startNode = map[0];
        this.endNode = map[map.length - 1];
        this.map = map;
        this.eventPool = eventPool;
        this.randomizeMap();
        this.location = this.startNode;
        this.image = image;
        this.mapSize = mapSize;
        this.originalmap = cloneDeep(map);
    }

    setLocation(node: MapNode) : void {
        this.location = node;
    }

    resetMap() : void {
        this.map = this.originalmap;
        this.originalmap = cloneDeep(this.originalmap);
        this.randomizeMap();
        this.location = this.startNode;
    }

    getEvent() : GameEvent|null{
        return this.location.event;
    }

    randomizeMap() : void {
        for(let i = this.eventPool.length; i<this.map.length-2; i++){
            this.eventPool.push({event: null, image: "island_empty_small"});
        }
        this.shuffleArray(this.eventPool);
        for(let i = 1; i<this.map.length - 1; i++) {
            if(!this.map[i].fixedEvent) {
                this.map[i].event = this.eventPool[i-1].event;
                this.map[i].image = this.eventPool[i-1].image;
            }
        }
    }

    //stack overflow code
    shuffleArray(array : any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

export default MapState;