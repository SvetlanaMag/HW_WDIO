export interface IProduct {
    name: string;
    manufacturer: MANUFACTURER;
    price: number;
    amount: number;
    notes?: string;
};

export enum MANUFACTURER {
    APPLE = 'Apple',
    SAMSUNG = 'Samsung',
    GOOGLE = 'Google',
    MICROSOFT = 'Microsoft',
    SONY = 'Sony',
    XIAOMI = 'Xiaomi',
    AMAZON = 'Amazon',
    TESLA = 'Tesla'
};