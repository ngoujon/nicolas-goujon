import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.SERVER_PORT || 3030;

app.use(cors({ origin: true }));
app.use(express.json());

const requiredEnv = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_EMAIL_TO', 'MAIL_FROM'];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
  console.warn(`[Contact API] Variables manquantes (emails désactivés): ${missing.join(', ')}`);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * POST /api/contact
 * Body: { name, email, message, subjects?: string[] }
 * - Envoie un email à CONTACT_EMAIL_TO (toi) avec le message
 * - Envoie un email de confirmation à l'expéditeur (email)
 */
app.post('/api/contact', async (req, res) => {
  if (missing.length) {
    return res.status(503).json({
      success: false,
      error: 'Service email non configuré (variables d’environnement manquantes).',
    });
  }

  const { name, email, message, subjects } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Champs requis : name, email, message.',
    });
  }

  const subjectsLine = Array.isArray(subjects) && subjects.length
    ? subjects.join(', ')
    : 'Contact depuis le site web';

  const contactBody = `
Nouveau message depuis le formulaire de contact

Sujets : ${subjectsLine}
Nom : ${name}
Email : ${email}

Message :
${message}
  `.trim();

  const confirmationBody = `
Bonjour ${name},

Nous avons bien reçu votre message envoyé depuis le formulaire de contact de Nicolas GOUJON.

Nous vous répondrons dans les meilleurs délais.

Copie de votre message :
---
Sujets : ${subjectsLine}

Message :
${message}
---

Cordialement,
Nicolas GOUJON - Développeur Web & Product Owner
  `.trim();

  try {
    const contactEmail = {
      from: process.env.MAIL_FROM,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `[Contact site] Message de ${name} - ${subjectsLine}`,
      text: contactBody,
    };

    const confirmationEmail = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Confirmation de réception de votre message - Nicolas GOUJON',
      text: confirmationBody,
    };

    await transporter.sendMail(contactEmail);
    await transporter.sendMail(confirmationEmail);

    return res.json({ success: true });
  } catch (err) {
    console.error('[Contact API] Erreur envoi email:', err);
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de l’envoi du message. Réessayez plus tard.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`[Contact API] Serveur démarré sur le port ${PORT}`);
});
