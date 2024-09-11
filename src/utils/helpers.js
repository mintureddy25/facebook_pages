export const fetchTotalFollowers = async (pageId, accessToken, since, until) => {
    const url = `https://graph.facebook.com/${pageId}/insights/page_fans?since=${since}&until=${until}&period=total_over_range&access_token=${accessToken}`;
    
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching page followers: ${error.message}`);
    }
  };

  export const fetchPageEngagement = async (pageId, accessToken, since, until) => {
    const url = `https://graph.facebook.com/${pageId}/insights/page_post_engagements?since=${since}&until=${until}&period=total_over_range&access_token=${accessToken}`;
    
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching page engagement: ${error.message}`);
    }
  };


  // src/utils/helpers.js

export const fetchTotalImpressions = async (pageId, accessToken, since, until) => {
    const url = `https://graph.facebook.com/${pageId}/insights/page_impressions_unique?since=${since}&until=${until}&period=total_over_range&access_token=${accessToken}`;
    
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching total impressions: ${error.message}`);
    }
  };
  
  export const fetchTotalReactions = async (pageId, accessToken, since, until) => {
    const url = `https://graph.facebook.com/${pageId}/insights/page_actions_post_reactions_total?since=${since}&until=${until}&period=total_over_range&access_token=${accessToken}`;
    
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching total reactions: ${error.message}`);
    }
  };
  
  
  