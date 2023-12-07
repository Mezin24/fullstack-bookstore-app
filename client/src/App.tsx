import { Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Details, Home } from './pages';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Details />} />
        <Route path='/*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
};
export default App;
