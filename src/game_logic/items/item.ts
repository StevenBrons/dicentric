abstract class Item {
    id : number;
    abstract description : string;
    abstract image : string;

    constructor() {
        this.id = Math.floor(Math.random() * 100000);
    }
}

export default Item;