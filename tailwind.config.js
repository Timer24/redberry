/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/Header/Header1.jsx",
    "./src/app.jsx",
    "./src/components/Filters/Filters.jsx",
    "./src/components/Filters/DepartmentDropdown.jsx",
    "./src/components/Filters/PriorityDropdown.jsx",
    "./src/components/Filters/EmployeeDropdown.jsx",
    "./src/components/DepartmentsCheckboxes.jsx",
    "./src/components/Header/Buttons.jsx",
    "./src/components/ModalComponent/Modal.jsx",
    "./src/components/ModalComponent/ButtonsEmployees.jsx",
    "./src/components/ModalComponent/Forms.jsx",
    "./src/components/ModalComponent/FileUpload.jsx",
    "./src/components/ModalComponent/EmployeeDepartment.jsx",

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

