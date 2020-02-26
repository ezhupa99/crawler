const CrawlE = require('crawl-e/v0.4.9');

let crawlE = new CrawlE({
	cinemas: [
		{
			name: 'Kino Ebensee',
			address: 'Schulgasse 6, 4802 Ebensee',
			website: 'https://www.kino-ebensee.at/',
			phone: '0043 6133 6308'
		}
	],
	showtimes: {
		url: 'https://www.kino-ebensee.at/kinoprogramm',
		movies: {
			box: '#content_main_full .eventWrap',
			title: '.eventDescription > .col1 > .eventHeader'
		}
	}
});

crawlE.crawl();
