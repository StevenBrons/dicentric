import MapNode from "./mapNode";

class MapState {
    location : MapNode;
    startNode: MapNode;
    map: MapNode[];

    setLocation(node: MapNode) {
        this.location = node;
    }
}

export default MapState;