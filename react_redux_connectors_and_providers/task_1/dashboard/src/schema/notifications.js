import { normalize, schema } from 'normalizr';
import * as notificationsData from '../../notifications.json';

const user = new schema.Entity('users');

const message = new schema.Entity(
  'messages',
  {},
  {
    idAttribute: 'guid',
  }
);

const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

export function notificationsNormalizer(data) {
  return normalize(data, [notification]);
}

export const normalizedData = notificationsNormalizer(
  notificationsData.default
);

export function getAllNotificationsByUser(userId) {
  const notifications = [];

  normalizedData.result.forEach((notificationId) => {
    const notification =
      normalizedData.entities.notifications[notificationId];

    if (notification.author === userId) {
      notifications.push(
        normalizedData.entities.messages[notification.context]
      );
    }
  });

  return notifications;
}
