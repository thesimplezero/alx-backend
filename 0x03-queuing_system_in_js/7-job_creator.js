import { createQueue } from 'kue'; // Correctly import the createQueue function from kue

// Job data for notifications
const jobs = [
  { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
  { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
  { phoneNumber: '4153518743', message: 'This is the code 4321 to verify your account' },
  { phoneNumber: '4153538781', message: 'This is the code 4562 to verify your account' },
  { phoneNumber: '4153118782', message: 'This is the code 4321 to verify your account' },
  { phoneNumber: '4153718781', message: 'This is the code 4562 to verify your account' },
  { phoneNumber: '4159518782', message: 'This is the code 4321 to verify your account' },
  { phoneNumber: '4158718781', message: 'This is the code 4562 to verify your account' },
  { phoneNumber: '4153818782', message: 'This is the code 4321 to verify your account' },
  { phoneNumber: '4154318781', message: 'This is the code 4562 to verify your account' },
  { phoneNumber: '4151218782', message: 'This is the code 4321 to verify your account' }
];

const queue = createQueue(); // Initialize the job queue

/**
 * Create and enqueue a notification job.
 * @param {string} phoneNumber The recipient's phone number.
 * @param {string} message The notification message.
 * Handles job lifecycle events including completion and failure.
 */
const createJob = (phoneNumber, message) => {
  const job = queue.create('push_notification_code_2', {
    phoneNumber,
    message
  }).save((err) => {
    if (err) {
      console.error(`Error creating job: ${err}`);
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

  // Register event handlers for job lifecycle
  job.on('complete', () => console.log(`Notification job ${job.id} completed`))
     .on('failed', err => console.error(`Notification job ${job.id} failed: ${err}`))
     .on('progress', progress => console.log(`Notification job ${job.id} ${progress}% complete`));
};

// Iterate over each job in the array and create a notification job for each
jobs.forEach(({ phoneNumber, message }) => createJob(phoneNumber, message));
