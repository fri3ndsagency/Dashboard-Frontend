import airtableApi from "./apiConfig";

// Fetch detalles de Deliverable Links por un valor de "Project" en la tabla Overview
export const fetchDeliverableLinks = async (projectName: string) => {
   try {
      console.log("Project Name (raw):", projectName);

      // Realizamos la petición con el formato correcto
      const response = await airtableApi.get(`/Deliverable%20Links`, {
         params: {
            filterByFormula: `SEARCH("${projectName}", ARRAYJOIN({Overview}))`, // No codificamos aquí
         },
      });

      // Mapeamos los datos obtenidos
      console.log("Deliverable: ", response.data.records);
      return response.data.records;
   } catch (error) {
      console.error("Error fetching deliverable links:", error);
      throw error;
   }
};
