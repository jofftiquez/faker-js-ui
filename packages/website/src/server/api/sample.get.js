import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return `Hello ${query.name || 'no name'}.`;
});
