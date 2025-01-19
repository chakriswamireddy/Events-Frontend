const uploadImageToImgBB = async (imageFile) => {
    const url = import.meta.env.VITE_IMGBB_URL;
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("image", imageFile);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log("Image uploaded successfully:", typeof result.data.url);
        return result.data.url;
        alert(`Image uploaded! URL: ${result.data.url}`);
      } else {
        console.error("Failed to upload image:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  
  export default uploadImageToImgBB