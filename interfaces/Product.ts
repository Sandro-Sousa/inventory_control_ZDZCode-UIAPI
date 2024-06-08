export interface Product {
    idProduct: number;
    description: string;
    purchasePrice: number;
    saleValue: number;
    stockBalance: number;
}

export interface ProductAdd extends Omit<Product, 'idProduct'> {
    idProduct: number;
}