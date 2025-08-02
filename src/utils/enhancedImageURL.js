import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const Max_Retries = 20;

const enhancedImageURL = async (file) => {
  try {
    // upload api
    const taskId = await uploadImage(file);
    //   console.log(taskId);
    console.log("Image Uploaded");

    // recieve enhanced image
    const enhancedImageData = await pollingEnhancedRequest(taskId);
    console.log("Image processed");
    return enhancedImageData;
  } catch (error) {
    console.log("Error enhancing image:", error.message);
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(
    `${API_URL}/api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data?.task_id) {
    throw new Error("Failed to upload image! Task ID not found.");
  }
  return data.data.task_id;
};

// creating polling for fetch enhanced Image

const pollingEnhancedRequest = async (taskId, retries = 1) => {
  const result = await fetchEnhancedImage(taskId);

  if (result.state === 4) {
    //  enhanced image fetching in pending condtion
    console.log(`Processing... (${retries}/${Max_Retries})`);
    if (retries >= Max_Retries) {
      throw new Error("Max retries reached ! Try after sometime");
      alert("Image can't be enhanced. Try after sometime!!");
    }

    // create 2 sec of wait
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return pollingEnhancedRequest(taskId, retries + 1);
  }
  return result;
};

const fetchEnhancedImage = async (taskId) => {
  const { data } = await axios.get(
    `${API_URL}/api/tasks/visual/scale/${taskId}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data) {
    throw new Error("Failed to fetch enhanced Image! Image not found");
  }
  return data.data;
};

export default enhancedImageURL;
