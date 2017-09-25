const cluster = require('cluster'),
    Promise = require('bluebird'),
    memored = require('../index');

if (cluster.isMaster) {
    cluster.fork();
} else {
    (async () => {
        const han = {
                firstname: 'Han',
                lastname: 'Solo'
            },
            luke = {
                firstname: 'Luke',
                lastname: 'Skywalker'
            };
        // Store and read
        await memored.store('character1', han);
        console.log('Value stored!');
        const value = await memored.read('character1');
        console.log('Read value:', value);

        // You can also set a ttl (milliseconds)
        const expirationTime = await memored.store('character2', luke, 1000);
        console.log('Value stored until:', new Date(expirationTime));
        await Promise.delay(1050);
        await memored.read('character2');
        console.log('Value is gone?', value === undefined);
        process.exit();
    })();
}