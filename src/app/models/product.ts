export class Product {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    // data: {
    //     title: string,
    //     price: number,
    //     category: string,
    //     imageUrl: string,
    // }

    constructor(data: any) {
        this.title = data.title;
        this.price = data.price;
        this.category = data.category;
        this.imageUrl = data.imageUrl;

    }
    
}