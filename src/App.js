import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  let select = useRef(false);

  const [names, setNames] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const getname = async () => {
      if (searchText === null || searchText === '')
        setNames([]);
      if (searchText && !select.current) {
        const response = await axios.get('https://api.disneyapi.dev/characters');
        let newList = response.data.data.filter(l => {
          return l.name.includes(searchText);
        })
        setNames(newList);
      }

      select.current = false;
    }
    getname();
  }, [searchText, select]);

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  }

  const onClickList = (e) => {
    select.current = true;
    setNames([]);
    setSearchText(e);
  }

  return (
    <div>
      <input type="text" value={searchText}
        onChange={onSearchTextChange} />
      {names.map(n => (
        <div key={n._id} onClick={e => { onClickList(n.name) }}>{n.name} </div>
      )
      )}

    </div>
  )

};

export default App;
