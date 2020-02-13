/**
 * Creates random string phrases
 * @param wordNumber Word numbers of the phrase
 * @param maxWordsSize Words size created are made of random numbers created between 1 and maxWordSize value
 */
import {IPaginatedResponse} from '../services/fake-api.service';

export function randomPhraseGenerator(wordNumber: number, maxWordsSize: number): string {
  /* tslint:disable:no-bitwise */
  const randomWordOfN = (n): string => [...Array(n).fill(null)].map( () => (~~(Math.random() * 36)).toString(36)).join('');
  /* tslint:enable:no-bitwise */
  return new Array(wordNumber).fill('').map(() => randomWordOfN(Math.floor(Math.random() * maxWordsSize) + 1  )).join(' ');
}

/**
 * Generates a body of a random response for paginated responses
 * @param cantElements Number of elements on the current page
 * @param totalElements Number of total records that should be in the API
 */
export const mockPaginatedResponseGenerator = (cantElements: number, totalElements: number): Partial<IPaginatedResponse<any>> => {
  return {
    pagination_metadata: {
      page: 1,
      per_page: 10,
      page_count: 10,
      total_count: totalElements
    },
    records: new Array(cantElements).fill(null).map(() => ({
      nombre: randomPhraseGenerator(2, 8),
      id: Math.floor(Math.random() * 10) + 1
    }))
  };
};
