import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaMoneyBill, FaPencilAlt, FaSave, FaFileDownload, FaCalendarAlt } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./EmployeeDashboard.css";

const employeesData = [
  {
    id: "EMP123",
    name: "John Doe",
    department: "Software Development",
    role: "Frontend Developer",
    email: "johndoe@example.com",
    contact: "+1234567890",
    salary: 75000,
    attendance: "Present",
    performance: 4.5,
  },
  {
    id: "EMP456",
    name: "Alice Smith",
    department: "Human Resources",
    role: "HR Manager",
    email: "alice@example.com",
    contact: "+9876543210",
    salary: 82000,
    attendance: "Absent",
    performance: 4.8,
  },
  {
    id: "EMP789",
    name: "Michael Johnson",
    department: "IT Support",
    role: "System Administrator",
    email: "michael@example.com",
    contact: "+1122334455",
    salary: 68000,
    attendance: "Present",
    performance: 4.2,
  },
];

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState(employeesData[0]);
  const [showSalary, setShowSalary] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({ ...selectedEmployee });
  const [leaveStatus, setLeaveStatus] = useState("Not Applied");
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // Generate random performance data
    setPerformanceData(employees.map(() => Math.floor(Math.random() * 100) + 1));
  }, [selectedEmployee]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedEmployee({ ...selectedEmployee });
  };

  const handleSave = () => {
    setEmployees(
      employees.map((emp) =>
        emp.id === editedEmployee.id ? { ...editedEmployee } : emp
      )
    );
    setSelectedEmployee({ ...editedEmployee });
    setIsEditing(false);
  };

  const applyLeave = () => {
    setLeaveStatus("Applied");
    setTimeout(() => {
      setLeaveStatus("Approved");
    }, 2000);
  };

  const downloadPayslip = () => {
    const bonus = selectedEmployee.salary * (selectedEmployee.performance / 100);
    const totalPay = selectedEmployee.salary + bonus;
    const payslipContent = `
      Employee Payslip
      ------------------------
      Name: ${selectedEmployee.name}
      Employee ID: ${selectedEmployee.id}
      Department: ${selectedEmployee.department}
      Role: ${selectedEmployee.role}
      Monthly Salary: $${selectedEmployee.salary}
      Performance Bonus: $${bonus.toFixed(2)}
      Total Pay: $${totalPay.toFixed(2)}

      Payment Date: ${new Date().toLocaleDateString()}
      Status: Processed
    `;
    const blob = new Blob([payslipContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Payslip_${selectedEmployee.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h2 className="dashboard-title">Employee Dashboard</h2>
        <Link to="/" className="logout-btn">Logout</Link>
      </div>

      <select
        onChange={(e) => setSelectedEmployee(employees.find(emp => emp.id === e.target.value))}
        value={selectedEmployee.id}
        className="select-dropdown"
      >
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>{emp.name}</option>
        ))}
      </select>

      <div className="employee-card">
        {isEditing ? (
          <>
            <input type="text" value={editedEmployee.name} onChange={(e) => setEditedEmployee({ ...editedEmployee, name: e.target.value })} />
            <input type="text" value={editedEmployee.department} onChange={(e) => setEditedEmployee({ ...editedEmployee, department: e.target.value })} />
            <input type="text" value={editedEmployee.role} onChange={(e) => setEditedEmployee({ ...editedEmployee, role: e.target.value })} />
            <input type="email" value={editedEmployee.email} onChange={(e) => setEditedEmployee({ ...editedEmployee, email: e.target.value })} />
            <input type="tel" value={editedEmployee.contact} onChange={(e) => setEditedEmployee({ ...editedEmployee, contact: e.target.value })} />
            <button className="update-btn" onClick={handleSave}><FaSave /> Save Changes</button>
          </>
        ) : (
          <>
            <h3><FaUser /> {selectedEmployee.name}</h3>
            <p><strong>ID:</strong> {selectedEmployee.id}</p>
            <p><FaBuilding /> <strong>Department:</strong> {selectedEmployee.department}</p>
            <p><strong>Role:</strong> {selectedEmployee.role}</p>
            <p><FaEnvelope /> <strong>Email:</strong> {selectedEmployee.email}</p>
            <p><FaPhone /> <strong>Contact:</strong> {selectedEmployee.contact}</p>
            <p><strong>Performance:</strong> ⭐ {selectedEmployee.performance}/5</p>
            <button className="edit-btn" onClick={handleEdit}><FaPencilAlt /> Edit Employee</button>
          </>
        )}
      </div>

      <button onClick={() => setShowSalary(!showSalary)} className="primary-btn">
        {showSalary ? "Hide Salary" : "View Salary"}
      </button>
      {showSalary && <p className="salary-text"><FaMoneyBill /> 💰 Monthly Salary: ${selectedEmployee.salary}</p>}

      <button onClick={applyLeave} className="leave-btn"><FaCalendarAlt /> Apply for Leave</button>
      <p className="leave-status">Leave Status: {leaveStatus}</p>

      <button onClick={downloadPayslip} className="download-btn"><FaFileDownload /> Download Payslip</button>

      <div className="chart-container">
        <h3>Performance Overview</h3>
        <Bar
          data={{
            labels: employees.map(emp => emp.name),
            datasets: [{
              label: "Performance Score",
              data: performanceData,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            }],
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
