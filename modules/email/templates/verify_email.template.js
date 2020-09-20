const keys = require("../../../config/keys");

let verifyEmailTemplate = (sender, recipient, id) => {
    return {
        to: recipient,
        from: sender,
        subject: 'Average Joe Coding Email Confirmation',
        html: `
            <div>
                   
                    <p>Please click on the following link to verify and confirm your email address with AverageJoeCoding.com.</p>
                    <a href="${keys.hostURI}/verify_email/${id}" id="confirmEmailLink">Confirm Email!</a>
                    <br />
                    <br />
                    <small>AJC | Phoenix, AZ 85004</small>
            </div>
            `
    };
}

module.exports = { verifyEmailTemplate };