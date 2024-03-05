// Correction: Kue is usually required with CommonJS syntax. Adjust if using an ES module equivalent.
const kue = require('kue');
const queue = kue.createQueue();

// Create a job in the queue
const job = queue.create('push_notification_code', {
  phoneNumber: '4153518780',
  message: 'This is the code to verify your account',
}).save((err) => {
  if (err) {
    console.log('Failed to create notification job', err);
  } else {
    console.log(`Notification job created: ${job.id}`);
  }
});

// Listen for job completion
job.on('complete', () => {
  console.log(`Notification job ${job.id} completed`);
}).on('failed', (err) => {
  console.log(`Notification job ${job.id} failed:`, err);
});
