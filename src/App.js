import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { DebounceInput } from 'react-debounce-input';

function App() {
	const select = useRef(false);

	const [searchText, setSearchText] = useState('');
	const [names, setNames] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const getNames = async () => {
			if (searchText === null || searchText === '')
				setNames([]);
			if (searchText && !select.current) {
				axios.get('https://api.disneyapi.dev/characters')
					.then((response) => {
						let list = response.data.data.filter(l => {
							return l.name.includes(searchText);
						})
						setNames(list);
					})
					.catch((error) => {
						if (error.response.status === 404)
							return setError("ERROR: 404 Page Not Found");
						else
							return setError('Other ERROR');
					});
			};
			select.current = false;
		};
		getNames();
	}, [searchText, select])

	const onClickListItem = (n) => {
		select.current = true;
		setSearchText(n);
		setNames([]);
	}

	return (
		<div>
			<DebounceInput type="text" value={searchText}
				debounceTimeout={300}
				onChange={e => setSearchText(e.target.value)}
			/>
			{!error && names.map(n => (
				<div key={n._id}
					onClick={() => { onClickListItem(n.name) }}>
					{n.name}
				</div>
			))}
			<div>{error}</div>
		</div>
	);
};

export default App;
