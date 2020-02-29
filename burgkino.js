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
		url:
			':cinema.website:/showtimes/:page([today,tomorrow,this-week,next-week]):',
		movies: {
			box: '.views-row article',
			title: '.col-sm-12 h2',
			showtimes: {
				box: 'tbody tr',
				time: 'td:nth-child(2) time',
				timeFormat: 'HH:mm',
				date: 'td:nth-child(1) time',
				dateFormat: 'ddd, DD.MM.YYYY'
			}
		}
	}
});

crawlE.crawl();
