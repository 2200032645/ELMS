import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const employees = [
  { id: "EMP123", name: "John Doe", password: "john123", department: "Software", role: "Developer", email: "johndoe@example.com", contact: "+1234567890", salary: 75000 },
  { id: "EMP456", name: "Alice Smith", password: "alice456", department: "HR", role: "HR Manager", email: "alice@example.com", contact: "+9876543210", salary: 85000 },
  { id: "EMP789", name: "Robert Brown", password: "robert789", department: "Finance", role: "Accountant", email: "robert@example.com", contact: "+5647382910", salary: 70000 },
];

const admin = { id: "ADMIN001", name: "Admin", password: "admin123" };

const Login = () => {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("employee");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userType === "employee") {
      const employee = employees.find(emp => emp.id === empId && emp.password === password);
      if (employee) {
        localStorage.setItem("loggedInEmployee", JSON.stringify(employee));
        navigate("/employee");
      } else {
        setError("Invalid Employee ID or Password!");
      }
    } else if (userType === "admin") {
      if (empId === admin.id && password === admin.password) {
        localStorage.setItem("loggedInAdmin", JSON.stringify(admin));
        navigate("/admin");
      } else {
        setError("Invalid Admin Credentials!");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.mainHeading}>Employee Management System</h1>
      <h2 style={styles.subHeading}>{userType === "employee" ? "Employee Login" : "Admin Login"}</h2>

      <div style={styles.toggleContainer}>
        <button onClick={() => setUserType("employee")} style={userType === "employee" ? styles.activeButton : styles.inactiveButton}>Employee</button>
        <button onClick={() => setUserType("admin")} style={userType === "admin" ? styles.activeButton : styles.inactiveButton}>Admin</button>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Employee ID</label>
        <input type="text" placeholder="Enter Employee ID" value={empId} onChange={(e) => setEmpId(e.target.value)} style={styles.input} />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Password</label>
        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
      </div>

      <button onClick={handleLogin} style={styles.button}>Login</button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

// Styles
const styles = {
  container: { textAlign: "center", padding: "30px", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", borderRadius: "10px", width: "400px", margin: "50px auto", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" },
  mainHeading: { fontSize: "24px", marginBottom: "10px", color: "#333" },
  subHeading: { fontSize: "20px", marginBottom: "20px", color: "#007BFF" },
  toggleContainer: { display: "flex", justifyContent: "center", marginBottom: "15px" },
  activeButton: { padding: "10px", margin: "5px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "0.3s" },
  inactiveButton: { padding: "10px", margin: "5px", backgroundColor: "#ccc", color: "black", border: "none", borderRadius: "5px", cursor: "pointer", transition: "0.3s" },
  formGroup: { textAlign: "left", marginBottom: "15px" },
  label: { display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "5px" },
  input: { width: "92%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" },
  button: { width: "100%", padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "0.3s" },
  buttonHover: { backgroundColor: "#0056b3" },
  error: { color: "red", marginTop: "10px" }
};

// Button Hover Effect
styles.button[":hover"] = styles.buttonHover;

export default Login;
