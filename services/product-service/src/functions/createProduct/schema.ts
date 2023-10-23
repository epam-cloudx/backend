export default {
  type: 'object',
  properties: {
    title: { type: 'string' },
    price: { type: 'string' },
    description: { type: 'string' },
  },
  required: ['title', 'price'],
} as const;
