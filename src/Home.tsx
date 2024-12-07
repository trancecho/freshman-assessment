// src/Home.tsx
import { Link } from 'react-router-dom';
import './Home.css';  // 引入 CSS 文件


const Home = () => (
  <div>
    <h1>杭电学习指南</h1>
    <Link to="/customer-service">
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: '2px solid transparent',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',  // 平滑过渡所有变化
        }}
      >
        ~客服~
      </button>
    </Link>
  </div>
);

export default Home;
