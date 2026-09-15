const express = require('express');
const router = express.Router();
const Form = require('../src/models/form');

router.post('/upload-template', (req, res) => {
  res.send('Template uploaded');
});

router.post('/generate-doc', async (req, res) => {
  const form = await Form.findById(req.body.formId);
  res.send('Document generated');
});

module.exports = router;
