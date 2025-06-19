import React from 'react';
import './TextOutput.css';

interface TextOutputProps {
  text: string;
  isProcessing: boolean;
}

const TextOutput: React.FC<TextOutputProps> = ({ text, isProcessing }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      // TODO: コピー成功の通知を表示
      console.log('テキストをコピーしました');
    } catch (error) {
      console.error('コピーに失敗しました:', error);
      // フォールバック: 古いブラウザ対応
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="text-output-container">
      <div className="text-output-header">
        <label className="text-output-label">修正結果</label>
        {text && (
          <button
            className="copy-button"
            onClick={handleCopy}
            disabled={isProcessing}
            aria-label="修正結果をコピー"
          >
            コピー
          </button>
        )}
      </div>
      
      <div className="text-output-content">
        {isProcessing ? (
          <div className="processing-indicator">
            <div className="processing-spinner"></div>
            <p>AIが文章を修正中です...</p>
          </div>
        ) : text ? (
          <div className="text-output-text">
            {text}
          </div>
        ) : (
          <div className="text-output-placeholder">
            修正結果がここに表示されます
          </div>
        )}
      </div>
    </div>
  );
};

export default TextOutput; 