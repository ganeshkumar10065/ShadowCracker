import axios from 'axios';

const API_BASE_URL = 'http://192.168.43.161:3001/api';

// List of session cookies (sessionid and csrftoken pairs)
const accounts = [
  {
    sessionid: 'SESSION_ID_1',
    csrftoken: 'CSRF_TOKEN_1',
  },
  {
    sessionid: 'SESSION_ID_2',
    csrftoken: 'CSRF_TOKEN_2',
  },
];

// Mobile & Desktop User-Agents to rotate
const userAgents = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 155.0.0.37.107',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
];

let currentAccount = 0;

function getHeaders(account) {
  const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
  return {
    'User-Agent': userAgent,
    'Accept': '*/*',
    'Referer': `https://www.instagram.com/`,
    'X-IG-App-ID': '936619743392459',
    'Cookie': `sessionid=${account.sessionid}; csrftoken=${account.csrftoken};`,
  };
}

export async function fetchProfile(username) {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile/${username}`);
    return { data: response.data.data, success: true };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status || 'unknown',
      message: error.response?.statusText || error.message,
    };
  }
}

export function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
} 