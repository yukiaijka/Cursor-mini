import { useState } from 'react';
import TextInput from './components/TextInput';
import ChatInput from './components/ChatInput';
import TextOutput from './components/TextOutput';
import { correctText } from './api/claude';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // テキスト修正処理
  const handleTextCorrection = async () => {
    if (!inputText.trim() || !chatMessage.trim()) {
      setError('テキストと指示を入力してください');
      return;
    }

    setIsProcessing(true);
    setError('');
    
    try {
      const response = await correctText({
        inputText: inputText.trim(),
        instruction: chatMessage.trim(),
      });

      if (response.error) {
        setError(response.error);
        setOutputText('');
      } else {
        setOutputText(response.correctedText);
      }
    } catch (error) {
      console.error('テキスト修正エラー:', error);
      setError('テキストの修正中にエラーが発生しました');
      setOutputText('');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Cursor mini</h1>
        <p>AIを活用した文章修正アプリ</p>
      </header>
      
      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="input-section">
          <TextInput 
            value={inputText}
            onChange={setInputText}
            placeholder="修正したいテキストを入力してください..."
          />
          
          <ChatInput 
            value={chatMessage}
            onChange={setChatMessage}
            onSend={handleTextCorrection}
            isProcessing={isProcessing}
            placeholder="修正の指示を入力してください..."
          />
        </div>
        
        <div className="output-section">
          <TextOutput 
            text={outputText}
            isProcessing={isProcessing}
          />
        </div>
      </main>
    </div>
  );
}

export default App; 