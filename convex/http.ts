import { httpRouter } from 'convex/server';
import {httpAction} from './_generated/server';
import {api} from "./_generated/api";
import { SerializedRequest } from './types';

const http = httpRouter();

export const ingestHttpAction = httpAction(async (ctx, request) => {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const serializedHttpRequest: SerializedRequest = {
    body: await request.json(),
    headers,
    method: request.method,
    url: request.url,
  };

  const serializedResponse = await ctx.runAction(api.inngest.inngestAction, serializedHttpRequest);

  return new Response(serializedResponse.body, {
    status: serializedResponse.status,
    headers: serializedResponse.headers
  });
});

http.route({
  path: '/api/inngest',
  method: 'GET',
  handler: ingestHttpAction,
});

http.route({
  path: '/api/inngest',
  method: 'POST',
  handler: ingestHttpAction,
});

http.route({
  path: '/api/inngest',
  method: 'PUT',
  handler: ingestHttpAction,
});

// Define additional routes
// http.route({
//   path: '/getMessagesByAuthor',
//   method: 'GET',
//   handler: getByAuthor,
// });

// // Define a route using a path prefix
// http.route({
//   // Will match /getAuthorMessages/User+123 and /getAuthorMessages/User+234 etc.
//   pathPrefix: '/getAuthorMessages/',
//   method: 'GET',
//   handler: getByAuthorPathSuffix,
// });

// Convex expects the router to be the default export of `convex/http.js`.
export default http;
