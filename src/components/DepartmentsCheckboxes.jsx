import React, { useState } from 'react';
import useFetchPost from '../hooks/useFetchPost';
import DepartmentsCheckboxes from './DepartmentsCheckboxes';

const AddEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        name: "",
        surname: "",
        avatar: "",
        department_id: 1,
    });

    const { data, error, loading, postData } = useFetchPost("employees", employeeData);

    const validateData = (data) => {
        if (typeof data.name !== "string" || !data.name.trim() || data.name.length < 2 || data.name.length > 255) return false;
        if (typeof data.surname !== "string" || !data.surname.trim() || data.surname.length < 2 || data.surname.length > 255) return false;
        if (typeof data.avatar !== "string" || !data.avatar.trim()) return false;
        if (typeof data.department_id !== "number" || isNaN(data.department_id)) return false;
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateData(employeeData)) {
            postData();
        }
    };

    const isFormValid = validateData(employeeData);

    return (
        <div>
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={employeeData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Surname:</label>
                    <input
                        type="text"
                        name="surname"
                        value={employeeData.surname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Avatar URL:</label>
                    <input
                        type="text"
                        name="avatar"
                        value={employeeData.avatar}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Departments:</label>
                </div>
                <button type="submit" disabled={!isFormValid}>Add Employee</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {data && (
                <div>
                    <h3>Employee Added:</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default AddEmployee;
