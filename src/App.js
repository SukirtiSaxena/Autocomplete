import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [names, setNames] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {

    const getname = async () => {
      if (searchText) {
        const response = await axios.get('https://api.disneyapi.dev/characters');
        let newList = response.data.data.filter(l => {
          return l.name.includes(searchText);
        })
        setNames(newList);
      }
    }
    getname();
  }, [searchText]);

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  }

/*   const onClickList = (e) => {
    setNames([]);
  } */

  return (
    <div>
      <input type="text" value={searchText}
        onChange={onSearchTextChange} />
      {names.map(n => (
        <div key={n._id} >{n.name} </div>
      )
      )}

    </div>
  )

};

export default App;
