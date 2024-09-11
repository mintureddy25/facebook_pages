import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchPageEngagement, fetchTotalFollowers, fetchTotalImpressions, fetchTotalReactions } from '../../utils/helpers';

const PageInsights = ({ pageId, pageName, accessToken, setShowPageInsights }) => {
  const [followers, setFollowers] = useState(null);
  const [impressions, setImpressions] = useState(null);
  const [engagements, setEngagements] = useState(null);
  const [reactions, setReactions] = useState(null);

  const [error, setError] = useState(null);
  const [dateError, setDateError] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isPageView, setIsPageView] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (startDate && endDate && startDate <= endDate) {
          const [followersData, impressionsData, engagementData, reactionsData] = await Promise.all([
            fetchTotalFollowers(pageId, accessToken, startDate.toISOString(), endDate.toISOString()),
            fetchTotalImpressions(pageId, accessToken, startDate.toISOString(), endDate.toISOString()),
            fetchPageEngagement(pageId, accessToken, startDate.toISOString(), endDate.toISOString()),
            fetchTotalReactions(pageId, accessToken, startDate.toISOString(), endDate.toISOString())
          ]);

          setFollowers(followersData);
          setImpressions(impressionsData);
          setEngagements(engagementData);
          setReactions(reactionsData);
          setError(null);
          setDateError(null); 
        } else {
          setDateError('The "since" date cannot be greater than the "until" date.');
        }
      } catch (error) {
        setError(error.message);
        setFollowers(null);
        setImpressions(null);
        setEngagements(null);
        setReactions(null);
      }
    };

    fetchData();
  }, [pageId, accessToken, startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setDateError('The "since" date cannot be greater than the "until" date.');
    } else {
      setDateError(null);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date && startDate > date) {
      setDateError('The "since" date cannot be greater than the "until" date.');
    } else {
      setDateError(null);
    }
  };

  const handleBackClick = () => {
    setIsPageView(false); 
    setShowPageInsights(false);
  };

  const getTotalValue = (data) => {
    if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
      const values = data.data[0].values;
      if (Array.isArray(values) && values.length > 0) {
        return values.reduce((acc, item) => {
          const value = item.value;
          return acc + (typeof value === 'number' ? value : 0);
        }, 0);
      } else if (Array.isArray(values) && values.length === 0) {
        return 0;
      }
    }
    return 'No data available';
  };

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (dateError) {
    return <div className="text-red-500 text-center">Error: {dateError}</div>;
  }

  if (!isPageView) {
  
    return <div className="text-white text-center"></div>;
  }

  if (!followers || !impressions || !engagements || !reactions) {
    return <div className="text-white text-center">Loading...</div>;
  }

  const stats = [
    { id: '1', name: 'Total Fans', value: getTotalValue(followers) },
    { id: '2', name: 'Total Impressions', value: getTotalValue(impressions) },
    { id: '3', name: 'Total Engagements', value: getTotalValue(engagements) },
    { id: '4', name: 'Total Reactions', value: getTotalValue(reactions) }
  ];

  return (
    <div className="bg-gray-900 py-24 sm:py-32 relative">
    
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 text-sm font-semibold leading-6 text-white flex items-center"
      >
        <svg
          className="w-4 h-4 mr-2 -ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Page Insights</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Select the date range to view the custom insights
            </p>
          </div>
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex flex-col">
              <label className="text-gray-300 mb-2">Since</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="yyyy-MM-dd"
                className="px-4 py-2 bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-300 mb-2">Until</label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="yyyy-MM-dd"
                className="px-4 py-2 bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-300">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">{(stat.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

PageInsights.propTypes = {
  pageId: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  setShowPageInsights: PropTypes.bool.isRequired
};

export default PageInsights;
