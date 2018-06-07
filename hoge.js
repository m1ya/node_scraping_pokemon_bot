var client = require('cheerio-httpcli');

// Googleで「node.js」について検索する。
client.fetch('https://yakkun.com/sm/zukan/n1', { q: 'node.js' }, function (err, $, res) {

    // ポケモン一覧を表示
    $('table.center tr').each(function (idx) {
    	if($(this).text().match(/平均/)){
    		process.exit(0);
    	}
    	if(!$(this).text().match(/種族値/)){
    		console.log($(this).text().split(/\s/)[0] + " is " + ($(this).text().split(/\s/)[1]));
    	}

    });
});
