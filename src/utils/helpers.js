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


export const fetchTotalImpressions = async (pageId, accessToken, since, until) => {
    const url = `https://graph.facebook.com/${pageId}/insights/page_impressions?since=${since}&until=${until}&period=total_over_range&access_token=${accessToken}`;
    
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

  export const countAllReactions = (data) => {
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return 0;
    }
  
    const reactions = data.data[0];
  
    if (!reactions.values || !Array.isArray(reactions.values) || reactions.values.length === 0) {
      return 0;
    }
  
    const reactionCounts = reactions.values[0].value;
  
    if (typeof reactionCounts === 'object') {
      return Object.values(reactionCounts).reduce((total, count) => {
        return total + (typeof count === 'number' ? count : 0);
      }, 0);
    }
  
    return 0;
  };
  
  
  
  