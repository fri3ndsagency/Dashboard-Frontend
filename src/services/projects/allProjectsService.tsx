import airtableApi from "./apiConfig";

// Fetch todos los proyectos con filtro
export const fetchProjects = async (clientEmail: string) => {
   try {
      const response = await airtableApi.get(`/Project%20Overview`, {
         params: {
            filterByFormula: `AND({Client Email}="${clientEmail}", {Is Active}=TRUE())`,
            view: "Grid view",
         },
      });
      return response.data.records;
   } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
   }
};

// Fetch un proyecto específico por ID
export const fetchProjectById = async (id: string) => {
   try {
      const response = await airtableApi.get(`/Project%20Overview/${id}`);
      return response.data;
   } catch (error) {
      console.error(`Error fetching project with ID: ${id}`, error);
      throw error;
   }
};
