export interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    phone: string;
    state: string;
    varified: boolean;
    userProfiles: string[];
}