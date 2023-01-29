import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom'
import { WALL } from '../utils/path';
import { privateRoutes, publicRoutes } from '../utils/routes';

export const AppRouter = () => {
  const {isAuth} = useSelector(state => state.user);
  
  return (
    <Routes>
      {isAuth && privateRoutes.map(({path, Component}) =>
        <Route path={path} key={path} element={<Component />} />  
      )}
      {publicRoutes.map(({path, Component}) =>
        <Route path={path} key={path} element={<Component />} />  
      )}
      <Route path='*' element={<Navigate to={WALL} />} />
    </Routes>
  )
}
