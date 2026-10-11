import https from 'https';
['1497435334941-8c899ee9e8e9', '1584622650111-993a426fbf0a', '1581093450021-4a7360e9a6b5'].forEach(id => {
  const req = https.get('https://unsplash.com/photos/'+id, {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
    let d = ''; res.on('data', c => d+=c);
    res.on('end', () => console.log(id, d.match(/<title>([^<]+)/)?.[1]));
  });
});
