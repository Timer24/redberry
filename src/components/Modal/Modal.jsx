import React, { useState, useRef, useEffect } from 'react';
import closeButton from '../images/close-button.png';
import ButtonsEmployees from './ButtonsEmployees';
import Forms from './Forms';
import FileUpload from './FileUpload';
import EmployeeDepartment from './EmployeeDepartment';
import useFetchPost from '../../hooks/useFetchPost';

function Modal({ isOpen, onClose }) {
  const [formState, setFormState] = useState({
    name: '',
    surname: '',
    avatar: '', // You'll need to handle this if you're uploading an avatar
    department_id: '', // Use department_id instead of department
  });
  const [validationState, setValidationState] = useState({
    name: null,
    surname: null,
    department_id: null, // Ensure department_id validation is done
  });
  const [fileError, setFileError] = useState('');
  const [isFileValid, setIsFileValid] = useState(false);
  const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);

  const { postData, loading, error, data } = useFetchPost('employees', formState); // Pass formState to post data
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validateField = (name, value) => {
    const isValid = value.length >= 2 && value.length <= 255;
    setValidationState((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateFileSize = (file) => {
    const MAX_SIZE = 600 * 1024;
    if (file && file.size > MAX_SIZE) {
      setFileError('ატვირთული ფოტო არ უნდა აღემატებოდეს 600KB-ს.');
      return false;
    }
    setFileError('');
    setIsFileValid(true);
    return true;
  };

  const handleClose = () => {
    setFormState({
      name: '',
      surname: '',
      avatar: '',
      department_id: '',
    });
    setValidationState({
      name: null,
      surname: null,
      department_id: null,
    });
    setFileError('');
    setIsFileValid(false);
    setIsDepartmentSelected(false);
    onClose();
  };

  const handleDepartments = (isSelected, department_id) => {
    setIsDepartmentSelected(isSelected);
    setFormState((prev) => ({
      ...prev,
      department_id: department_id, // Update department_id when a department is selected
    }));
    setValidationState((prev) => ({ ...prev, department_id: isSelected }));
  };

  const isFormValid =
    Object.values(validationState).every(Boolean) && isFileValid && isDepartmentSelected;
    console.log(isFormValid);

    const handleFileChange = (file) => {
      setFormState((prev) => ({
        ...prev,
        avatar: file,
      }));
    };

    const handleAddEmployee = () => {
      if (isFormValid) {
        const formData = new FormData();
        formData.append('name', formState.name);
        formData.append('surname', formState.surname);
        formData.append('department_id', formState.department_id);
        
        console.log(formState.department_id)
        // If there's a file (avatar), append it to the FormData
        if (formState.avatar) {
          formData.append('avatar', formState.avatar);
        }
        
        console.log(formData)
        // Now use your `useFetchPost` custom hook with the new FormData
        postData(formData); // Pass FormData to postData instead of the plain formState
      }
    };
    

  return (
    <div
      className="fixed inset-0 bg-[#0D0F1026] bg-opacity-15 flex justify-center items-center z-50"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-[10px] w-[913px] h-[768px] relative px-[50px] pt-[40px] pb-[60px] gap-[37px]"
      >
        <img
          src={closeButton}
          className="absolute top-[40px] right-[50px] w-[40px] h-[40px] cursor-pointer"
          onClick={handleClose}
          alt="X"
        />
        <div className="w-[813px] h-[589px] absolute bottom-[60px] gap-[45px]">
          <h1 className="text-center font-medium text-[32px] leading-[100%] tracking-[0%]">
            თანამშრომლის დამატება
          </h1>
          <div className="w-[813px] h-[522px] absolute bottom-[0px]">
            <div className="w-[813px] h-[439px] absolute top-0">
              <Forms
                formState={formState}
                validationState={validationState}
                onInputChange={handleChange}
              />
              <FileUpload validateFileSize={validateFileSize}  onFileChange={handleFileChange}/>
            </div>
            <ButtonsEmployees
              disabled={!isFormValid}
              onClose={handleClose}
              onAddEmployee={handleAddEmployee} // Pass handleAddEmployee to the button
            />
          </div>
          <div className="absolute left-0 bottom-[50px]">
            <EmployeeDepartment isDepartmentSelected={handleDepartments}/>
          </div>
        </div>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{`Error: ${error}`}</div>}
        {data && <div className="success">Employee added successfully!</div>}
      </div>
    </div>
  );
}

export default Modal;
