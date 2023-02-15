const Role = require("../model/Role");
async function getStates() {
    let res = await Role.findOne();
    return res;

}
module.exports = {
    getStates
}