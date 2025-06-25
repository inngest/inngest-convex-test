'use node';
import { ActionCtx, action } from './_generated/server';
import { Inngest, InngestCommHandler, type ServeHandlerOptions } from 'inngest';
import { serializedRequest, SerializedRequest, serializedResponse, SerializedResponse } from './types';

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
): ((ctx: ActionCtx, serializedRequest: SerializedRequest) => Promise<SerializedResponse>) => {
  const handler = new InngestCommHandler({
    frameworkName: 'convex',
    fetch: fetch.bind(globalThis),
    ...options,
    handler: (ctx: ActionCtx, req: SerializedRequest) => {
      return {
        body: () => Promise.resolve(req.body),
        headers: (key: string) => req.headers[key] || null,
        method: () => req.method,
        url: () => new URL(req.url),
        transformResponse: ({ body, status, headers }: { body: any, status: number, headers: Record<string, string> }): SerializedResponse => {
          return {
            body: typeof body === 'string' ? body : JSON.stringify(body),
            status,
            headers
          };
        },
      };
    },
  });

  return handler.createHandler();
};

export const inngestAction = action({
  args: serializedRequest,
  returns: serializedResponse,
  handler: serve({
    client: inngest,
    functions: [fn],
  }),
});

