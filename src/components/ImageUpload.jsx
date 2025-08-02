export default function ImageUpload(props) {

    const ShowImagehandler = (e)=>{
        const file = e.target.files[0];
        // console.log(e.target.files);
        if(file) {
            props.UploadImageHandler(file);
        }
    }


  return (
    <label
      htmlFor="fileInput"
      className="border-2 border-gray-300 border-dashed rounded-lg w-1/3 h-12 cursor-pointer hover:shadow-md flex items-center justify-center"
    >
      <span className="text-red-400 font-medium">Upload File</span>
      <input type="file" id="fileInput" className="hidden" onChange={ShowImagehandler} />
    </label>
  );
}
