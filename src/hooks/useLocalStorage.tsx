import React, { useState, useEffect } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
	const [value, setValue] = useState(() => {
		return JSON.parse(window.localStorage.getItem(key) as any) || initialValue;
	});

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value));
		return () => window.localStorage.clear();
	}, [key, value]);

	return [value, setValue];
};

export { useLocalStorage };
