import React, { useState, FocusEvent } from 'react';

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  html?: 'input' | 'textarea';
  type?: string;
  left?: string;
  values:string;
  onChange?: (name: string, value: string) => void;  
}

const Input: React.FC<InputProps> = ({ label, name, placeholder, required = false, html = 'input', onChange, type = 'text', left = "0px" ,values }) => {
  const [value, setValue] = useState<string>(values);
  const [error, setError] = useState<string>('');

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e);
    
    if (required && !value) {
      setError(`${label} bắt buộc phải nhập`);
    } else {
      setError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(name, newValue);  
    }
  };

  return (
    <div style={{ marginBottom: '1rem', marginTop: '10px', flex: "1", marginLeft: left }}>
      <label htmlFor={name} style={{ display: 'block', marginBottom: '0.5rem' }}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      {html === 'input' ? (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            border: `1px solid ${error ? 'red' : '#ccc'}`,
            padding: '0.5rem',
            borderRadius: '4px',
            width: '100%',
            height: '40px',
          }}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            border: `1px solid ${error ? 'red' : '#ccc'}`,
            padding: '0.5rem',
            borderRadius: '4px',
            width: '100%',
            height: '190px',
          }}
        />
      )}
      {error && <span style={{ color: 'red', fontSize: '0.875rem' }}>{error}</span>}
    </div>
  );
};

export default Input;
