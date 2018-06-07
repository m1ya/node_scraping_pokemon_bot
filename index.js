const client = require('cheerio-httpcli');
var sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/pokemon.db');

// yakkunにアクセス
client.fetch('https://yakkun.com/sm/zukan/', (err, $, res) => {

	const stmt = db.prepare("INSERT INTO pokemon(name, h, a, b, c, d, s) VALUES (?, ?, ?, ?, ?, ?, ?)");
	let count = 0;
    // ポケモン一覧を抜き出す
    $('ul.pokemon_list a').each(function (idx) {
    	if(count < 2){
    		const name = $(this).text();
        	client.fetch('https://yakkun.com' + $(this).attr("href"), (err, $, res) => {

        		// 名前を表示
        		console.log(name);

        		const bs = [];

        		// データを表示
			    $('table.center tr').each(function (idx) {
			    	if($(this).text().match(/種族値/)){
			    		return true;
			    	}
			    	if($(this).text().match(/平均/)){
			    		return false;
			    	}

			    	bs.push($(this).text().split(/\s/)[1]);
			    	console.log($(this).text().split(/\s/)[0] + " is " + $(this).text().split(/\s/)[1]);

			    });
			    stmt.run(name, bs[0], bs[1], bs[2], bs[3], bs[4], bs[5]);
			});
        	count++;
    	}
    });
});
