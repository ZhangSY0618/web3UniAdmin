import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#3b82f6' }, // Tailwind blue-500
    secondary: { main: '#10b981' }, // Tailwind green-500
    background: { default: '#f3f4f6' }, // Tailwind gray-100
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gray-100">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};
export default App;