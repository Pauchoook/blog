import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './app.scss';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/Navbar';
import { check } from './store/reducers/actionsUser';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(check());
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
