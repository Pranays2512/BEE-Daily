const express = require('express');
const { Queue, Worker} = require('bullmq');
const app = express();
const PORT = 3000;

app.use(express.json());

const predictQueue = new Queue('predict', {
  connection: {
    host: '127.0.0.1',
    port: 6379
  }
});


async function addJobs() {
  const job1 = await predictQueue.add('myJobName', { foo: 'bar' });
  const job2 = await predictQueue.add('myJobName', { qux: 'baz' });
  return [job1, job2];
}

// addJobs()
//   .then((jobs) => {
//     console.log('Jobs added successfully:', jobs.map(j => j.id));
//   })
//   .catch((err) => {
//     console.error('Error adding jobs:', err);
//   });
  //consumer----->worker
  const myWorker = new Worker('predict', async job => {
    console.log(job.id);
  }, {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
