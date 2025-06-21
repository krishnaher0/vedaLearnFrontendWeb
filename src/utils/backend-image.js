export const getBackendImageUrl = (imagePath) => {
    if(!imagePath) return null
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 
        "http://localhost:3001"
    
    return apiUrl + "/"  + imagePath
}