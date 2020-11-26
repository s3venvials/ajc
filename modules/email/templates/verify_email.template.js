const keys = require("../../../config/keys");

const verifyEmailNotification = (sender, recipient, passCode) => {
    return {
        to: recipient,
        from: sender,
        subject: 'Average Joe Coding Email Confirmation',
        html: `
            <div>
                   
                    <p>Please copy and paste the pass code below to verify your account.</p>
                    <h4>${passCode}</h4>
                    <br />
                    <br />
                    <small>AJC | Phoenix, AZ 85004</small>
            </div>
            `
    };
}

module.exports = { verifyEmailNotification };