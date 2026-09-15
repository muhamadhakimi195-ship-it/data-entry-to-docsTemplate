import React, { useState } from 'react';
import FormComponent from './components/formComponent';
import { AircraftFormData } from './types/form';

const App = () => {
  const [formData, setFormData] = useState<AircraftFormData>({ type_: '', register: '', serial_no: 0, base: '', date: '' });
  const [template, setTemplate] = useState<File | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (data: AircraftFormData) => {
    setSubmitMessage('Submitting...');
    const formDataToSend = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formDataToSend.append(key, String(value));
    });

    if (template) {
      formDataToSend.append('template', template);
    }

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      setSubmitMessage('Template uploaded successfully.');
    } catch (error) {
      console.error('Error uploading template:', error);
      setSubmitMessage('Submission failed. Start the backend and make sure MongoDB is running.');
    }
  };

  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setTemplate(file ?? null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Data Entry Form</h1>
        <FormComponent
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
        <p role="status">{submitMessage}</p>
        <input
          type="file"
          accept=".docx"
          onChange={handleTemplateUpload}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default App;
