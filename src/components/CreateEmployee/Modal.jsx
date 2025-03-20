import React, { useState, useRef, useEffect, useCallback } from 'react';
import closeButton from '../assets/close-button.png';
import ButtonsEmployees from './ButtonsEmployees';
import Forms from './Forms';
import FileUpload from './FileUpload';
import EmployeeDepartment from './EmployeeDepartment';
import useFetchPost from '../../hooks/useFetchPost';
import SuccessPopup from '../shared/SuccessPopup';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

function Modal({ isOpen, onClose }) {
  const [formState, setFormState] = useState({
    name: '',
    surname: '',
    avatar: '',
    department_id: '',
  });
  const [validationState, setValidationState] = useState({
    name: null,
    surname: null,
    department_id: null,
  });
  const [fileError, setFileError] = useState('');
  const [isFileValid, setIsFileValid] = useState(false);
  const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { postData, loading, error, data } = useFetchPost('employees', formState);
  const modalRef = useRef(null);

  const validateField = useCallback((name, value) => {
    const isValid = value.length >= 2 && value.length <= 255;
    setValidationState((prev) => ({ ...prev, [name]: isValid }));
  }, []);

  const debouncedValidateField = useCallback(
    debounce((name, value) => validateField(name, value), 500),
    [validateField]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    debouncedValidateField(name, value);
  }, [debouncedValidateField]);

  const validateFileSize = useCallback((file) => {
    const MAX_SIZE = 600 * 1024;
    if (file && file.size > MAX_SIZE) {
      setFileError('ატვირთული ფოტო არ უნდა აღემატებოდეს 600KB-ს.');
      return false;
    }
    setFileError('');
    setIsFileValid(true);
    return true;
  }, []);

  const handleClose = useCallback(() => {
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
  }, [onClose]);

  const handleDepartments = useCallback((isSelected, department_id) => {
    setIsDepartmentSelected(isSelected);
    setFormState((prev) => ({
      ...prev,
      department_id: department_id,
    }));
    setValidationState((prev) => ({ ...prev, department_id: isSelected }));
  }, []);

  const handleFileChange = useCallback((file) => {
    setFormState((prev) => ({
      ...prev,
      avatar: file,
    }));
  }, []);

  const isFormValid = Object.values(validationState).every(Boolean) && 
                     isFileValid && 
                     isDepartmentSelected;

  const handleAddEmployee = useCallback(async () => {
    if (!isFormValid) {
      console.log('Form is not valid:', { validationState, isFileValid, isDepartmentSelected });
      return;
    }

    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('surname', formState.surname);
    formData.append('department_id', formState.department_id);

    if (formState.avatar) {
      formData.append('avatar', formState.avatar);
    }

    
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const result = await postData(formData);
      console.log('API Response:', result);
      
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  }, [formState, isFormValid, postData, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#0D0F1026] bg-opacity-15 flex justify-center items-center z-[100]"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-[10px] w-[913px] h-[768px] relative px-[50px] pt-[40px] pb-[60px] gap-[37px] z-[100]"
      >
        {showSuccessPopup && (
          <div className="absolute top-4 left-4 text-[#8338EC] bg-white border-[1px] px-6 py-3 rounded-md shadow-lg z-[150]">
            თანამშრომელი წარმატებით დაემატა
          </div>
        )}

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
              <FileUpload 
                validateFileSize={validateFileSize} 
                onFileChange={handleFileChange} 
              />
            </div>
            <ButtonsEmployees
              disabled={!isFormValid}
              onClose={handleClose}
              onAddEmployee={handleAddEmployee}
            />
          </div>
          <div className="absolute left-0 bottom-[50px]">
            <EmployeeDepartment isDepartmentSelected={handleDepartments} />
          </div>
        </div>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{`Error: ${error}`}</div>}
        {data && <div className="success"></div>}
      </div>
    </div>
  );
}

export default Modal;