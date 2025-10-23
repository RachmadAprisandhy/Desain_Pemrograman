import express from "express";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "kosthub_db",
  password: "postgres",
  port: 5432,
});

pool.connect()
  .then(() => console.log("✅ Terhubung ke PostgreSQL"))
  .catch(err => console.error("❌ Gagal konek ke database", err));

app.post("/api/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log("📩 Data register diterima:", req.body);

  if (!username || !email || !password || !role) {
    return res.status(400).json({ success: false, message: "Semua kolom wajib diisi" });
  }

  try {
    const check = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Email atau username sudah terdaftar" });
    }

    let role_id;
    if (role === "admin") role_id = 1;
    else if (role === "pemilik") role_id = 2;
    else role_id = 3;

    await pool.query(
      `INSERT INTO users (username, email, password, role_id, status)
       VALUES ($1, $2, $3, $4, $5)`,
      [username, email, password, role_id, "aktif"]
    );

    console.log("✅ User baru berhasil ditambahkan:", username);
    res.json({ success: true, message: "Registrasi berhasil! Silakan login." });
  } catch (err) {
    console.error("❌ Gagal register:", err);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🧩 Login attempt:", email, password);
  try {
    const result = await pool.query(
      `SELECT u.id, u.username, u.email, u.role_id, r.name AS role, u.status
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE (u.email = $1 OR u.username = $1) AND u.password = $2`,
      [email, password]
    );

    console.log("🧠 Query result:", result.rows);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Email/username atau password salah" });
    }

    const user = result.rows[0];
    res.json({
      success: true,
      message: "Login berhasil",
      username: user.username,
      role: user.role,
      role_id: user.role_id
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.id, 
        u.username, 
        u.email, 
        r.name AS role, 
        u.status
      FROM users u
      JOIN roles r ON u.role_id = r.id
      ORDER BY u.id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Gagal ambil data user:", err);
    res.status(500).json({ message: "Gagal mengambil data user" });
  }
});

app.listen(port, () => console.log(`🚀 Server berjalan di http://localhost:${port}`));
