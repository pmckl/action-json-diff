const diff = require("../src/diff");

test('no diff', async () => {
    return diff('{"result":true, "count":42}','{"result":true, "count":42}').then(data => {
        expect(data.length).toBe(0);
    });
})

test('have diff', async () => {
    return diff('{"result":true, "count":42}','{"result":true, "count":43}').then(data => {
        expect(data.length).toBeGreaterThan(0);
    });
})

test('invalid json', async () => {
    return await expect(diff("{ 'foo': 'bar' }","{ 'foo': 'bar' }"))
    .rejects
    .toThrow('One of the provided strings is not a valid json');
})


test('throw error', async () => {
    return await expect(diff("",""))
    .rejects
    .toThrow('String A is empty');
})

test('throw another error', async () => {
    return await expect(diff("{ 'foo': 'bar' }",""))
    .rejects
    .toThrow('String B is empty');
})