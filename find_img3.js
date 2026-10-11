import https from 'https';

const ids = [
  '1508514177221-188b1c77eca4', // solar panel
  '1466611653911-95081537e5b7',
  '1518314916593-0f9c2d1b11bc',
  '1497435334941-8c899ee9e8e9',
  '1559403445-5f9923831bea',
  '1584622650111-993a426fbf0a',
  '1581093450021-4a7360e9a6b5',
  '1621905251189-08b45d6a269e',
];

ids.forEach(id => {
  https.get(`https://images.unsplash.com/photo-${id}?w=400`, res => {
    console.log(id, res.statusCode);
  });
});
