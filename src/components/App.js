import React from 'react';
import './App.css';
import Main from './main/Main';
import api from '../utils/Api';
import InfoPage from './InfoPage/InfoPage';
import PageNotFound from './pageNotFound/PageNotFound';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {

  const [resorts, setResorts] = React.useState([]);

  React.useEffect(() => {
    api.getResorts(1)
      .then((res) => {setResorts(res.data)})
  }, [])


  return (
    <div className="App">
        <Routes>
          <Route exact path='/skimon/' element={<Main resorts={resorts}/>}/>

          <Route path='/skimon/:id' element={<InfoPage resorts={resorts}/>}/>

          <Route path='/404' element={<PageNotFound />}/>

          <Route path='*' element={<Navigate replace to='/404' />}/>
        </Routes>
    </div>
  );
}

export default App;
