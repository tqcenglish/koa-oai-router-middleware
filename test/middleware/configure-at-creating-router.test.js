const { init } = require('../helpers');

const middleware = require('../..');

describe('configure at creating router', () => {
  it('plugin option is string middleware = "xxx", should be ok', async () => {
    const { request } = await init({
      apiDoc: './test/middleware/api',
      options: {
        middleware: './test/middleware/controllers',
      },
      plugins: {
        middleware: middleware(),
      },
    });

    const pets = await request.get('/api/pets');
    const stores = await request.get('/api/stores');

    expect(pets.text).toMatch('find success');
    expect(stores.text).toMatch('authorized and find success');
  });

  it('plugin option is object {middleware}, should be ok', async () => {
    const { request } = await init({
      apiDoc: './test/middleware/api',
      options: {
        middleware: {
          middleware: './test/middleware/controllers',
        },
      },
      plugins: {
        middleware: middleware(),
      },
    });

    const pets = await request.get('/api/pets');
    const stores = await request.get('/api/stores');

    expect(pets.text).toMatch('find success');
    expect(stores.text).toMatch('authorized and find success');
  });

  it('plugin option is object {middlewareDir}, should be ok', async () => {
    const { request } = await init({
      apiDoc: './test/middleware/api',
      options: {
        middleware: {
          middlewareDir: './test/middleware/controllers',
        },
      },
      plugins: {
        middleware: middleware(),
      },
    });

    const pets = await request.get('/api/pets');
    const stores = await request.get('/api/stores');

    expect(pets.text).toMatch('find success');
    expect(stores.text).toMatch('authorized and find success');
  });

  it('plugin option is object {dir}, should be ok', async () => {
    const { request } = await init({
      apiDoc: './test/middleware/api',
      options: {
        middleware: {
          dir: './test/middleware/controllers',
        },
      },
      plugins: {
        middleware: middleware(),
      },
    });

    const pets = await request.get('/api/pets');
    const stores = await request.get('/api/stores');

    expect(pets.text).toMatch('find success');
    expect(stores.text).toMatch('authorized and find success');
  });

  it('plugin option is invalid, should throw error', async () => {
    try {
      await init({
        apiDoc: './test/middleware/api',
        options: {
          middleware: null,
        },
        plugins: {
          middleware: middleware(),
        },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});