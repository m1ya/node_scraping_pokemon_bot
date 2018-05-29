var client = require('cheerio-httpcli');

// Googleで「node.js」について検索する。
client.fetch('https://yakkun.com/sm/zukan/', { q: 'node.js' }, function (err, $, res) {
    // レスポンスヘッダを参照
    console.log(res.headers);

    // HTMLタイトルを表示
    console.log($('title').text());

    // ポケモン一覧を表示
    $('ul.pokemon_list a').each(function (idx) {
        console.log($(this).text());
    });
});
