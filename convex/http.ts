import { httpRouter } from 'convex/server';
import { inngestAction } from './inngest';

const http = httpRouter();

http.route({
  path: '/api/inngest',
  method: 'GET',
  handler: inngestAction,
});

http.route({
  path: '/api/inngest',
  method: 'POST',
  handler: inngestAction,
});

http.route({
  path: '/api/inngest',
  method: 'PUT',
  handler: inngestAction,
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
