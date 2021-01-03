const verifyEmailNotification = (sender, recipient, passCode) => {
  return {
    to: recipient,
    from: sender,
    subject: "Average Joe Coding Email Confirmation",
    html: `
    <div style="text-align: center; max-width: 450px; border: 1px solid #CCC; border-radius: 25px">
        <div style="padding: 1em">

            <img src="https://res.cloudinary.com/frontndev/image/upload/c_scale,h_225,w_425/v1609613062/ajc_white_bg_kssl4h.png" alt="AJC"/>

            <h3>Thanks for taking an iterest in our content!</h3>
    
            <p>Please use the code below to verify your email account and to be added to our mailing list.</p>
    
            <h4>${passCode}</h4>
    
            <p>By confirming your email you agree to receive emails in regards to new reads posts. You can opt-out at any time by selecting the unsubscribe link when receiving a new read notification.</p>
    
            <p>AJC will only use your email to add to a mailing list so that you are notified of when a new reads post is created.</p>
    
            <h1 style="color: #0065fd">AJC</h1>
        </div>
    </div>
    `,
  };
};

module.exports = { verifyEmailNotification };
