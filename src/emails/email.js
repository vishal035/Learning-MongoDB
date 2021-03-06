const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// console.log(process.env.SENDGRIDAPIKEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'vishalkumar880288@gmail.com',
    subject: `Thanks for joining in ${name}`,
    text: `Hi, ${name}\nWellcome to the Task-Manager App of its Alpha stage.\nLet me know any problem you face even if it's to count the stars from the diffrent galaxy..😅`,
  });
};

const cancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'vishalkumar880288@gmail.com',
    subject: `Thanks ${name} for beingthe part of our family`,
    text: `Hi, ${name}\nHope your day's are going well, we are waiting for u & we have never abandoned or let go any of our family members`,
  });
};

module.exports = { sendWelcomeEmail, cancellationEmail };
