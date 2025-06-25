'use node';
import { httpAction, ActionCtx } from './_generated/server';
import { Inngest, InngestCommHandler, type ServeHandlerOptions } from 'inngest';

const inngest = new Inngest({
  id: 'my-convex-app',
});

const fn = inngest.createFunction(
  {
    id: 'my-function',
  },
  { event: 'hello.world' },
  async ({ step }) => {
    await step.run('hi', async () => {
      return 'do something';
    });
    return 'done!';
  },
);

export const serve = (
  options: ServeHandlerOptions,
): ((ctx: ActionCtx, req: Request) => Promise<Response>) => {
  const handler = new InngestCommHandler({
    frameworkName: 'convex',
    fetch: fetch.bind(globalThis),
    ...options,
    handler: (ctx: ActionCtx, req: Request) => {
      return {
        body: () => req.json(),
        headers: (key) => req.headers.get(key),
        method: () => req.method,
        url: () => new URL(req.url, `https://${req.headers.get('host') || ''}`),
        transformResponse: ({ body, status, headers }) => {
          return new Response(body, { status, headers });
        },
      };
    },
  });

  return handler.createHandler();
};

export const inngestAction = httpAction(
  serve({
    client: inngest,
    functions: [fn],
  }),
);
