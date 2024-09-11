import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FacebookUserData from "./UserDetails";


function Dashboard() {
  const location = useLocation();
  const [accessToken, setAccessToken] = useState(null);
  const [pages, setPages] = useState([]);

  const getFacebookPages = async (accessToken) => {
    const url = `https://graph.facebook.com/me/accounts?access_token=${accessToken}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data; 
    } catch (error) {
      console.error("Error fetching Facebook pages", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchPages = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("accessToken");

      if (token) {
        setAccessToken(token);
        console.log("Access Token:", token);
        const fetchedPages = await getFacebookPages(token);
        setPages(fetchedPages);
      }
    };

    fetchPages();
  }, [location.search]);
  const hasPages = pages.length > 0;


  return (
    <div>
      {accessToken && hasPages &&<FacebookUserData accessToken={accessToken} pages={pages}/>}
    </div>
  );
}

export default Dashboard;
