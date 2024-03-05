import { createQueue } from 'kue'; // Import the necessary function from the kue library

/**
 * Creates and enqueues push notification jobs.
 * @param {Array} jobs - An array of job data objects to be processed.
 * @param {Object} queue - The Kue queue object on which jobs will be created.
 * Throws an error if the input is not an array, ensuring job data integrity.
 */
function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs parameter is not an array');
    }

    jobs.forEach((jobData) => {
        // Create a new job in the queue with specified type and data
        const newJob = queue.create('push_notification_code_3', jobData)
            .on('complete', () => {
                // Log completion of job with its ID for tracking
                console.log(`Notification job ${newJob.id} completed`);
            })
            .on('failed', (err) => {
                // Log failure of job with its ID and error message for troubleshooting
                console.log(`Notification job ${newJob.id} failed: ${err}`);
            })
            .on('progress', (progress) => {
                // Log progress of job with its ID for real-time monitoring
                console.log(`Notification job ${newJob.id} ${progress}% complete`);
            });

        // Save the job to the queue, logging its creation for audit or confirmation
        newJob.save((err) => {
            if (!err) console.log(`Notification job created: ${newJob.id}`);
        });
    });
}

export default createPushNotificationsJobs; // Export the function for use in other parts of the application
