const keys = require("../../../config/keys");

const newReadsNotification = (sender, recipient, id, title, userId) => {
  return {
    to: recipient,
    from: sender,
    subject: "Average Joe Coding New Reads",
    html: `
            <div>
                   
                    <h6>
                      Hey, just wanted to let you know we posted a new reads post! Come check it out by clicking on the following link! 
                      <a href="${keys.hostURI}/reads/${id}/${title}" id="newReadsLink">Go to new reads</a>
                    </h6>
                    
                    <br />
                    <a href="${keys.hostURI}/unsubscribe/${userId}">Unsubscribe</a>
                    <br />
                    <small>AJC | Phoenix, AZ 85004</small>
            </div>
            `,
  };
};

module.exports = { newReadsNotification };
