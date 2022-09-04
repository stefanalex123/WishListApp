import nodeCron from "node-cron"

const job2 = nodeCron.schedule("* * * * *", function jobYouNeedToExecute() {
    // Do whatever you want in here. Send email, Make  database backup or download data.
    console.log("TEST");
  });

  export default job2;