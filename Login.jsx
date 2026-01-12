import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    window.location.href = data.role === "admin" ? "/admin" : "/dashboard";
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📚 Library Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input style={styles.input} placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input style={styles.input} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button style={styles.button} onClick={login}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#fff",
    padding: 35,
    width: 340,
    borderRadius: 12,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14
  },
  button: {
    width: "100%",
    padding: 12,
    border: "none",
    borderRadius: 6,
    background: "#667eea",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer"
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center"
  }
};  