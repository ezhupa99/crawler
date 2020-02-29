const CrawlE = require('crawl-e/v0.4.9');

const extractor = (html, slice1, slice2, sliceEl = '<br>') => {
	return html
		.split(sliceEl)
		.slice(slice1, slice2)
		.join(', ')
		.trim();
};

const CinemaIDObj = {
	Orono: 1,
	Skowhegan: 2,
	Hudson: 3,
	Dunkirk: 4,
	Corning: 5,
	'St. Andrews Columbia': 6,
	'Capital 8 Columbia': 7
};

let crawlE = new CrawlE({
	cinemas: {
		list: {
			url: 'https://spotlightcinemas.com/',
			box: '.nav-item .dropdown-menu .dropdown-item:not(.disabled)',
			website: {
				selector: ':box',
				attribute: 'href',
				mapper: href => 'https://spotlightcinemas.com' + href
			},
			name: ':box',
			id: {
				selector: ':box',
				mapper: id => CinemaIDObj[id]
			}
		},
		details: {
			url: ':cinema.website:/?page=contact',
			location: 'center > iframe @src',
			address: {
				selector: 'span.card-text p:nth-of-type(2)',
				attribute: 'html()',
				mapper: adr => extractor(adr, 2, 4)
			},
			phone: {
				selector: 'span.card-text p:nth-of-type(2)',
				attribute: 'html()',
				mapper: nr => {
					const MoLine = extractor(nr, 4, 5);
					const OfLine = extractor(nr, 5, 6);

					return OfLine.match(/\([0-9]{3}\)/g)
						? MoLine + ', ' + OfLine
						: MoLine;
				}
			}
		}
	},
	showtimes: {
		url: ':cinema.website:/index.php?date=:date:',
		urlDateFormat: 'YYYYMMDD',
		movies: {
			box: 'div.row div.card',
			title: 'div.card-header li',
			showtimes: {
				box: 'span.badge',
				time: ':box',
				timeFormat: ['H:mm', 'HH:mm'],
				timeLocale: 'en-US'
			}
		}
	}
});

crawlE.crawl();
