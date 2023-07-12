export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    isVerified: boolean;
}

export interface Home {
    id: number;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    squareFootage: number;
    yearBuilt: number;
    numberBathrooms: number;
    numberBedrooms: number;
}
