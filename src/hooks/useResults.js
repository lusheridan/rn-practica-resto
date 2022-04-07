import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm) => {
      if (errorMessage) {
          setErrorMessage('');
      }
      try {
      const response = await yelp.get('/search', {
         params: {
             limit: 50,
             term: searchTerm,
             location: 'buenos aires'
         }
     });
     setResults(response.data.businesses);
      } catch (error) {
          setErrorMessage('Something went wrong');
      }
  };

  useEffect(() => {
      searchApi('pasta')
  }, []);

  return [searchApi, results, errorMessage];
};