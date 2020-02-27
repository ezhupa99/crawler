const CrawlE = require('crawl-e/v0.4.9');

let crawlE = new CrawlE({
	cinemas: [
		{
			name: 'Burg Kino',
			address: 'Burg Kino Opernring 19 1010 Vienna',
			website: 'https://www.burgkino.at/',
			phone: '+43 1 587 8406',
			email: 'office@burgkino.at'
		}
	],
	showtimes: {
		url: 'https://www.burgkino.at/showtimes/today',
		urlDateFormat: 'DD/MM/YYYY',
		movies: {
			box: '.views-row article',
			title: '.col-sm-12 h2',
			subtitles: {
				selector: '.col-sm-8 > div:nth-child(4) p:nth-child(1)',
				mapper: el => {
					return el;
				}
			}
		}
	}
});

crawlE.crawl();
