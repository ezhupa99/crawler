const CrawlE = require('crawl-e/v0.4.9');

let crawlE = new CrawlE({
	cinemas: [
		{
			name: 'Stadtkino',
			address: 'Siebensterngasse 2/12 1070 Wien',
			website: 'http://stadtkinowien.at/',
			phone: '+43 1 361 81 81'
		}
	],
	showtimes: {
		url: 'http://stadtkinowien.at/stadtkino/kinoprogramm/',
		movies: {
			box: '.entry',
			title: '.content h1',
			showtimes: {
				box: 'time > strong',
				datetimeFormat: 'HH.mm'
			}
		}
	}
});

crawlE.crawl();
