import { Client } from "./clientInterface";
export interface Project {
   _id: string;
   name: string;
   client: Client;
   state?: string;
}

export interface UpdateProjectData {
   _id?: string;
   name?: string;
   client?: string;
   state?: string;
}
