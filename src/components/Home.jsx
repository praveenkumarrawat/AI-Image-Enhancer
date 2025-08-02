import { useState } from "react";
import ImageEnhancer from "./ImageEnhancer";
import ImageUpload from "./ImageUpload";
import enhancedImageURL from "../utils/enhancedImageURL";

export default function Home() {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const UploadImageHandler = async (file) => {
    setUploadImage(URL.createObjectURL(file));
    setEnhancedImage(null);
    setLoading(true);

    // api handle
    try {
      const enhancedURL = await enhancedImageURL(file);
      setEnhancedImage(enhancedURL);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error while enhancing the image. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 gap-4">
      <h2 className="text-blue-500 text-2xl font-bold">AI Image Enhancer</h2>

      <ImageUpload UploadImageHandler={UploadImageHandler} />
      <ImageEnhancer
        uploadImage={uploadImage}
        enhancedImage={enhancedImage?.image}
        loading={loading}
      />

      <footer className="text-gray-400 text-sm mt-10">
        © 2025 Praveen Kumar Rawat
      </footer>
    </div>
  );
}
