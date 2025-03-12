import React, { useState, useEffect } from "react";
import Modal from './Modal'
function EmployeeModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    avatar: null,
    department: "",
  });
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Reset the form data when the modal opens
      setFormData({ firstName: "", lastName: "", avatar: null, department: "" });
      setErrors({});
      fetchDepartments();
    }
  }, [isOpen]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/departments"); // Replace with actual API endpoint
      const data = await response.json();
      setDepartments(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName || !/^[a-zA-Zა-ჰ]{2,255}$/.test(formData.firstName)) {
      newErrors.firstName = "Name must be 2-255 characters and contain only letters.";
    }
    if (!formData.lastName || !/^[a-zA-Zა-ჰ]{2,255}$/.test(formData.lastName)) {
      newErrors.lastName = "Last name must be 2-255 characters and contain only letters.";
    }
    if (!formData.avatar || formData.avatar.size > 600000) {
      newErrors.avatar = "Avatar must be an image and less than 600KB.";
    }
    if (!formData.department) {
      newErrors.department = "Please select a department.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      onClose();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 600000) {
      setFormData({ ...formData, avatar: file });
    } else {
      setErrors({ ...errors, avatar: "Avatar must be an image and less than 600KB." });
    }
  };

  return (
    isOpen && (
      <Modal/>
    )
  );
}

export default EmployeeModal;
