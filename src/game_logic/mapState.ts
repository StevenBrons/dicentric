import MapNode from "./mapNode";

class MapState {
    location : MapNode;
    startNode: MapNode;
    map : MapNode[];
    image : string;

    constructor(map: MapNode[], image: string) {
        if(map.length === 0) {
            throw Error("trying to construct MapState with empty map")
        }
        this.map = map; 
        this.startNode = this.map[0];
        this.location = this.startNode;
        this.image = image;
    }

    setLocation(node: MapNode) : void {
        this.location = node;
    }

    resetMap() : void {
        this.location = this.startNode;
        //reset events
        for(let i = 0; i < this.map.length; i++) {
            this.map[i].event?.resetEvent();
        }
    }
}

export default MapState;