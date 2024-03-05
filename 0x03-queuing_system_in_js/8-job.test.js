const { expect } = require('chai'); // Chai assertion library for testing
import { createQueue } from 'kue'; // Import function to create a queue
import createPushNotificationsJobs from './8-job'; // Import the function to be tested

const queue = createQueue(); // Initialize the queue

describe('createPushNotificationsJobs', () => {
  // Enter test mode before running tests to prevent actual job processing
  before(() => queue.testMode.enter());

  // Clear the queue after each test to ensure a clean state
  afterEach(() => queue.testMode.clear());

  // Exit test mode after all tests have run to cleanup
  after(() => queue.testMode.exit());

  // Test case for validating job creation functionality
  it('validates job creation', () => {
    const list = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
    ];
    // Create push notification jobs from a list of job data
    createPushNotificationsJobs(list, queue);
    // Assert that one job has been added to the queue
    expect(queue.testMode.jobs.length).to.equal(1);
    // Assert the job type is correctly set
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    // Assert the job data matches the input
    expect(queue.testMode.jobs[0].data).to.eql(list[0]);
  });

  // Test case for ensuring input validation catches non-array job lists
  it('displays error if jobs is not an array', () => {
    // Assert that passing a non-array argument throws the expected error
    expect(() => createPushNotificationsJobs('hello', queue)).to.throw('Jobs is not an array');
  });

  // Test case for verifying the job type is correctly assigned
  it('adds to queue with the correct type', () => {
    const list = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
    ];
    // Create push notification jobs to test job type
    createPushNotificationsJobs(list, queue);
    // Assert the first job in the queue has the correct type
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
  });
});
