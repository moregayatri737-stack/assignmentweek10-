import { useEffect, useState } from "react";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  const headers = { Authorization: "Bearer " + token };

  useEffect(() => {
    fetch("http://localhost:5000/api/books", { headers })
      .then(r => r.json())
      .then(setBooks);

    fetch("http://localhost:5000/api/requests/my", { headers })
      .then(r => r.json())
      .then(setRequests);
  }, []);

  const requestBook = async (id) => {
    await fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: id })
    });
    window.location.reload();
  };

  return (
    <div style={styles.page}>
      <h2>User Dashboard</h2>

      <h3>Available Books</h3>
      {books.map(b => (
        <div key={b._id} style={styles.card}>
          <b>{b.title}</b> — {b.author}
          <button onClick={() => requestBook(b._id)}>Request</button>
        </div>
      ))}

      <h3 style={{ marginTop: 30 }}>My Requests</h3>
      {requests.map(r => (
        <div key={r._id} style={styles.card}>
          {r.bookId.title} — {r.status.toUpperCase()}
          {r.issueDate && <span> (Issued on {new Date(r.issueDate).toDateString()})</span>}
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: { padding: 40, background: "#f9fafb", minHeight: "100vh" },
  card: { background: "#fff", padding: 15, marginBottom: 10, borderRadius: 6, display: "flex", justifyContent: "space-between" }
};
