let { execFileSync } = require("child_process");
let fs = require("fs");

let CodeRunner = (userId, code) => {

    if (!userId) throw "User id is required!";
    if (!code) throw "Nothing to run here!";
    
    try {
        fs.writeFileSync(`${userId}_code.js`, code);
        output = execFileSync("node", [`./${userId}_code.js`]);
        fs.unlinkSync(`./${userId}_code.js`);
        return output;
    } catch (error) {
        console.log("Command failed");
    }
}

module.exports = { CodeRunner };