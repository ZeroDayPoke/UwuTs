// ./src/components/CustomForm.tsx

import React, { useState } from 'react';

interface CustomFormProps {
  onSubmit: (value: string) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomForm;
