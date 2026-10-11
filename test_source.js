import https from 'https';

https.get('https://source.unsplash.com/1600x900/?renewable,energy', res => {
  console.log(res.statusCode);
  console.log(res.headers.location);
});
