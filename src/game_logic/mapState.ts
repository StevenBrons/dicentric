import GameEvent from "./events/gameEvent";
import MapNode from "./mapNode";

class MapState {
    location : MapNode;
    startNode: MapNode;
    endNode : MapNode;
    map : MapNode[];
    eventPool : (GameEvent|null)[];
    image : string;

    constructor(map : MapNode[], eventPool : (GameEvent|null)[], image : string) {
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

    randomizeMap() : void {
        for(let i = this.eventPool.length; i<this.map.length-2; i++){
            this.eventPool.push(null);
        }
        this.shuffleArray(this.eventPool);
        for(let i = 1; i<this.map.length - 1; i++) {
            if(!this.map[i].fixedEvent) {
                this.map[i].event = this.eventPool[i-1];
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