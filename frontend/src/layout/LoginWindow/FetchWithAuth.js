import RefreshToken from './RefreshToken';

async function FetchWithAuth(url, options = {}) {
   let accessToken = localStorage.getItem('accessToken');
   options.headers = {
     ...(options.headers || {}),
     'Authorization': `Bearer ${accessToken}`,
     'Content-Type': 'application/json',
   };
   let response = await fetch(url, options);
 
   if (response.status === 401) {
     accessToken = await RefreshToken();
     if (!accessToken) return null;
 
     options.headers['Authorization'] = `Bearer ${accessToken}`;
     response = await fetch(url, options);
   }
 
   return response;
 }

export default FetchWithAuth;