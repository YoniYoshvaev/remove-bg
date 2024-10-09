import axios from 'axios';

const REMOVE_BG_API_KEY = 'CruvqxKCL6sghx7h6jBL7xyd'; // Change here to ur API Key from remove.bg 

export const removeBackground = async (file: File): Promise<Blob | null> => {
  const formData = new FormData();
  formData.append('image_file', file);

  try {
    const response = await axios.post(
      'https://api.remove.bg/v1.0/removebg',
      formData,
      {
        headers: {
          'X-Api-Key': REMOVE_BG_API_KEY,
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', 
      }
    );
    return response.data;
  } catch (error) {
    console.error('Background removal failed:', error);
    return null;
  }
};
