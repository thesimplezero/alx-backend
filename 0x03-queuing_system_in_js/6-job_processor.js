// Assuming ES module syntax is desired for consistency and modern development practices
import kue from 'kue';

const queue = kue.createQueue();

/**
 * Sends a notification message to a specified phone number.
 * @param {string} phoneNumber - The recipient's phone number.
 * @param {string} message - The notification message to send.
 */
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the queue
queue.process('push_notification_code_2', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});
