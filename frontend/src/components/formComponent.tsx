import React, { useState } from 'react';

import { AircraftFormData } from '../types/form';

interface FormProps {
    formData: AircraftFormData;
    setFormData: React.Dispatch<React.SetStateAction<AircraftFormData>>;
  onSubmit: (data: AircraftFormData) => void;
}

const FormComponent: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<AircraftFormData>({
    type_: '',
    register: '',
    serial_no: 0,
    base: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Aircraft Type</label>
        <input
          type="text"
          name="type_"
          value={formData.type_}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Aircraft Registration</label>
        <input
          type="text"
          name="register"
          value={formData.register}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Aircraft Serial Number</label>
        <input
          type="number"
          name="serial_no"
          value={formData.serial_no}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Aircraft Base</label>
        <input
          type="text"
          name="base"
          value={formData.base}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
