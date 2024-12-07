import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatByAI from './ChatByAI'; 

const CustomerService = () => {
  const [view, setView] = useState<'list' | 'detail' | 'phone' | 'help'>('list');
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();

  // 问题列表
  const questions = [
    { id: 1, title: '如何学习数学？', details: '找规律+勤动手+坚持' },
    { id: 2, title: '如何学习英语？', details: '词汇量+多读+多听+多说' },
    { id: 3, title: '如何学好编程？', details: '基础+实践+耐心解决问题+持续的学习与思考' },
    { id: 4, title: '如何过好自己的生活', details: '活在当下' }
  ];

  const handleButtonClick = (buttonType: string) => {
    if (buttonType === '主页') {
      setView('list');
      setSelectedQuestion(null); // 重置已选择的问题
    } else if (buttonType === '询问') {
      setView('phone');
      setContent('请联系客服电话:15934125523');
    } else if (buttonType === '获取更多帮助') {
      setView('help');
      setContent('欢迎加群交流！');
    }
  };

  const handleQuestionClick = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setSelectedQuestion(questionId);
      setContent(question.details); // 更新问题详情
      setView('detail'); // 切换到问题详情视图
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '50px' }}>
      <div
        style={{
          display: 'flex',               // 使用 flexbox 布局
          justifyContent: 'center',      // 水平居中
          alignItems: 'center',          // 垂直居中
          position: 'fixed',             // 固定位置
          top: '20px',                   // 距离顶部20px
          left: '50%',                   // 水平居中
          transform: 'translateX(-50%)', // 水平居中
          zIndex: 10,                    // 确保按钮在其他内容之上
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '200px',  // 固定宽度
            textAlign: 'center', // 文本居中
          }}
        >
          Back to Home
        </button>
      </div>


      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          paddingTop: '80px',  // 给顶部添加一些空间，避免被按钮遮挡
          paddingBottom: '50px',  // 留出底部空间
        }}
      >
        {/* 页面其他内容 */}


        <h1>祝你开心</h1>

        {/* 问题列表视图 */}
        {view === 'list' && (
          <div style={{
            padding: '20px',
            borderRadius: '10px',  // 圆角效果，使阴影更加柔和
            backgroundColor: '#fff',  // 背景颜色
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',  // 添加阴影效果，水平偏移、垂直偏移、模糊半径、颜色
            margin: '20px 0',  // 设置与其他元素之间的距离
          }}>
            <h2>问题列表</h2>
            <ul>
              {questions.map((question) => (
                <li key={question.id}>
                  <button
                    onClick={() => handleQuestionClick(question.id)}
                    style={{
                      padding: '10px',
                      margin: '5px 0',
                      background: '#f4f4f4',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    {question.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 问题详情视图 */}
        {view === 'detail' && selectedQuestion !== null && (
          <div>
            <h2>回答</h2>
            <p>{content}</p>
            <button
              onClick={() => {
                setSelectedQuestion(null);
                setView('list'); // 返回问题列表视图
              }}
              style={{ padding: '10px', marginTop: '20px', color: 'white' }}
            >
              返回问题列表
            </button>
          </div>
        )}

        {/* 客服电话视图 */}
        {view === 'phone' && (
           <ChatByAI />
        )}

        {/* 更多帮助视图 */}
        {view === 'help' && (
          <div>
            <h2>{content}</h2>
            <img
              src="/image.png"
              alt="Help Image"
              style={{
                width: '60%',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </div>
        )}
      </div>
      {/* 底部按钮区域 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          padding: '10px',
          background: 'transparent',
        }}
      >
        <button onClick={() => handleButtonClick('主页')} style={{ color: 'white' }}>主页</button>
        <button onClick={() => handleButtonClick('询问')} style={{ color: 'white' }}>询问</button>
        <button onClick={() => handleButtonClick('获取更多帮助')} style={{ color: 'white' }}>获取更多帮助</button>
      </div>
    </div>
  );
};

export default CustomerService;
