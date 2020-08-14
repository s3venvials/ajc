let { execFileSync } = require("child_process");
let fs = require("fs");

let CodeRunner = (userId, code) => {

    if (!userId) throw "User id is required!";
    if (!code) throw "Nothing to run here!";

    try {
        fs.writeFileSync(`${userId}_code.js`, code);
        output = execFileSync("node", [`./${userId}_code.js`], { timeout: 1000 });
        fs.unlinkSync(`./${userId}_code.js`);
        return output.toString("utf-8");
    } catch (error) {
        console.log(error)
        console.log("Command failed");
    }
}

console.log(CodeRunner("123", "for(var i = 0; i < 10000; i++) { console.log(i); }"));

module.exports = { CodeRunner };