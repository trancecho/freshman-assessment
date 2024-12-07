import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();  // 加载 .env 文件

const app = express();
const port = 5000;

const openaiApiKey = process.env.OPENAI_API_KEY;  // 从环境变量中获取密钥

app.use(bodyParser.json());
app.use(cors());  // 启用 CORS 以允许跨域请求

app.post('/get-answer', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: question }],
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = response.data.choices[0].message.content.trim();
    res.json({ answer });
  } catch (error) {
    console.error('Error in server:', error.response?.data || error.message);
    res.status(500).json({ answer: '抱歉，发生了错误。' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
