export class Product {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    key: string;
    // data: {
    //     title: string,
    //     price: number,
    //     category: string,
    //     imageUrl: string,
    // }

    constructor(data: any, key: string) {
        this.title = data.title;
        this.price = data.price;
        this.category = data.category;
        this.imageUrl = data.imageUrl;
        this.key = key;
    }
    
}