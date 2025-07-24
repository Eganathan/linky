
import { http, HttpResponse } from 'msw';

let collections = [
  {
    id: 'c1',
    title: 'Productivity Tools',
    description: 'A collection of tools for productivity.',
    links: [
      { id: 'l1', url: 'https://trello.com', description: 'Project management' },
      { id: 'l2', url: 'https://notion.so', description: 'All-in-one workspace' },
    ],
  },
];

export const handlers = [
  http.get('/api/collections', () => {
    return HttpResponse.json(collections);
  }),

  http.post('/api/collections', async ({ request }) => {
    const { title, description } = await request.json();
    const newCollection = {
      id: `c${Date.now()}`,
      title,
      description,
      links: [],
    };
    collections.push(newCollection);
    return HttpResponse.json(newCollection, { status: 201 });
  }),

  http.delete('/api/collections/:collectionId', ({ params }) => {
    const { collectionId } = params;
    collections = collections.filter((c) => c.id !== collectionId);
    return new HttpResponse(null, { status: 204 });
  }),

  http.post('/api/collections/:collectionId/links', async ({ params, request }) => {
    const { collectionId } = params;
    const { url, description } = await request.json();
    const collection = collections.find((c) => c.id === collectionId);
    if (!collection) {
      return HttpResponse.json({ error: 'Collection not found' }, { status: 404 });
    }
    const newLink = { id: `l${Date.now()}`, url, description };
    collection.links.push(newLink);
    return HttpResponse.json(newLink, { status: 201 });
  }),

  http.delete('/api/links/:linkId', ({ params }) => {
    const { linkId } = params;
    collections.forEach((collection) => {
      collection.links = collection.links.filter((l) => l.id !== linkId);
    });
    return new HttpResponse(null, { status: 204 });
  }),
];
