const fs = require('fs');
const path = './blacklist.json';

function getBlacklist() {
    if (!fs.existsSync(path)) return [];
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function isBlacklisted(username) {
    const blacklist = getBlacklist();
    return blacklist.includes(username.toLowerCase());
}

function addToBlacklist(username) {
    const blacklist = getBlacklist();
    const name = username.toLowerCase();
    if (!blacklist.includes(name)) {
        blacklist.push(name);
        fs.writeFileSync(path, JSON.stringify(blacklist, null, 2));
    }
}

function removeFromBlacklist(username) {
    let blacklist = getBlacklist();
    const name = username.toLowerCase();
    if (blacklist.includes(name)) {
        blacklist = blacklist.filter(u => u !== name);
        fs.writeFileSync(path, JSON.stringify(blacklist, null, 2));
    }
}

module.exports = {
    getBlacklist,
    isBlacklisted,
    addToBlacklist,
    removeFromBlacklist
};
