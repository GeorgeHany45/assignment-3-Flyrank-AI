const express = require("express");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");
const requireAuth = require("./middleware/auth");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.json({ message: "Auth API is running" });
});

app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(201).json({
    user: data.user,
  });
});
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({
      error: "Invalid login credentials",
    });
  }

  return res.status(200).json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
});
app.get("/public", (req, res) => {
  res.json({
    message: "This is a public route",
  });
});

app.get("/private", requireAuth, (req, res) => {
  res.json({
    message: "This is a private route",
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});
app.post("/auth/logout", async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(200).json({
    message: "Logged out successfully",
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Server running and connected to Supabase");
});