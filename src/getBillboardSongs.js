import request from 'request';
import cheerio from 'cheerio';

const getBillboardSongs = (name) =>
  new Promise((resolve, reject) => {
    request(`https://www.billboard.com/charts/${name}`, (err, resp, html) => {
      const $ = cheerio.load(html);

      const items = $('.chart-row__primary').map((index, item) => {
        const rankCurrent = $(item).find('.chart-row__current-week').text();
        const rankPrev = $(item).find('chart-row__last-week').text();
        const image = $(item).find('.chart-row__image').data('imagesrc');
        const song = $(item).find('.chart-row__song').text();
        const artist = $(item).find('.chart-row__artist').text().trim();

        return {
          rank: {
            current: rankCurrent,
            prev: rankPrev
          },
          image,
          song,
          artist
        };
      });

      resolve(items);
    });
  });

  export default getBillboardSongs;