import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { FaSignOutAlt, FaTrash, FaCheck, FaTimes, FaChartLine, FaUpload, FaUserPlus, FaEdit, FaComments } from "react-icons/fa";
import "./AdminDashboard.css";
import "chart.js/auto";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("loggedInAdmin"));

  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", role: "Software Engineer", department: "Software", attendance: "Absent", performance: Math.random() * 100, payslip: "Not Uploaded", feedback: "" },
    { id: 2, name: "Alice Smith", role: "HR Manager", department: "HR", attendance: "Absent", performance: Math.random() * 100, payslip: "Not Uploaded", feedback: "" },
    { id: 3, name: "Bob Johnson", role: "Marketing Manager", department: "Marketing", attendance: "Absent", performance: Math.random() * 100, payslip: "Not Uploaded", feedback: "" }
  ]);

  const [newEmployee, setNewEmployee] = useState({ name: "", role: "", department: "" });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    if (!admin) navigate("/");
  }, [admin, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    navigate("/");
  };

  const addEmployee = () => {
    if (newEmployee.name.trim() && newEmployee.role.trim() && newEmployee.department.trim()) {
      setEmployees([...employees, { 
        id: Date.now(), 
        ...newEmployee, 
        attendance: "Absent", 
        performance: Math.random() * 100, 
        payslip: "Not Uploaded", 
        feedback: "" 
      }]);
      setNewEmployee({ name: "", role: "", department: "" });
    }
  };

  const removeEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const markAttendance = (id, status) => {
    setEmployees(employees.map((emp) => (emp.id === id ? { ...emp, attendance: status } : emp)));
  };

  const uploadPayslip = (id) => {
    setEmployees(employees.map((emp) => (emp.id === id ? { ...emp, payslip: "Uploaded" } : emp)));
  };

  const updateEmployeeDetails = (id) => {
    setEmployees(employees.map((emp) => (emp.id === id ? editingEmployee : emp)));
    setEditingEmployee(null);
  };

  const submitFeedback = (id) => {
    setEmployees(employees.map((emp) => (emp.id === id ? { ...emp, feedback: feedback[id] || "" } : emp)));
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt style={{ marginRight: "5px" }} /> Logout
          </button>
        </div>

        <h3 className="section-title">Manage Employees</h3>
        <div className="employee-list">
          {employees.map((emp) => (
            <div key={emp.id} className="employee-card">
              {editingEmployee?.id === emp.id ? (
                <>
                  <input type="text" value={editingEmployee.name} onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })} />
                  <input type="text" value={editingEmployee.role} onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value })} />
                  <input type="text" value={editingEmployee.department} onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })} />
                  <button onClick={() => updateEmployeeDetails(emp.id)} className="save-btn">
                    <FaCheck /> Save
                  </button>
                </>
              ) : (
                <>
                  <p><strong>{emp.name}</strong> - {emp.role} ({emp.department})</p>
                  <p>Attendance: <span>{emp.attendance}</span></p>
                  <p>Performance: <span>{emp.performance.toFixed(2)}%</span></p>
                  <p>Payslip: <span>{emp.payslip}</span></p>
                  <p>Feedback: <span>{emp.feedback || "No feedback"}</span></p>
                  <div className="action-buttons">
                    <button onClick={() => removeEmployee(emp.id)} className="remove-btn">
                      <FaTrash /> Remove
                    </button>
                    <button onClick={() => markAttendance(emp.id, "Present")} className="present-btn">
                      <FaCheck /> Present
                    </button>
                    <button onClick={() => markAttendance(emp.id, "Absent")} className="absent-btn">
                      <FaTimes /> Absent
                    </button>
                    <button onClick={() => uploadPayslip(emp.id)} className="upload-btn">
                      <FaUpload /> Upload Payslip
                    </button>
                    <button onClick={() => setEditingEmployee(emp)} className="edit-btn">
                      <FaEdit /> Edit
                    </button>
                  </div>
                  <div className="feedback-section">
                    <input type="text" placeholder="Enter feedback" value={feedback[emp.id] || ""} onChange={(e) => setFeedback({ ...feedback, [emp.id]: e.target.value })} />
                    <button onClick={() => submitFeedback(emp.id)} className="feedback-btn">
                      <FaComments /> Submit Feedback
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <h3 className="section-title">Add New Employee</h3>
        <div className="add-employee-form">
          <input type="text" placeholder="Name" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
          <input type="text" placeholder="Role" value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} />
          <input type="text" placeholder="Department" value={newEmployee.department} onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })} />
          <button onClick={addEmployee} className="add-employee-button">
            <FaUserPlus style={{ marginRight: "5px" }} /> Add Employee
          </button>
        </div>

        <h3 className="section-title">Performance Tracking</h3>
        <div className="performance-chart">
          <Bar
            data={{
              labels: employees.map(emp => emp.name),
              datasets: [{
                label: "Performance (%)",
                data: employees.map(emp => emp.performance),
                backgroundColor: "rgba(54, 162, 235, 0.5)",
              }]
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
