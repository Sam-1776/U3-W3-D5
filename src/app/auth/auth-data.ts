export interface AuthData {
    accessToken: string;
    user:{
        id:number;
        email: string;
        nome: string;
        password: string;
    }
}
