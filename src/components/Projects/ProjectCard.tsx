import React from "react";
import { useNavigate } from "react-router-dom";
import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

interface ProjectCardProps {
   id: string;
   name: string;
   client: string;
   status: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
   id,
   name,
   client,
   status,
}) => {
   const navigate = useNavigate();

   // Handler para redirigir a la ruta dinámica
   const handleClick = () => {
      navigate(`/projects/${id}`);
   };

   return (
      <Card>
         <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{client}</CardDescription>
            <CardDescription>
               <Badge variant='secondary'>{status}</Badge>
            </CardDescription>
         </CardHeader>

         <CardFooter>
            <Button variant='default' onClick={handleClick}>
               View details
            </Button>
         </CardFooter>
      </Card>
   );
};

export default ProjectCard;
