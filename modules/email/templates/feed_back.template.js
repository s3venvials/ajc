const keys = require("../../../config/keys");

const feedBackNotification = (sender, recipient, response, other) => {
  return {
    to: recipient,
    from: sender,
    subject: "Average Joe Coding Feed Back",
    html: `
            <div>
                   
                    <h4>
                      ${response}
                      ${other}
                    </h4>
                    
                    <br />
                    <br />
                    <small>AJC | Phoenix, AZ 85004</small>
            </div>
            `,
  };
};

module.exports = { feedBackNotification };
