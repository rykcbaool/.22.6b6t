// util.js
let startTime = Date.now();

const spam_count = {};
const temp_blacklist = new Map();
const spam_offenses = {};
const whitelist = ['Damix2131', 'q33a', 'ryk_cbaool'];

function get_uptime() {
    const now = Date.now();
    const uptime = now - startTime;

    const totalSeconds = Math.floor(uptime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
}

function random_element(arr) {
    return String(arr[Math.floor(Math.random() * arr.length)]);
}

function get_random_ip() {
    const array = [];
    for (let i = 0; i < 4; i++) {
        array.push(Math.floor(Math.random() * 256));
    }
    const [a, b, c, d] = array;
    return `${a}.${b}.${c}.${d}`;
}

function return_user(msg) {
    let no_rank_message = '';
    let get_username = '';

    if (msg.startsWith('[')) {
        no_rank_message = msg.split(']')[1];
        get_username = no_rank_message.split('»')[0];
    } else if (msg.includes('whispers')) {
        get_username = msg.split('whispers')[0];
    } else {
        get_username = msg.split('»')[0];
    }

    return get_username?.trim() || '';
}

function whitelisted_users(user) {
    return whitelist.includes(user.trim());
}

function blacklist(bot, user) {
    if (temp_blacklist.has(user)) return;

    if (!spam_offenses[user]) spam_offenses[user] = 1;
    else spam_offenses[user]++;

    if (spam_offenses[user] >= 6) spam_offenses[user] = 6;

    const minutes = spam_offenses[user] * 5;
    const duration = minutes * 60 * 1000;

    temp_blacklist.set(user, true);
    bot.whisper(user, `Blacklisted for spamming (${minutes} minutes).`);

    setTimeout(() => {
        temp_blacklist.delete(user);
        bot.whisper(user, "You're no longer blacklisted.");
    }, duration);
}

function checkSpam(bot, user) {
    if (!spam_count[user]) {
        spam_count[user] = 1;
    } else {
        spam_count[user]++;
    }

    setTimeout(() => {
        if (spam_count[user]) {
            spam_count[user]--;
            if (spam_count[user] <= 0) delete spam_count[user];
        }
    }, 5000);

    if (spam_count[user] >= 5) {
        spam_count[user] = 0;
        blacklist(bot, user);
        return true;
    }
    return false;
}

module.exports = {
    get_uptime,
    random_element,
    get_random_ip,
    return_user,
    whitelisted_users,
    blacklist,
    checkSpam,
    spam_count,
    temp_blacklist,
    spam_offenses,
    whitelist,
};
