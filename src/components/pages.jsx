import React, { useEffect, useState } from 'react';

const FacebookPagesList = ({accessToken}) => {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = accessToken; // Replace with your user access token

    const fetchPages = async () => {
      try {
        const response = await fetch(`https://graph.facebook.com/me/accounts?access_token=${accessToken}`);
        const data = await response.json();
        if (data.data) {
          setPages(data.data);
        } else {
          setError('No pages found or error fetching data.');
        }
      } catch (error) {
        setError('Error fetching pages: ' + error.message);
      }
    };

    fetchPages();
  }, []);

  return (
    <div>
      <h1>List of Pages</h1>
      {error && <p>{error}</p>}
      {pages.length > 0 ? (
        <ul>
          {pages.map((page) => (
            <li key={page.id}>{page.name}</li>
          ))}
        </ul>
      ) : (
        <p>No pages found.</p>
      )}
    </div>
  );
};

export default FacebookPagesList;
