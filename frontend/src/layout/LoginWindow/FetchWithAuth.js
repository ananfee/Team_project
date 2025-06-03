import RefreshToken from './RefreshToken';

async function FetchWithAuth(url, options = {}) {
   let accessToken = localStorage.getItem('accessToken');
   const isFormData = options.body instanceof FormData;

   options.headers = {
     ...(options.headers || {}),
     'Authorization': `Bearer ${accessToken}`,
   };
 
   if (!isFormData) {
     options.headers['Content-Type'] = 'application/json';
   }

   let response = await fetch(url, options);
 
   if (response.status === 401) {
     accessToken = await RefreshToken();
     if (!accessToken) return null;
    localStorage.setItem('accessToken', accessToken); 
     options.headers['Authorization'] = `Bearer ${accessToken}`;
     response = await fetch(url, options);
   }
 
   return response;
 }

export default FetchWithAuth;