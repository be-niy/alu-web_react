import { normalize, schema } from 'normalizr';

export const course = new schema.Entity('courses');

export function coursesNormalizer(data) {
  return normalize(data, [course]);
}
