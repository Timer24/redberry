import React, { useState } from "react";
import UploadImage from "../images/image-upload.png";
import RecycleBin from "../images/recycle-bin.png";

function FileUpload({ validateFileSize, onFileChange }) {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && validateFileSize(file)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(URL.createObjectURL(file));
            setFile(file); 
            onFileChange(file); 
          };
          reader.readAsDataURL(file);
        }
      };

  const handleDelete = (e) => {
    e.stopPropagation(); 
    setImage(null);
    setFile(null);
    onFileChange(null);
  };

  return (
    <div className="w-[813px] h-[145px] gap-[8px] mt-[45px]">
      <p className="w-[813px] h-[17px] font-[FiraGO] font-medium text-[14px] leading-[100%] tracking-[0%]">
        ავატარი*
      </p>

      <div className="w-[813px] h-[120px] bg-white rounded-[6px] flex justify-center items-center p-4 border-dashed border-[#CED4DA] border-[1px] relative">
        {image ? (
          <div className="w-[88px] h-[88px] relative">
            <img
              src={image}
              alt="Uploaded"
              className="w-[88px] h-[88px] object-cover rounded-full"
            />
            <button
              onClick={handleDelete}
              className="w-[24px] h-[24px] absolute bottom-0 right-0 bg-white text-[#6C757D] p-[5px] rounded-full z-10 border-[0.3px]"
            >
              <img src={RecycleBin} className="w-[14px] h-[14px]" alt="x" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col justify-center items-center cursor-pointer">
            <img src={UploadImage} alt="upload-img" />
            <p className="font-[FiraGO] font-normal text-[14px] mt-2">ატვირთეთ ფოტო</p>
            <input
              id="file-upload"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
