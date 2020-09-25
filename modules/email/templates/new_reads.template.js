const keys = require("../../../config/keys");

const newReadsNotification = (sender, recipient, id, title) => {
    return {
        to: recipient,
        from: sender,
        subject: 'Average Joe Coding New Reads',
        html: `
            <div>
                   
                    <p>Hey, just wanted to let you know we posted a new reads post! Come check it out by clicking on the below link!</p>
                    <a href="${keys.hostURI}/reads/${id}/${title}" id="newReadsLink">Go to new reads</a>
                    <br />
                    <br />
                    <small>AJC | Phoenix, AZ 85004</small>
            </div>
            `
    };
}

module.exports = { newReadsNotification };