const CrawlE = require('crawl-e/v0.4.9');

let crawlE = new CrawlE({
	cinemas: [
		{
			name: 'Kino Freistadt',
			address: 'Salzgasse 25, 4240 Freistadt',
			website: 'https://www.kino-freistadt.at/index.php'
		}
	],
	showtimes: {
		url: 'https://www.kino-freistadt.at/?site=program&date=:date:',
		urlDateFormat: 'DD/MM/YYYY',
		movies: {
			box: '.dailyProgramMovieBox',
			title: '.dailyProgramContent > .dailyProgramContentMovie',
			showtimes: {
				box: '.dailyProgramTime > a',
				timeFormat: 'HH:mm'
			}
		}
	}
});

crawlE.crawl();
