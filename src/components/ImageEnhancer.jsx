import Loader from "./Loader";

export default function ImageEnhancer(props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 ">
      {/* Uploaded Image */}
      <div className="flex flex-col border-2 border-red-400 rounded-2xl min-h-[300px] min-w-[300px] mx-auto ">
        <p className="text-white text-center font-medium bg-red-400 p-1.5 rounded-t-xl ">
          Uploaded Image
        </p>

        <div className="flex-1 flex items-center justify-center min-h-[200px] min-w-[200px]">
          {props.uploadImage ? (
            <img
              src={props.uploadImage}
              alt="Uploaded"
              className="max-w-[300px]  max-h-full object-cover rounded-b-xl"
            />
          ) : (
            <div className="text-gray-500 font-medium">No Image Selected</div>
          )}
        </div>
      </div>

      {/* Enhanced Image */}

      <div className="flex flex-col border-2 border-blue-400 rounded-2xl min-h-[300px] min-w-[300px] mx-auto ">
        <p className="text-white text-center font-medium bg-blue-400 p-1.5 rounded-t-xl ">
          Enhanced Image
        </p>

        <div className="flex-1 flex items-center justify-center min-h-[200px] min-w-[200px]">
          {props.uploadImage ? (
            props.enhancedImage ? (
              <img
                src={props.enhancedImage}
                alt="Uploaded"
                className="max-w-[300px] max-h-full object-cover rounded-b-xl"
              />
            ) : (
              <Loader />
            )
          ) : (
            <div className="text-gray-500 font-medium">Preview</div>
          )}
        </div>
      </div>
    </div>
  );
}
