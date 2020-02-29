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
		url: ':cinema.website:stadtkino/kinoprogramm/:date:',
		urlDateFormat: 'YYYY/MM/DD',
		movies: {
			box: 'section.box.entry',
			title: 'div > h1 > a > strong',
			showtimes: {
				box: 'time',
				datetime: {
					selector: ':box',
					attribute: 'datetime'
				},
				datetimeFormat: 'YYYY-MM-DD HH:mm:ss'
			}
		}
	}
});

crawlE.crawl();
