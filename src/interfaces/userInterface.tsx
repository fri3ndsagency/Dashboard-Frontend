export interface User {
   firstName: string;
   lastName: string;
   email: string;
}

export interface UpdateUserData {
   firstName?: string;
   lastName?: string;
   email?: string;
}
