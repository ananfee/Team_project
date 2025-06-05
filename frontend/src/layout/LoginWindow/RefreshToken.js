

async function RefreshToken() {
  const baseUrl = /api/;
   const refreshToken = localStorage.getItem('refreshToken');
   if (!refreshToken) return null;
 
   try {
     const response = await fetch(`${baseUrl}catalog/token/refresh/`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ refresh: refreshToken })
     });
     if (!response.ok) throw new Error();
 
     const data = await response.json();
     localStorage.setItem('accessToken', data.access);
     if (data.refresh) {
       localStorage.setItem('refreshToken', data.refresh);
     }
     return data.access;
   } catch {
     localStorage.removeItem('accessToken');
     localStorage.removeItem('refreshToken');
     localStorage.removeItem('role');
     window.location.reload();
     return null;
   }
 }

export default RefreshToken;