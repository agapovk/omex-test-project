import axios from 'axios';
import { useState } from 'react';

const useFetch = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const options = {
		method: 'post',
		url: 'https://hookb.in/eK160jgYJ6UlaRPldJ1P',
		headers: { 'Content-Type': 'application/json' },
	};

	const fetchData = async (data) => {
		try {
			setLoading(true);
			const response = await axios.request({ ...options, data });
			console.log(response.data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(err.message);
			console.log(err.message);
		}
	};

	return { loading, error, fetchData };
};

export default useFetch;
