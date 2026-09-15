const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { Docxtemplater } = require('docxtemplater');
const { JSZip } = require('jszip');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dataEntryDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Form Schema
const FormSchema = new mongoose.Schema({
  data: Object,
  template: Buffer, // Store uploaded .docx as binary
});
const Form = mongoose.model('Form', FormSchema);

// Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
app.post('/upload-template', upload.single('template'), async (req, res) => {
  const form = new Form({
    data: req.body.data,
    template: req.file.buffer,
  });
  await form.save();
  res.status(200).send('Template uploaded');
});

app.post('/generate-doc', async (req, res) => {
  const form = await Form.findById(req.body.formId);
  const templateBuffer = form.template;

  const zip = new JSZip();
  await zip.loadAsync(templateBuffer);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

  doc.setData(form.data);
  doc.render();
  const out = await doc.getZip().generateAsync({ type: 'nodebuffer' });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', 'attachment; filename="filled_template.docx"');
  res.send(out);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
