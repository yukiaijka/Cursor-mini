import React from 'react';
import './TextInput.css';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="text-input-container">
      <label htmlFor="text-input" className="text-input-label">
        修正したいテキスト
      </label>
      <textarea
        id="text-input"
        className="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={8}
        aria-describedby="text-input-help"
      />
      <div id="text-input-help" className="text-input-help">
        修正したい文章を入力してください。長い文章でも対応できます。
      </div>
    </div>
  );
};

export default TextInput; 