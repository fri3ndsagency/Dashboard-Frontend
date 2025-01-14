import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { useProjects } from "@/hooks/services/useProjects";
import { Project, UpdateProjectData } from "@/interfaces/projectInterface";
import AddProjectModal from "./AddProjectModal";
import UpdateProjectModal from "./UpdateProjectModal";

const ProjectList = () => {
   const { projects, isLoading, error, createProject, updateProject } =
      useProjects();
   const [isModalOpen, setIsModalOpen] = useState(false);

   const [editDialogOpen, setEditDialogOpen] = useState(false);
   const [projectToEdit, setProjectToEdit] = useState<UpdateProjectData | null>(
      null
   );
   const [projectIdToEdit, setProjectIdToEdit] = useState<string | null>(null);

   const handleCreateProject = (newProject: Omit<Project, "_id">) => {
      createProject(newProject);
   };

   const handleOpenEditDialog = (project: Project) => {
      // Transformar el objeto Project a UpdateProjectData
      const updateProjectData: UpdateProjectData = {
         name: project.name,
         client: project.client._id, // Usar solo el ID del cliente
         state: project.state,
      };
      setProjectIdToEdit(project._id); // Guardar el ID del proyecto
      setProjectToEdit(updateProjectData);
      setEditDialogOpen(true);
   };

   const handleCloseEditDialog = () => {
      setEditDialogOpen(false);
      setProjectToEdit(null);
      setProjectIdToEdit(null); // Resetear el ID del proyecto
   };

   const handleEditProject = (updatedProject: UpdateProjectData) => {
      if (projectIdToEdit) {
         updateProject(projectIdToEdit, updatedProject); // Usar el ID del proyecto
         handleCloseEditDialog();
      }
   };

   if (isLoading) return <p>Cargando...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
      <div>
         <div className='flex items-center justify-between'>
            <h1 className='mt-4'>Projects</h1>
            <Button
               onClick={() => setIsModalOpen(true)}
               variant='default'
               size='sm'
            >
               <PlusCircle /> Create Project
            </Button>
         </div>
         {isLoading ? (
            <p>Loading...</p>
         ) : (
            <div className='mt-4'>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead className='opacity-0'>Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {projects.map((project) => (
                        <TableRow key={project._id}>
                           <TableCell className='font-medium'>
                              {project.name}
                           </TableCell>
                           <TableCell>{project.client?.name}</TableCell>
                           <TableCell>{project.state}</TableCell>

                           <TableCell className='text-right'>
                              <div className='flex justify-end gap-2'>
                                 <Button
                                    onClick={() =>
                                       handleOpenEditDialog(project)
                                    }
                                    variant='outline'
                                    size='sm'
                                 >
                                    Edit
                                 </Button>
                                 <Button
                                    // onClick={() =>
                                    //    handleOpenDeleteDialog(client._id)
                                    // }
                                    variant='outline'
                                    size='sm'
                                    className='border-red-800'
                                 >
                                    Delete
                                 </Button>
                              </div>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <AddProjectModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={handleCreateProject}
               />
               <UpdateProjectModal
                  isOpen={editDialogOpen}
                  onClose={handleCloseEditDialog}
                  onSubmit={handleEditProject}
                  currentProject={
                     projectToEdit || { name: "", client: "", state: "" }
                  }
               />
            </div>
         )}
      </div>
   );
};

export default ProjectList;
