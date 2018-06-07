const client = require('cheerio-httpcli');
const sqlite = require('sqlite');
const dbPromise = sqlite.open('./db/payment.db', { Promise });

// yakkunにアクセス
client.fetch('https://yakkun.com/sm/zukan/', (err, $, res) => {

	let count = 0;
    // ポケモン一覧を抜き出す
    $('ul.pokemon_list a').each(function (idx) {
    	if(count < 2){
    		const name = $(this).text();
        	client.fetch('https://yakkun.com' + $(this).attr("href"), { q: 'node.js' }, (err, $, res) => {

        		// 名前を表示
        		console.log(name);

        		// データを表示
			    $('table.center tr').each(function (idx) {
			    	if($(this).text().match(/種族値/)){
			    		return true;
			    	}
			    	if($(this).text().match(/平均/)){
			    		return false;
			    	}
			    	console.log($(this).text().split(/\s/)[0] + " is " + $(this).text().split(/\s/)[1]);

			    });
			});
        	count++;
    	}
    });
});
