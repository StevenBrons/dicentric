import MapNode from "./mapNode";

class MapState {
    location : MapNode;
    startNode: MapNode;
    map: MapNode[];

    constructor(map: MapNode[]) {
        if(map.length === 0) {
            throw Error("trying to construct MapState with empty map")
        }
        this.map = map; 
        this.startNode = this.map[0];
        this.location = this.startNode;
    }

    setLocation(node: MapNode) {
        this.location = node;
    }
}

export default MapState;