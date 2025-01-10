export interface Project {
   _id: string;
   name: string;
   client: object;
   active: boolean;
}

export interface updateProjectData {
   name?: string;
   client?: object;
   active: boolean;
}
