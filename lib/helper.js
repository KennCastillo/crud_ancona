const BASE_URL = "http://localhost:3000"

// Exportamos todos los registros
export const getRecords = async () => {
    const response = await fetch(`${BASE_URL}/api/records`)
    const json = await response.json()

    return json;
}

// Exportamos un solo registro
export const getRecord = async (recordId) => {
    
    console.log("getRecord", recordId)
    const response = await fetch(`${BASE_URL}/api/records/${recordId}`);
    const json = await response.json();

    if(json) return json;
    return{}
}

// Insertar un registro
export async function addRecord(formData){
    try{
        const Options = {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(formData)
        }

        const response = await fetch(`${BASE_URL}/api/records`, Options)
        const json = await response.json()

        console.log(response)
        console.log(json)
        return json 

    } catch(error){
        return error;
    }
}

// Modificar un registro
export async function updateRecord(recordId, formData){
    try{
        const Options = {
            method: 'PUT',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(formData)
        }

        const response = await fetch(`${BASE_URL}/api/records/${recordId}`, Options)
        const json = await response.json()

        return json 
        
    } catch(error){
        return error;
    }
}

// Eliminar un registro
export async function deleteRecord(recordId){
    try{
        const Options = {
            method: 'DELETE',
            headers: {'Content-Type': "application/json"}
        }

        const response = await fetch(`${BASE_URL}/api/records/${recordId}`, Options)
        const json = await response.json()

        return json 
        
    } catch(error){
        return error;
    }
}