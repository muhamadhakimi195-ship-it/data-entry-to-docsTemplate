import express from 'express';
import Form from '../models/form';
import { generateDocument } from '../services/docxService';

const router = express.Router();

router.post('/upload', async (req, res) => {
  const { data, template } = req.body;
  const form = new Form({ data, template });
  await form.save();
  res.status(200).send('Template uploaded');
});

router.post('/generate', async (req, res) => {
  const { formId } = req.body;
  const buffer = await generateDocument(formId);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', 'attachment; filename="filled_template.docx"');
  res.send(buffer);
});

export default router;
