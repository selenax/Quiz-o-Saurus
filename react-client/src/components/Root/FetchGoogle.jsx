export function FetchGoogle (type, userData) {
  let BaseURL = '/';

  return new Promise((resolve, reject) =>{
  fetch(BaseURL, {
      method: 'POST',
  })
  .then((response) => 
  response.json())
  .then(()=>console.log('TAKE MY MONEY'))
  .then((res) => {
      resolve(res);
  })
  .catch((error) => {
     reject(error);
  });
  
  });
  }