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
    "./src/components/CreateTask/CreateNewTask.jsx",
    "./src/components/CreateTask/TaskCreator.jsx",
    "./src/components/CreateTask/MiniComponents/AddTaskButton.jsx",
    "./src/components/CreateTask/MiniComponents/Deadline.jsx",
    "./src/components/CreateTask/MiniComponents/Department.jsx",
    "./src/components/CreateTask/MiniComponents/Description.jsx",
    "./src/components/CreateTask/MiniComponents/Employee.jsx",
    "./src/components/CreateTask/MiniComponents/PriorityStatus.jsx",
    "./src/components/CreateTask/MiniComponents/Title.jsx",
    "./src/components/CreateTask/MiniComponents/Priority.jsx",
    "./src/components/CreateTask/MiniComponents/Status.jsx",
    "./src/components/Cards/Cards.jsx",
    "./src/components/Cards/TaskCard.jsx",
    "./src/components/Cards/TaskColumn.jsx",
    "./src/components/Cards/OpenCards/OpenCard.jsx",
    "./src/components/Cards/OpenCards/CardDescription.jsx",
    "./src/components/Cards/OpenCards/TaskDetails.jsx",
    "./src/components/Cards/OpenCards/Comments.jsx",
  ],
  theme: {
    extend: {
      fontWeight: {
        'custom-350': 350,
      }
    },
  },
  plugins: [],
}

