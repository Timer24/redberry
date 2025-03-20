import React, { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import UploadImage from "../assets/image-upload.png";
import RecycleBin from "../assets/recycle-bin.png";

const FileValidation = ({ isValidSize }) => {
    const textColor = isValidSize === null ? "text-[#6C757D]" : isValidSize ? "text-[#08A508]" : "text-[#FA4D4D]";

    return (
        <div className="flex items-center gap-x-1 mt-2">
            <div className="flex items-center gap-x-1">
                <IoMdCheckmark className={`w-[16px] h-[16px] ${textColor}`} />
                <p className={`font-sans font-normal text-[10px] leading-[100%] ${textColor} whitespace-nowrap`}>
                    მაქსიმუმ 600KB
                </p>
            </div>
        </div>
    );
};

function FileUpload({ validateFileSize, onFileChange }) {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [isValidFileSize, setIsValidFileSize] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSizeInKB = file.size / 1024;
            const isValid = fileSizeInKB < 600;
            setIsValidFileSize(isValid);

            if (isValid && validateFileSize(file)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(URL.createObjectURL(file));
                    setFile(file);
                    onFileChange(file);
                };
                reader.readAsDataURL(file);
            } else {
                e.target.value = '';
            }
        } else {
            setIsValidFileSize(null);
        }
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setImage(null);
        setFile(null);
        setIsValidFileSize(null);
        onFileChange(null);
    };

    return (
        <div className="w-[813px] gap-[8px] mt-[45px]">
            <p className="w-[813px] h-[17px] font-[FiraGO] font-medium text-[14px] leading-[100%] tracking-[0%]">
                ავატარი*
            </p>

            <div className="w-[813px] h-[120px] bg-white rounded-[6px] border-dashed border-[#CED4DA] border-[1px] relative">
                {image ? (
                    <div className="w-full h-full flex justify-center items-center">
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
                    </div>
                ) : (
                    <label className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
                        <img src={UploadImage} alt="upload-img" />
                        <p className="font-[FiraGO] font-normal text-[14px] mt-2">ატვირთეთ ფოტო</p>
                        <input
                            id="file-upload"
                            className="hidden"
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                            title=" "
                        />
                    </label>
                )}
            </div>

            <FileValidation isValidSize={isValidFileSize} />
        </div>
    );
}

export default FileUpload;