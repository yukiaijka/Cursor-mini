import React from 'react';
import './ChatInput.css';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isProcessing: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  value, 
  onChange, 
  onSend, 
  isProcessing, 
  placeholder 
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isProcessing && value.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className="chat-input-container">
      <label htmlFor="chat-input" className="chat-input-label">
        修正の指示
      </label>
      <div className="chat-input-wrapper">
        <textarea
          id="chat-input"
          className="chat-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          rows={3}
          disabled={isProcessing}
          aria-describedby="chat-input-help"
        />
        <button
          className="chat-send-button"
          onClick={onSend}
          disabled={isProcessing || !value.trim()}
          aria-label="修正を実行"
        >
          {isProcessing ? (
            <span className="loading-spinner">処理中...</span>
          ) : (
            '修正実行'
          )}
        </button>
      </div>
      <div id="chat-input-help" className="chat-input-help">
        Enterキーで送信できます。例：「誤字を修正して」「文体を丁寧語に変更して」
      </div>
    </div>
  );
};

export default ChatInput; 