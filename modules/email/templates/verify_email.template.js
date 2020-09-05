const keys = require("../../../config/keys");

let verifyEmailTemplate = (sender, recipient) => {
    return {
        to: recipient.email,
        from: sender,
        subject: 'Average Joe Coding Email Confirmation',
        html: `
            <h2>
                <img src="https://res.cloudinary.com/frontndev/image/upload/c_scale,h_62,w_120/v1590360607/ajc_ud2rkr.png" alt="AJC"/>
                AJC
            </h2>

            <div style="border: 1px solid #EEE; border-radius: 25px; text-align: center; margin: 0 2em">
                <div style="padding: 2em; margin: 0 4em">

                    <h3 style="color: orangered">AJC Email Confirmation</h3>

                    <strong>
                        Hello ${recipient.firstName},<br />
                        Please click on the following link to verify and confirm your email address with AverageJoeCoding.com. 
                        <a href=${keys.hostURI.URL}/api/user/verify/>Confirm Email!</a>
                    </strong>
                    <br />
                    <br />
                    <small>AJC | Phoenix, AZ 85004</small>
                </div>
            </div>
            `
    };
}

module.exports = { verifyEmailTemplate };