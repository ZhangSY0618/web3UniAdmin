// 导入 React 和 useState 钩子，用于管理组件的状态（比如输入框的值）
import React, { useState } from 'react';
// 导入 react-router-dom 的钩子，用于页面导航和获取当前路由信息
import { useNavigate, useLocation } from 'react-router-dom';
// 导入 MUI 组件，用于构建登录页面的 UI
import { Box, TextField, Button, Typography, Paper, Fade } from '@mui/material';
// 导入 SCSS 文件，用于添加 Web3 风格的动画背景（比如网格动画）
import './Login.scss';

// 定义 Login 组件，使用 React.FC 类型（函数组件），表示这是一个 React 组件
const Login: React.FC = () => {
  // useNavigate 钩子，用于在代码中跳转页面，比如登录成功后跳转
  const navigate = useNavigate();
  // useLocation 钩子，用于获取当前路由信息，比如用户从哪个页面来的
  const location = useLocation();
  // useState 钩子，管理 userName 输入框的值，初始为空字符串
  const [email, setUserName] = useState('');
  // useState 钩子，管理 password 输入框的值，初始为空字符串
  const [password, setPassword] = useState('');
  // useState 钩子，管理错误提示信息，初始为空字符串
  const [error, setError] = useState('');

  // 表单提交处理函数，处理登录逻辑
  const handleSubmit = (e: React.FormEvent) => {
    // 阻止表单默认提交行为（比如刷新页面）
    e.preventDefault();
    // 模拟登录验证（这里是假数据，实际项目中需要替换为真实的 API 调用）
    if (email === 'user123' && password === 'password123') {
      // 如果验证成功，将 token 存入 localStorage，用于 ProtectedRoute 验证
      localStorage.setItem('authToken', 'mock-token');
      // 获取用户来源页面（如果没有就默认跳转到首页 '/'）
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
      // 跳转到来源页面，replace: true 表示不保留当前页面历史记录
      navigate(from, { replace: true });
    } else {
      // 如果验证失败，显示错误提示
      setError('Invalid email or password');
    }
  };

  return (
    // Box 是 MUI 的布局组件，相当于一个 div，但可以方便地添加样式
    // 这里用它作为整个页面的容器，设置了 Tailwind 样式：
    // - min-h-screen: 让页面至少占满屏幕高度
    // - flex items-center justify-center: 让内容垂直和水平居中
    // - bg-gradient-to-br: 设置从左上到右下的渐变背景（深灰到蓝紫色，符合 Web3 风格）
    // - login-container: 自定义类名，用于 Login.scss 添加动画网格背景
    <Box className="login-container min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Fade 是 MUI 的动画组件，用于让子元素（登录表单）淡入显示
          - in: 设置为 true，表示显示动画
          - timeout={1000}: 动画持续 1 秒 */}
      <Fade in timeout={1000}>
        {/* Paper 是 MUI 的卡片组件，带阴影和背景，用于创建登录表单的背景面板
            - elevation={10}: 设置阴影深度，值越大阴影越明显
            - Tailwind 样式:
              - p-8: 内边距 8（32px）
              - rounded-2xl: 圆角（较大）
              - bg-gray-800 bg-opacity-80: 深灰色背景，80% 透明度，制造毛玻璃效果
              - max-w-md w-full mx-4: 最大宽度为 md（中等），占满父容器宽度，水平外边距 4
            - sx: MUI 的样式属性，这里设置了 backdropFilter: 'blur(10px)'，增强毛玻璃效果 */}
        <Paper
          elevation={10}
          className="p-8 rounded-2xl bg-gray-800 bg-opacity-80 max-w-md w-full mx-4"
          sx={{ backdropFilter: 'blur(10px)' }}
        >
          {/* Typography 是 MUI 的文本组件，用于显示标题或段落
              - variant="h4": 设置为大标题样式（类似 HTML 的 h4）
              - Tailwind 样式:
                - text-center: 文本居中
                - text-cyan-400: 青色字体（Web3 风格）
                - font-bold: 加粗
                - mb-6: 下外边距 6（24px） */}
          <Typography variant="h4" className="text-center text-cyan-400 font-bold mb-6">
            Web3 Portal Login
          </Typography>
          {/* 表单元素，用于收集用户输入（email 和 password）
              - onSubmit={handleSubmit}: 提交时调用 handleSubmit 函数
              - Tailwind 样式:
                - space-y-6: 表单元素之间垂直间距 6（24px）
                - mx-auto max-w-xs: 水平居中，最大宽度 xs（较小），确保输入框宽度适中 */}
          <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-[520px]">
            {/* TextField 是 MUI 的输入框组件，用于收集用户输入
                - fullWidth: 占满父容器宽度
                - label="Email": 输入框的标签，显示为 "Email"
                - variant="outlined": 设置为带边框的样式（MUI 有三种样式：outlined, filled, standard）
                - value={email}: 绑定输入值到 email 状态
                - onChange: 更新 email 状态
                - InputProps: 设置输入框的样式
                  - backgroundColor: '#374151'（深灰色，Tailwind gray-700）
                  - color: '#e2e8f0'（浅灰色，Tailwind slate-200）
                - InputLabelProps: 设置标签的样式
                  - color: '#94a3b8'（中灰色，Tailwind slate-400） */}
            <TextField
              fullWidth
              label="UserName"
              variant="outlined"
              value={email}
              onChange={(e) => setUserName(e.target.value)}
              InputProps={{
                style: { backgroundColor: '#374151', color: '#e2e8f0', paddingLeft: '20px', paddingRight: '20px' },
              }}
              InputLabelProps={{ style: { color: '#94a3b8'} }} // Tailwind slate-400
              sx={{ '& .MuiOutlinedInput-root': { minHeight: '48px', padding: '8px' } }}
            />
            {/* TextField 组件，用于输入密码
                - type="password": 设置为密码类型，输入时显示为掩码（小圆点）
                - 其他属性同上 */}
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { backgroundColor: '#374151', color: '#e2e8f0', paddingLeft: '20px', paddingRight: '20px' },
              }}
              InputLabelProps={{ style: { color: '#94a3b8', } }}
              sx={{ '& .MuiOutlinedInput-root': { minHeight: '48px', padding: '8px' } }}
           
            />
            {/* 如果有错误信息（error 不为空），显示错误提示
                - Typography 组件显示错误文本
                - color="error": 设置为 MUI 的错误颜色（红色）
                - className="text-center": 居中显示 */}
            {error && (
              <Typography color="error" className="text-center">
                {error}
              </Typography>
            )}
            {/* Button 是 MUI 的按钮组件，用于提交表单
                - fullWidth: 占满父容器宽度
                - variant="contained": 设置为填充样式（有背景颜色）
                - type="submit": 表单提交按钮
                - Tailwind 样式:
                  - bg-cyan-500: 青色背景
                  - hover:bg-cyan-600: 鼠标悬停时变成稍深的青色
                  - text-white: 白色文字
                  - font-bold: 加粗
                  - py-3: 垂直内边距 3（12px）
                  - rounded-lg: 圆角（较大）
                  - transition-all duration-300: 添加平滑过渡效果（300ms） */}
            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-all duration-300"
            >
              CONNECT111
            </Button>
          </form>
          {/* Typography 组件显示页脚文本
              - Tailwind 样式:
                - text-center: 居中
                - text-gray-400: 灰色文字
                - mt-4: 上外边距 4（16px） */}
          <Typography className="text-center text-gray-400 mt-4">
            Powered by Blockchain Technology
          </Typography>
        </Paper>
      </Fade>
    </Box>
  );
};

// 导出 Login 组件，以便在 router.tsx 中使用
export default Login;