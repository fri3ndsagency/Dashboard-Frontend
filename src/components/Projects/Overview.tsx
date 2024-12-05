import { useEffect, useState } from "react";
import { fetchProjects } from "../../services/projects/allProjectsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router";

const Overview = () => {
   const [projects, setProjects] = useState<any[]>([]);
   const [filteredProjects, setFilteredProjects] = useState<any[]>([]); // Proyectos filtrados
   const [searchTerm, setSearchTerm] = useState<string>(""); // Término de búsqueda
   const [loading, setLoading] = useState<boolean>(true);

   const navigate = useNavigate();

   const fetchData = async () => {
      try {
         setLoading(true);
         const projectsData = await fetchProjects("esteban@fri3nds.com"); // TODO: Cambiar al email de un context desp de hacer el auth
         setProjects(projectsData);
         setFilteredProjects(projectsData); // Inicialmente mostrar todos los proyectos
      } catch (error) {
         console.error("Error loading data:", error);
      } finally {
         setLoading(false);
      }
   };

   // Maneja cambios en el input de búsqueda
   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.toLowerCase();
      setSearchTerm(value);
      // Filtra los proyectos en tiempo real
      setFilteredProjects(
         projects.filter((project) =>
            project.fields["Proyect"].toLowerCase().includes(value)
         )
      );
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div>
         <h1 className='mt-4 mb-4'>Projects View</h1>

         <div className='grid w-full gap-1.5'>
            <Label>Search projects</Label>
            <Input
               placeholder='Search projects by name...'
               value={searchTerm}
               onChange={handleSearchChange}
               className='w-full md:w-1/2'
            />
         </div>

         {loading ? (
            <p>Loading...</p>
         ) : (
            <div className='mt-4'>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='text-center pl-5'>
                           Actions
                        </TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {filteredProjects.map((project) => (
                        <TableRow key={project.id}>
                           <TableCell className='font-medium'>
                              {project.fields["Proyect"]}
                           </TableCell>
                           <TableCell>
                              {project.fields["Client Name"]}
                           </TableCell>
                           <TableCell>
                              <span className='capitalize'>
                                 {project.fields["Status"]}
                              </span>
                           </TableCell>
                           <TableCell className='text-right'>
                              <Button
                                 onClick={() => {
                                    // Reemplaza esto con la lógica de navegación dinámica
                                    window.location.href = `/projects/${project.id}`;
                                 }}
                                 variant='secondary'
                              >
                                 View Details
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
         )}
      </div>
   );
};

export default Overview;
