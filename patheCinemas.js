const CrawlE = require('crawl-e/v0.4.9');

// let crawlE = new CrawlE({
// 	cinemas: {
// 		list: {
// 			url: 'http://www.filmpalast-kino.de/',
// 			box: 'li a',
// 			website: '@href',
// 			slug: {
// 				selector: ':box',
// 				attribute: 'href',
// 				mapper: href =>
// 					href.replace(/(http:\/\/)|(www)|(filmpalast-kino)|(de)|\/|\./g, '')
// 			}
// 		},
// 		details: {
// 			url: ':cinema.website:/kontakt',
// 			name: '.contact-text-box p b',
// 			address: {
// 				selector: '.contact-text-box p:nth-of-type(1)',
// 				attribute: 'html()',
// 				mapper: value => {
// 					value
// 						.split('<br>')
// 						.slice(1, 3)
// 						.join(', ')
// 						.trim();
// 				}
// 			},
// 			email: {
// 				selector: '.contact-text-box p:nth-of-type(1)',
// 				mapper: value => value.match(/(E-Mail: )(.*)/)[2].trim()
// 			},
// 			location: '#contact-maps iframe @src'
// 		}
// 	}
// });

let crawlE = new CrawlE({
	cinemas: {
		list: {
			url: 'https://www.pathe.be/Browsing/Cinemas',
			box: 'div.list-item',
			website: {
				selector: 'div.image-outer > a',
				attribute: 'href',
				mapper: href => 'https:' + href
			},
			name: 'a.cinema-title > h3',
			email: {
				selector: '.contact-email a',
				attribute: 'href',
				mapper: email => email.replace('mailto:', '')
			},
			address: '.contact-address',
			id: {
				selector: 'div.image-outer > a',
				attribute: 'href',
				mapper: id => String(id.match(/[0-9]{4}$/g))
			}
		},
		details: {
			url: ':cinema.website:',
			location: 'div.map iframe.google-map @src'
		}
	},
	showtimes: {
		url: ':cinema.website:',
		movies: {
			box: '.film-item',
			title: '.film-title',
			id: '.film-item @data-movie-id',
			showtimes: {
				box: '.session-times a',
				datetime: 'time @datetime',
				datetimeFormat: 'YYYY-MM-DDTHH:mm:ss',
				datetimeLocale: 'en-US'
			}
		}
	}
});

crawlE.crawl();
