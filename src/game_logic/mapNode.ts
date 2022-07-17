import GameEvent from "./events/gameEvent";

class MapNode {
    nodesInFront : MapNode[];
    fixedEvent : boolean;
    x : number;
    y : number;
    level : number; //steps from start
    event : GameEvent | null;
    id : number;
    image : string;

    constructor(nextNodes : MapNode[], x : number, y: number, stepsFromStart : number, event: GameEvent | null, fixedEvent : boolean, image : string){
        this.nodesInFront = nextNodes;
        this.x = x;
        this.y = y;
        this.level = stepsFromStart;
        this.event = event;
        this.fixedEvent = fixedEvent;
        this.id = Math.floor(Math.random() * 100000);
        this.image = image;
    }
}

export default MapNode;