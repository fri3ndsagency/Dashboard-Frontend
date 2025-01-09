export interface User {
   _id: string;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
}

export interface UpdateUserData {
   firstName?: string;
   lastName?: string;
   email?: string;
}
