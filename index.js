// index.js
const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer);

const utils = require('./util');
const createCommands = require('./commands');
const registerEvents = require('./events');

function startup() {
    const PASSWORD = process.env.MC_PASSWORD;
    const prefix = '*';

    const bot = mineflayer.createBot({
        host: 'eu.6b6t.org',
        port: 25565,
        username: 'CoolDudeBot',
        version: '1.19.4',
        keepAlive: true,
    });

    bot.loadPlugin(tpsPlugin);

    const state = {
        PASSWORD,
        prefix,
        loggedIn: false,
        spawnedIn: 0,
        global_deaths: 0,
        deaths: 0,
        hotspot_death: false,
        crystalled: 0,
        server_restart: 0,
        crystal_kills: {},
        crystal_deaths: {},
        quotes: {},
        scan_hotspot: false,
        auto_tp: false,
        tips_started: false,
        welcomer: false,
        bot_uses: 0,
        bot_tips_sent: 0,
        ads_seen: 0,
        dupe_mentioned: 0,
        temp_blacklist: utils.temp_blacklist,
        spam_count: utils.spam_count,
        spam_offenses: utils.spam_offenses,
        restart: true,
        whitelist: utils.whitelist,
        whitelisted_users: utils.whitelisted_users,
        get_uptime: utils.get_uptime,
        random_element: utils.random_element,
        get_random_ip: utils.get_random_ip,
        return_user: utils.return_user,
        checkSpam: utils.checkSpam,
        blacklist: utils.blacklist,
        sizes: ["A", "B", "C", "D", "DD", "E", "F", "G", "H", "Z"],
        answers: [
            "Yes", "No", "Maybe", "Definitely", "Try again later",
            "Absolutely", "Not a chance", "Don't count on it", "Looks good", "Sus"
        ],
        spam_messages: [
            "Want to check who has got more kills? Try -topkills!",
            "Curious about the bot's health? Use -health!",
            "Feeling lucky? Roll a dice with -roll!",
            "Can't decide? Use -choose option1, option2...",
            "Flip a coin with -flip!",
            "Need a quick ping test? Try -ping!",
            "Ask the magic 8-ball your question with -8ball!",
            "Curious about boob sizes? Try -boobs username!",
            "Want your own command? Suggest it at discord.gg/mjrDsGCV7F!"
        ],
        blacklisted_messages: [
            '---------------------------',
            'players sleeping',
            'You can vote! Type /vote to get more homes, lower cooldowns & white username color!',
            'Remember to /vote'
        ],
        responses: {
            "You are not allowed to teleport while in the 5000x5000 overworld spawn area!": () => {
                bot.chat("I can't teleport currently.");
            }
        }
    };

    // Load commands and assign to state
    const { public_commands, admin_commands } = require('./commands');
    state.public_commands = public_commands;
    state.admin_commands = admin_commands;

    // Register event listeners with bot and state
    registerEvents(bot, state);

    // Expose startup globally for reconnect on disconnect
    global.startup = startup;
}

startup();

