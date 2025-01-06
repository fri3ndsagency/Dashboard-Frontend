export interface Client {
   _id: string;
   name: string;
   email: string;
   active: boolean;
}

export type UpdateClientData = {
   name?: string;
   email?: string;
   active: boolean;
};
