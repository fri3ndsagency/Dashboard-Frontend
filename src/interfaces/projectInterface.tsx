export interface Project {
   _id: string;
   name: string;
   client: object;
   active: boolean;
}

export interface UpdateProjectData {
   name?: string;
   client?: object;
   active: boolean;
}
