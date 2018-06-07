const client = require('cheerio-httpcli');

// Googleで「node.js」について検索する。
client.fetch('https://yakkun.com/sm/zukan/', { q: 'node.js' }, function (err, $, res) {

	let count = 0;
    // ポケモン一覧を抜き出す
    $('ul.pokemon_list a').each(function (idx) {
    	if(count < 2){
    		const name = $(this).text();
        	client.fetch('https://yakkun.com' + $(this).attr("href"), { q: 'node.js' }, function (err, $, res) {

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
			    	console.log($(this).text().split(/\s/)[0] + " is " + ($(this).text().split(/\s/)[1]));

			    });
			});
        	count++;
    	}
    });
});
