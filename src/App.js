import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState([]);
  const [text, setText] = useState([]);
  const [suggestions, setSuggetions] = useState([]);
  useEffect(() => {
    getname();
  }, []);

  const getname = async () => {
    const response = await axios.get('https://reqres.in/api/users');
    setName(response.data.data);
  }

  const onSuggetionHandler = (fname) => {
    setText(fname);
    setSuggetions([]);
  }

  const onChangeHandler = (text) => {
    let matches = []
    if (text) {
      matches = name.filter(fn => {
        const regex = new RegExp(`${text}`, "gi");
        return fn.first_name.match(regex)
      })
    }
    setSuggetions(matches);
    setText(text)
  }


  return (
    <div>
      <label> Search </label>
      <input type="text" size="50"
        onChange={e => onChangeHandler(e.target.value)}
        value={text}
        onBlur={() => { // add delay because onBlur fires before onClick
          setTimeout(() => { setSuggetions([]) }, 200);
        }}
      />
      <Suggestions suggestions={suggestions} onSuggetionHandler={onSuggetionHandler} />

    </div>
  );
}

const Suggestions =   ({suggestions, onSuggetionHandler}) => {
return (
    <>
      {suggestions.map((suggestions, i) =>
        <div className="suggestions" key={i}
          onClick={() => onSuggetionHandler(suggestions.first_name)} // set value in inputbox, empty sugg list
        >{suggestions.first_name}</div>
      )}
    </>
  )
};

export default App;
