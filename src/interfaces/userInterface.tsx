export interface User {
   _id: string;
   firstName: string;
   lastName: string;
   email: string;
}

export interface UpdateUserData {
   firstName?: string;
   lastName?: string;
   email?: string;
}
