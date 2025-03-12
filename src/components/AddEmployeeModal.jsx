import React from 'react'

function AddEmployeeModal() {
  return (
        <button
            className="absolute top-2 right-2 text-xl font-bold text-gray-600"
            onClick={onClose}
        >
            ✖️
        </button>

        <div className = "flex justify-center">
            <h1 className = "font-[FiraGO] font-medium text-[32px] leading-[100%] tracking-[0%]">თანამშრომლის დამატება</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700" htmlFor="firstName">First Name</label>
            <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
            />
            {errors.firstName && <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>}
            </div>

            <div className="mb-4">
            <label className="block text-gray-700" htmlFor="lastName">Last Name</label>
            <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
            />
            {errors.lastName && <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>}
            </div>

            <div className="mb-4">
            <label className="block text-gray-700" htmlFor="avatar">Avatar</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
            />
            {errors.avatar && <div className="text-red-500 text-sm mt-1">{errors.avatar}</div>}
            {formData.avatar && (
                <div className="mt-2 flex items-center">
                <img
                    src={URL.createObjectURL(formData.avatar)}
                    alt="Avatar preview"
                    className="w-16 h-16 object-cover rounded-full mr-2"
                />
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: null })}
                    className="text-red-500 text-sm"
                >
                    Remove
                </button>
                </div>
            )}
            </div>

            <div className="mb-4">
            <label className="block text-gray-700" htmlFor="department">Department</label>
            <select
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
            >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
            </select>
            {errors.department && <div className="text-red-500 text-sm mt-1">{errors.department}</div>}
            </div>

            <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
            Submit
            </button>
        </form>
  )
}

export default AddEmployeeModal