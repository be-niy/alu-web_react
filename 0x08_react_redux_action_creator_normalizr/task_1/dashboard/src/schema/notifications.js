import { normalize, schema } from 'normalizr';
import * as notificationsData from '../../notifications.json';

const user = new schema.Entity('users');

const message = new schema.Entity(
  'messages',
  {},
  { idAttribute: 'guid' }
);

const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

export const normalizedData = normalize(
  notificationsData.default,
  [notification]
);

export function getAllNotificationsByUser(userId) {
  return notificationsData.default
    .filter((item) => item.author.id === userId)
    .map((item) => item.context);
}
