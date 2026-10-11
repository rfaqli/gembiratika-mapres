import Parser from 'rss-parser';

async function run() {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://www.cnbcindonesia.com/news/rss');
    console.log(`Title: ${feed.title}`);
    feed.items.forEach(item => {
      console.log(item.title + ' --- ' + item.link);
    });
  } catch (e) {
    console.log("Error:", e);
  }
}
run();
