import { responseHeaders, responseParser } from '@libs/response-parser';

describe('responseParser()', () => {
  it('strigifies response body', () => {
    const jsonBody = {
      name: 'John',
    };
    const result = responseParser(200, jsonBody);

    expect(result).toEqual(expect.objectContaining({ body: JSON.stringify(jsonBody) }));
  });

  it('returns empty body when data is empty', () => {
    const result = responseParser(200);

    expect(result).toEqual(expect.objectContaining({ body: JSON.stringify({}) }));
  });

  it('returns complete response body', () => {
    const jsonBody = {
      name: 'John',
    };
    const result = responseParser(200, jsonBody);

    expect(result).toStrictEqual({ statusCode: 200, headers: responseHeaders, body: JSON.stringify(jsonBody) });
  });
});
