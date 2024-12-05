import { useEffect, useState } from "react";
import { fetchProjects } from "../../services/projects/allProjectsService";
import ProjectCard from "./ProjectCard";

const Overview = () => {
   const [projects, setProjects] = useState<any[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

   const fetchData = async () => {
      try {
         setLoading(true);
         const projectsData = await fetchProjects("esteban@fri3nds.com"); //todo cambiar al mail de un context desp de hacer el auth

         setProjects(projectsData);
      } catch (error) {
         console.error("Error loading data:", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div>
         <h1 className='mt-4 mb-4'>Projects View</h1>
         {loading ? (
            <p>Loading...</p>
         ) : (
            <div className='mt-8'>
               <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  {projects.map((project) => (
                     <ProjectCard
                        key={project.id}
                        id={project.id}
                        name={project.fields["Proyect"]}
                        client={project.fields["Client Name"]}
                        status={project.fields["Status"]}
                     />
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default Overview;
