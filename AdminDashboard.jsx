import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const headers = { Authorization: "Bearer " + localStorage.getItem("token") };

  useEffect(() => {
    fetch("http://localhost:5000/api/books", { headers })
      .then(r => r.json())
      .then(setBooks);

    fetch("http://localhost:5000/api/requests", { headers })
      .then(r => r.json())
      .then(setRequests);
  }, []);

  const addBook = async () => {
    await fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ title, author })
    });
    window.location.reload();
  };

  const issueBook = async (id) => {
    await fetch(`http://localhost:5000/api/requests/${id}/issue`, {
      method: "PUT",
      headers
    });
    window.location.reload();
  };

  return (
    <div style={styles.page}>
      <h2>Admin Dashboard</h2>

      <h3>Add Book</h3>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Author" onChange={e => setAuthor(e.target.value)} />
      <button onClick={addBook}>Add</button>

      <h3 style={{ marginTop: 30 }}>Book Requests</h3>
      {requests.map(r => (
        <div key={r._id} style={styles.card}>
          {r.bookId.title} — {r.userId.email}
          {r.status === "requested"
            ? <button onClick={() => issueBook(r._id)}>Issue</button>
            : <span>Issued</span>}
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: { padding: 40, background: "#eef2f7", minHeight: "100vh" },
  card: { background: "#fff", padding: 15, marginBottom: 10, borderRadius: 6, display: "flex", justifyContent: "space-between" }
};
