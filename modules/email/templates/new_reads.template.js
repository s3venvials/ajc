const keys = require("../../../config/keys");

const newReadsNotification = (sender, recipient, read, userId) => {
  return {
    to: recipient,
    from: sender,
    subject: "Average Joe Coding New Reads",
    html: `
    <div style="text-align: center; max-width: 450px; border: 1px solid #CCC; border-radius: 25px">
      <div style="padding: 1em">

        <img src="https://res.cloudinary.com/frontndev/image/upload/c_scale,h_225,w_425/v1609613062/ajc_white_bg_kssl4h.png" alt="AJC"/>
                   
        <h4>
          Hey, just wanted to let you know we posted a new reads post! 
        </h4>

        <h4>Title: ${read.title}</h4>

        <p>${read.content.slice(0, 100)}...</p>

        Come check it out by clicking on the following link or if you don't trust links like us then simply go to the reads page and search by the title of the read! 
        <a href="${keys.hostURI}/reads/${read.id}/${read.title}" id="newReadsLink">Go to new reads</a>
        
        <p><a href="${keys.hostURI}/unsubscribe/${userId}">Unsubscribe</a></p>

        <h1 style="color: #0065fd">AJC</h1>

      </div>
    </div>
    `,
  };
};

module.exports = { newReadsNotification };
