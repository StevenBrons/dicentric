import GameEvent from "./events/gameEvent";
import MapNode from "./mapNode";

class MapState {
    location : MapNode;
    startNode: MapNode;
    endNode : MapNode;
    map : MapNode[];
    image : string;

    constructor(map: MapNode[], image: string) {
        if(map.length === 0) {
            throw Error("trying to construct MapState with empty map")
        } 
        this.startNode = map[0];
        this.endNode = map[map.length - 1];
        this.map = map;
        this.randomizeMap();
        this.location = this.startNode;
        this.image = image;
    }

    setLocation(node: MapNode) : void {
        this.location = node;
    }

    resetMap() : void {
        this.randomizeMap();
        this.location = this.startNode;
    }

    getEvent() : GameEvent|null{
        return this.location.event;
    }

    //todo: moet uit een grotere pool
    randomizeMap() : void {
        let events = [];
        //add all events to randomize (including nulls) to array events
        for(let i = 1; i<this.map.length - 1; i++) {
            events.push(this.map[i].event);
        }
        this.shuffleArray(events);
        for(let i = 1; i<this.map.length - 1; i++) {
            this.map[i].event = events[i];
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