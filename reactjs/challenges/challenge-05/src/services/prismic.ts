import Prismic from '@prismicio/client';
import { DefaultClient } from '@prismicio/client/types/client';
const endpoint = process.env.PRISMIC_API_ENDPOINT as string;

export function getPrismicClient(req?: unknown): DefaultClient {
  const prismic = Prismic.client(endpoint, {
    req,
  });

  return prismic;
}
