const diff = require("../src/diff");

test('no diff', async () => {
    return diff("{ foo: 'bar' }","{ foo: 'bar' }").then(data => {
        expect(data.length).toBe(0);
    });
})

test('have diff', async () => {
    return diff("{ foo: 'bar' }","{ foo: 'baz' }").then(data => {
        expect(data.length).toBeGreaterThan(0);
    });
})

test('throw error', async () => {
    return await expect(diff("",""))
    .rejects
    .toThrow('String A is empty');
})

test('throw another error', async () => {
    return await expect(diff("{ foo: 'bar' }",""))
    .rejects
    .toThrow('String B is empty');
})