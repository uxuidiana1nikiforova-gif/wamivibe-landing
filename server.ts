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

  // Dynamic Meta Tags for SEO/Social Media
  const serveIndex = async (req: express.Request, res: express.Response) => {
    const url = req.url;
    const lang = url.startsWith("/uk") ? "uk" : url.startsWith("/de") ? "de" : "en";
    
    const translations = {
      en: {
        title: "WAMI | Vibe Coding with Senior Oversight",
        description: "High-speed development with expert quality control. We build your ideas into production-ready apps at the speed of thought.",
      },
      uk: {
        title: "WAMI | Vibe Coding з сеньорною підтримкою",
        description: "Швидка розробка з експертним контролем якості. Перетворюємо ваші ідеї на готові продукти зі швидкістю думки.",
      },
      de: {
        title: "WAMI | Vibe Coding mit Senior-Betreuung",
        description: "Hochgeschwindigkeitsentwicklung mit Experten-Qualitätskontrolle. Wir verwandeln Ihre Ideen in produktionsreife Apps in Lichtgeschwindigkeit.",
      }
    };

    const t = translations[lang] || translations.en;
    const appUrl = process.env.APP_URL || `https://${req.get('host')}`;

    try {
      const fs = await import("fs/promises");
      const indexPath = process.env.NODE_ENV === "production" 
        ? path.join(process.cwd(), "dist", "index.html")
        : path.join(process.cwd(), "index.html");
      
      let html = await fs.readFile(indexPath, "utf-8");
      
      // If in dev mode, let Vite transform the HTML (inject scripts, etc.)
      if (process.env.NODE_ENV !== "production" && (global as any).viteServer) {
        html = await (global as any).viteServer.transformIndexHtml(url, html);
      }
      
      // Replace meta tags
      html = html.replace(/<title>.*?<\/title>/, `<title>${t.title}</title>`);
      html = html.replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${t.title}" />`);
      html = html.replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${t.description}" />`);
      html = html.replace(/<meta property="twitter:title" content=".*?" \/>/g, `<meta property="twitter:title" content="${t.title}" />`);
      html = html.replace(/<meta property="twitter:description" content=".*?" \/>/g, `<meta property="twitter:description" content="${t.description}" />`);
      html = html.replace(/<meta name="description" content=".*?" \/>/g, `<meta name="description" content="${t.description}" />`);
      
      // Update URLs
      html = html.replace(/property="og:url" content=".*?"/g, `property="og:url" content="${appUrl}${url}"`);
      html = html.replace(/property="twitter:url" content=".*?"/g, `property="twitter:url" content="${appUrl}${url}"`);
      html = html.replace(/property="og:image" content=".*?"/g, `property="og:image" content="${appUrl}/og-image.svg"`);
      html = html.replace(/property="twitter:image" content=".*?"/g, `property="twitter:image" content="${appUrl}/og-image.svg"`);

      res.set('Content-Type', 'text/html').send(html);
    } catch (err) {
      console.error("Error serving index.html:", err);
      res.status(500).send("Internal Server Error");
    }
  };

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Changed to custom to handle index.html manually
    });
    (global as any).viteServer = vite;
    app.use(vite.middlewares);
    
    app.get("*", async (req, res, next) => {
      if (req.url.includes('.') || req.url.startsWith('/api')) return next();
      await serveIndex(req, res);
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false })); // Disable default index serving
    app.get("*", serveIndex);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
