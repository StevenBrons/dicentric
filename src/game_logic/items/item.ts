class Item {
    id : number;
    image : string;

    constructor() {
        this.id = Math.floor(Math.random() * 100000);
        this.image = "";
    }
}

export default Item;