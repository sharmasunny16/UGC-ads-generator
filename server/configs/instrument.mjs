import * as Sentry from "@sentry/node" 


Sentry.init({
  dsn: "https://99fe7ed7c6dc8a6980bbe57c76e85ef8@o4510865497325568.ingest.us.sentry.io/4510865503551488",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});