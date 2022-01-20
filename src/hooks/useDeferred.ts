import React from 'react';

const {useState, useEffect} = React;

export function useDeferred<Val>(val: Val, ms: number): Val {
	const [debounced, setDebounced] = useState(val);

	useEffect(() => {
		const id = setTimeout(() => setDebounced(val), ms);
		return () => clearTimeout(id);
	}, [val, ms]);

	return debounced;
}