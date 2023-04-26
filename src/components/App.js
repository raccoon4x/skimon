import React from 'react';
import './App.css';
import Main from './main/Main';
import api from '../utils/Api';
import InfoPage from './InfoPage/InfoPage';
import PageNotFound from './pageNotFound/PageNotFound';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {

  const [clusters, setClusters] = React.useState([]);
  React.useEffect(() => {
    api.getRegions()
      .then((res) => {setClusters(res.data)})
  }, [])

  const [currentCluster, setCurrentCluster] = React.useState({
    id: '',
    name: ''
  });

  function handleClusterChange(e) {
    
    setCurrentCluster({
      id: e.target.id,
      name: e.target.title
    })
    console.dir(e.target.title)
  }

  const [resorts, setResorts] = React.useState([]);

  React.useEffect(() => {
    api.getResorts(currentCluster.id)
      .then((res) => {setResorts(res.data)})
  }, [currentCluster])


  return (
    <div className="App">
        <Routes>
          <Route exact path='/skimon/'
            element={<Main
            onClick={handleClusterChange}
            currentCluster={currentCluster}
            clusters={clusters}
            resorts={resorts}/>}/>

          <Route path='/skimon/:id'
          element={<InfoPage
          resorts={resorts}/>}/>

          <Route path='/404' element={<PageNotFound />}/>
          <Route path='*' element={<Navigate replace to='/404' />}/>
        </Routes>
    </div>
  );
}

export default App;
