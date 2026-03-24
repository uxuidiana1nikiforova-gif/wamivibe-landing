import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for contact form
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // SMTP Configuration
      const host = process.env.SMTP_HOST;
      const port = parseInt(process.env.SMTP_PORT || "587");
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      const from = process.env.SMTP_FROM || "WAMI Software <no-reply@wamisoftware.com>";
      const to = process.env.CONTACT_EMAIL || "diana1nikiforova@gmail.com";

      if (!host || !user || !pass) {
        console.warn("SMTP credentials missing. Form received but email not sent.");
        return res.status(200).json({ 
          success: true, 
          message: "Form received, but SMTP is not configured. Email not sent." 
        });
      }

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
          user,
          pass,
        },
      });

      await transporter.sendMail({
        from,
        to,
        subject: `New Project Request from ${name}`,
        text: `New Project Request\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
          <h3>New Project Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("SMTP error:", err);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
