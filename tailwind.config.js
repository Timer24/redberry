/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/Header/HeaderMain.jsx",
    "./src/app.jsx",
    "./src/components/Filters/Filters.jsx",
    "./src/components/Filters/DepartmentDropdown.jsx",
    "./src/components/Filters/PriorityDropdown.jsx",
    "./src/components/Filters/EmployeeDropdown.jsx",
    "./src/components/DepartmentsCheckboxes.jsx",
    "./src/components/Header/Buttons.jsx",
    "./src/components/CreateEmployee/Modal.jsx",
    "./src/components/CreateEmployee/ButtonsEmployees.jsx",
    "./src/components/CreateEmployee/Forms.jsx",
    "./src/components/CreateEmployee/FileUpload.jsx",
    "./src/components/CreateEmployee/EmployeeDepartment.jsx",
    "./src/components/CreateTask/CreateNewTask.jsx",
    "./src/components/CreateTask/SuccessPopup.jsx",
    "./src/components/CreateTask/TaskCreator.jsx",
    "./src/components/CreateTask/TaskForm.jsx",
    "./src/components/CreateTask/AssignmentSection.jsx",
    "./src/components/CreateTask/MiniComponents/AddTaskButton.jsx",
    "./src/components/CreateTask/MiniComponents/Deadline.jsx",
    "./src/components/CreateTask/MiniComponents/Department.jsx",
    "./src/components/CreateTask/MiniComponents/Description.jsx",
    "./src/components/CreateTask/MiniComponents/Employee.jsx",
    "./src/components/CreateTask/MiniComponents/Priority.jsx",
    "./src/components/CreateTask/MiniComponents/Status.jsx",
    "./src/components/CreateTask/MiniComponents/Title.jsx",
    "./src/components/Cards/Cards.jsx",
    "./src/components/Cards/TaskCard.jsx",
    "./src/components/Cards/TaskColumn.jsx",
    "./src/components/Cards/CardsInner/CardInner.jsx",
    "./src/components/Cards/CardsInner/CardDescription.jsx",
    "./src/components/Cards/CardsInner/TaskDetails.jsx",
    "./src/components/Cards/CardsInner/Comments.jsx",
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

