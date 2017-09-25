const cluster = require('cluster'),
	Promise = require('bluebird'),
    memored = require('../index');

if (cluster.isMaster) {

    cluster.fork();
    memored.setup({ purgeInterval: 500});

} else {
    (async () => {
        await memored.store('key1', 'My simple string value');
        let size = await memored.size();
        console.log('Current size is 1?', size === 1);
        await Promise.delay(600);
        size = await memored.size();
        console.log('Current size is 0?', size === 0);
        process.exit();
    })();
}