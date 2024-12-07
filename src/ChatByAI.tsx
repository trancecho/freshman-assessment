//ChatByAI.tsx
import  { useState } from 'react';


const ChatByAI = () => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [input, setInput] = useState<string>('');

  // 处理用户输入并获取AI的回复
  const handleSendMessage = async () => {
    if (!input.trim()) return;  // 确保用户输入不为空

    // 发送用户输入消息到聊天记录
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');

    // 请求AI的回复
    const response = await fetch('http://localhost:5000/get-answer', {  // 替换为你的实际后端 API 地址
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input })
    });

    const data = await response.json();
    const aiMessage = data.answer || '抱歉，我没有理解您的问题。';

    // 更新聊天记录，显示AI的回复
    setMessages([...messages, { sender: 'user', text: input }, { sender: 'ai', text: aiMessage }]);
  };

  return (
    <div style={{ width: '400px', height: '700px', border: '1px solid #ddd', padding: '10px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px', textAlign: message.sender === 'user' ? 'right' : 'left' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: '10px',
              backgroundColor: message.sender === 'user' ? '#007BFF' : '#f4f4f4',
              color: message.sender === 'user' ? '#fff' : '#000',
            }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="请输入您的问题"
        style={{ padding: '10px', borderRadius: '5px', marginBottom: '10px', border: '1px solid #ddd' ,color:'white'}}
      />
      <button onClick={handleSendMessage} style={{
        padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
      }}>
        发送
      </button>
    </div>
  );
};

export default ChatByAI;
