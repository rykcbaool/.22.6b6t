const { bot, whitelisted_users, random_element, get_random_ip, get_uptime, crystal_kills, crystalled, deaths, global_deaths, crystal_deaths, quotes, bot_uses, bot_tips_sent, whitelist, sizes, answers, spawnedIn } = require('./util');
const prefix = "?";


const public_commands = {
    [`${prefix}help`]: (user, message, bot) => {
        const isAdmin = whitelisted_users(user);
        let args = message.trim().split(/\s+/);

        const isAdminMode = args[1] === "admin" && isAdmin;
        const pageArg = isAdminMode ? args[2] : args[1];
        const page = parseInt(pageArg) || 1;

        const commandSource = isAdminMode ? commands : public_commands;
        const commandList = Object.keys(commandSource);

        const maxPerPage = 8;
        const totalPages = Math.ceil(commandList.length / maxPerPage);

        if (page < 1 || page > totalPages) {
            return bot.chat(`Invalid page. (${page}/${totalPages})`);
        }

        const startIndex = (page - 1) * maxPerPage;
        const paginated = commandList.slice(startIndex, startIndex + maxPerPage);
        const modeText = isAdminMode ? "Admin" : "Public";

        bot.chat(`${modeText} Commands - Page ${page}/${totalPages}: ${paginated.join(" ")}`);
    },

    [`${prefix}topkills`]: () => {
        const entries = Object.entries(crystal_kills);
        if (entries.length === 0) {
            bot.chat(`Amount of people crystalled since join: ${crystalled}`)
        } else {
            const [topUser, topKills] = entries.sort((a, b) => b[1] - a[1])[0];
            bot.chat(`Amount of people crystalled since join: ${crystalled}, Most kills has: ${topUser} with ${topKills} kills`);
        }
        console.log(crystal_kills)
    },

    [`${prefix}uptime`]: () => bot.chat(`Uptime: ${get_uptime()}`),
    [`${prefix}deaths`]: () => bot.chat(`Bot ${deaths}, Global: ${global_deaths}`),
    [`${prefix}health`]: () => bot.chat(`Bot has ${bot.health.toFixed(1)} hearts`),

    [`${prefix}rape`]: (user, message, bot) => {
        let args = message.split(`${prefix}rape `)[1]

        if (args && args.trim().length > 0) {
            bot.chat(`${user} rapes ${args}`)
        } else {
            bot.chat(`Usage: ${prefix}rape (victim)`)
        }
    },

    [`${prefix}jew`]: (user, message, bot) => {
        let args = message.split(`${prefix}jew `)[1]
        let jewish = Math.floor(Math.random() * 100)

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            if (args.toLowerCase() === 'qbasty') {
                jewish = Math.floor(Math.random() * 31) + 70;
            }
            bot.chat(`${args} is ${jewish}% jewish`)
        } else {
            bot.chat(`${user} is ${jewish}% jewish`)
        }
    },

    [`${prefix}indian`]: (user, message, bot) => {
        let args = message.split(`${prefix}indian `)[1]
        const indian = Math.floor(Math.random() * 100)

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            bot.chat(`${args} is ${indian}% indian`)
        } else {
            bot.chat(`${user} is ${indian}% indian`)
        }
    },

    [`${prefix}dox`]: (user, message, bot) => {
        let args = message.split(`${prefix}dox `)[1]

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            bot.chat(`${args}'s ip is ${get_random_ip()}!! Send them an pizza to their doorstep!`)
        } else {
            bot.chat(`Usage: ${prefix}dox (victim)`)
        }
    },

    [`${prefix}pp`]: (user, message, bot) => {
        let args = message.split(`${prefix}pp `)[1];
        const size = "=".repeat(Math.floor(Math.random() * 50));

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            bot.chat(`${args}'s dick: 8${size}D`);
        } else {
            bot.chat(`${user}'s dick: 8${size}D`);
        }
    },

    [`${prefix}iq`]: (user, message, bot) => {
        let args = message.split(`${prefix}iq `)[1];
        const iq = Math.floor(Math.random() * 160) + 40;

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            bot.chat(`${args}'s IQ is ${iq}`);
        } else {
            bot.chat(`${user}'s IQ is ${iq}`);
        }
    },

    [`${prefix}kys`]: (user, message, bot) => {
        let args = message.split(`${prefix}kys `)[1];

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            bot.chat(`Go kill yourself ${args}`);
        } else {
            bot.chat(`Usage: ${prefix}kys (user)`);
        }
    },

    [`${prefix}gay`]: (user, message, bot) => {
        let args = message.split(`${prefix}gay `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            if (args.toLowerCase() === 'qbasty') {
                percent = Math.floor(Math.random() * 31) + 70;
            }
            bot.chat(`${args} is ${percent}% gay`);
        } else {
            bot.chat(`${user} is ${percent}% gay`);
        }
    },

    [`${prefix}furry`]: (user, message, bot) => {
        let args = message.split(`${prefix}furry `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            if (args.toLowerCase() === 'qbasty') {
                percent = Math.floor(Math.random() * 31) + 70;
            }
            bot.chat(`${args} is ${percent}% furry`);
        } else {
            bot.chat(`${user} is ${percent}% furry`);
        }
    },

    [`${prefix}trans`]: (user, message, bot) => {
        let args = message.split(`${prefix}trans `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            if (args.toLowerCase() === 'qbasty') {
                percent = Math.floor(Math.random() * 31) + 70;
            }
            bot.chat(`${args} is ${percent}% trans`);
        } else {
            bot.chat(`${user} is ${percent}% trans`);
        }
    },

    [`${prefix}retard`]: (user, message, bot) => {
        let args = message.split(`${prefix}retard `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            if (args.toLowerCase() === 'qbasty') {
                percent = Math.floor(Math.random() * 31) + 70;
            }
            bot.chat(`${args} is ${percent}% retarded`);
        } else {
            bot.chat(`${user} is ${percent}% retarded`);
        }
    },

    [`${prefix}femboy`]: (user, message, bot) => {
        let args = message.split(`${prefix}femboy `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            if (args.toLowerCase() === 'qbasty') {
                percent = Math.floor(Math.random() * 31) + 70;
            }
            bot.chat(`${args} is ${percent}% femboy`);
        } else {
            bot.chat(`${user} is ${percent}% femboy`);
        }
    },

    [`${prefix}nigger`]: (user, message, bot) => {
        let args = message.split(`${prefix}nigger `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            if (args.toLowerCase() === 'qbasty') {
                percent = Math.floor(Math.random() * 31) + 70;
            }
            bot.chat(`${args} is ${percent}% nigger`);
        } else {
            bot.chat(`${user} is ${percent}% nigger`);
        }
    },

    // Uncomment and complete if needed
    // [`${prefix}kit`]: (user, message, bot) => {
    //   let args = message.split(`${prefix}kit `)[1];

    //   if (args && args.trim().length > 0) {
    //     if (kits.includes(args)) {
    //       bot.chat(`${user} has received kit ${args}`)
    //     } else if (args.toLowerCase() === 'help') {
    //       bot.chat(`Avaiable kits: ${kits.join(', ')}`)
    //     } else {
    //       bot.chat(`Invalid Kit!, Use: ${kits.join(', ')}`)
    //     }
    //   } else {
    //     bot.chat(`Please pick an Kit you want to use with ${prefix}kit help`)
    //   }
    // },

    [`${prefix}lesbian`]: (user, message, bot) => {
        let args = message.split(`${prefix}lesbian `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = random_element(players);
        }

        if (args && args.trim().length > 0) {
            if (args.toLowerCase() === 'qbasty') {
                percent = Math.floor(Math.random() * 31) + 70;
            }
            bot.chat(`${args} is ${percent}% lesbian`);
        } else {
            bot.chat(`${user} is ${percent}% lesbian`);
        }
    },

    [`${prefix}boobs`]: (user, message, bot) => {
        let args = message.split(`${prefix}boobs `)[1];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        const target = (args && args.trim()) || user;
        bot.chat(`${target} has ${randomSize}-cup boobs`);
    },

    [`${prefix}8ball`]: (user, message, bot) => {
        const response = random_element(answers);
        bot.chat(`[8-ball] ${response}`);
    },

    [`${prefix}roll`]: () => {
        const rolled = Math.floor(Math.random() * 5) + 1;
        bot.chat(`[Dice] Rolled a ${rolled}`);
    },

    [`${prefix}flip`]: () => {
        const result = Math.random() < 0.5 ? "Heads" : "Tails";
        bot.chat(`[CoinFlip] It's ${result}`);
    },

    [`${prefix}choose`]: (user, message, bot) => {
        let args = message.split(`${prefix}choose `)[1];
        if (!args) return bot.chat(`Usage: ${prefix}choose option1, option2, ...`);
        const options = args.split(" ").map(x => x.trim()).filter(Boolean) || args.split(",").map(x => x.trim()).filter(Boolean);
        if (options.length < 2) return bot.chat("Give me at least 2 choices.");
        const choice = random_element(options);
        bot.chat(`I choose: ${choice}`);
    },

    [`${prefix}playerlist`]: () => {
        const players = Object.keys(bot.players);
        if (players.length === 0) {
            bot.chat("No players online.");
        } else {
            bot.chat(`Players in-game: ${players}`);
        }
    },

    [`${prefix}tps`]: () => {
        const tps = bot.getTps()
        bot.chat(`Server TPS: ${tps}`);
    },

    [`${prefix}ping`]: () => {
        if (bot.player && typeof bot.player.ping === "number") {
            bot.chat(`Ping: ${bot.player.ping}ms`);
        } else {
            bot.chat("Ping info not available.");
        }
    },

    [`${prefix}kd`]: (user, message, bot) => {
        let args = message.split(`${prefix}kd `)[1];
        if (args && args.trim().length > 0) {

            if (args === 'random') {
                const players = Object.keys(bot.players)
                args = random_element(players);
            }
            const target = args.trim();

            // Check if player exists in kills or deaths
            const hasKills = crystal_kills.hasOwnProperty(target);
            const hasDeaths = crystal_deaths.hasOwnProperty(target);

            if (hasKills || hasDeaths) {
                const kills = crystal_kills[target] || 0;
                const deaths = crystal_deaths[target] || 0;
                const kd = deaths === 0 ? kills : (kills / deaths).toFixed(2);

                bot.chat(`${target} has ${kills} kill${kills !== 1 ? 's' : ''} and ${deaths} death${deaths !== 1 ? 's' : ''}. KD: ${kd}`);
            } else {
                bot.chat(`Player ${target} has no recorded kills or deaths.`);
            }
        } else {
            bot.chat(`Usage: ${prefix}kd <username>`);
        }
    },

    [`${prefix}quote`]: (user, message, bot) => {
        let args = message.split(`${prefix}quote `)[1];

        if (args && args.trim().length > 0) {
            if (args === 'random') {
                const players = Object.keys(bot.players)
                args = random_element(players);
            }
            const target = args.trim();

            if (quotes[target] && quotes[target].length > 0) {
                const randomQuote = quotes[target][Math.floor(Math.random() * quotes[target].length)];
                bot.chat(`Quote from ${target}: "${randomQuote}"`);
            } else {
                bot.chat(`No quotes found for ${target}.`);
            }
        } else {
            bot.chat(`Usage: ${prefix}quote <username>`);
        }
    },

    [`${prefix}stats`]: () => {
        bot.chat(`Bot uses: ${bot_uses}, Bot tips sent: ${bot_tips_sent}. Thank you for using my bot :3`)
    }
}

const admin_commands = {
    // Uncomment and fill if needed
    // ":tp": (user) => bot.chat(`/tpa ${user}`),
    // ":scan": () => {
    //   auto_tp = !auto_tp;
    //   bot.chat(`Scanner is now ${auto_tp ? "ON" : "OFF"}!`);
    // },
    // ":pos": () => {
    //   const pos = bot.entity.position;
    //   bot.chat(`My position is: ${Math.floor(pos.x)} X, ${Math.floor(pos.y)} Y, ${Math.floor(pos.z)} Z!`);
    // },
    // ":hotspot": () => {
    //   scan_hotspot = !scan_hotspot;
    //   bot.chat(`Hotspot logger is now ${scan_hotspot ? "ON" : "OFF"}!`);
    // },

    [`${prefix}debug`]: (user) => {
        const loadedEntities = Object.keys(bot.entities).length;
        const loadedChunks = Object.keys(bot.world?.chunks || {}).length;
        const openWindow = bot.currentWindow?.title || 'none';
        const creativeMode = bot.game?.gameMode === 1 ? 'Yes' : 'No';
        const flying = bot.entity?.onGround === false ? 'Yes' : 'No';
        const heldItem = bot.heldItem ? bot.heldItem.name : 'None';

        const memoryUsageMB = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        const status = `Spawned: ${spawnedIn} times | Entities: ${loadedEntities} | Loaded Chunks: ${loadedChunks} | Open GUI: ${openWindow} | Creative: ${creativeMode} | Flying: ${flying} | Held Item: ${heldItem} | Heap Memory: ${memoryUsageMB} MB`;

        bot.chat(`/msg ${user} ${status}`);
    },

    [`${prefix}run`]: (user, message, bot) => {
        const message_to_run = message.split(`${prefix}run `)[1];
        const blacklist = ["/ignore", "/delhome", "/freecam", "/balloons", "/tpy"];
        if (!blacklist.some(cmd => message_to_run.includes(cmd))) {
            bot.chat(message_to_run);
        } else {
            bot.chat("Blacklisted command!");
        }
    },

    [`${prefix}say`]: (user, message, bot) => {
        const message_to_run = message.split(`${prefix}say `)[1];
        bot.chat(` ${message_to_run}`) // space at start doesn't let any commands to run
    },

    [`${prefix}tempwl`]: (user, message, bot) => {
        let args = message.split(`${prefix}tempwl `)[1];
        whitelist.push(String(args))
        console.log(`Whitelisted ${args}.`)
        bot.chat(`/msg ${user} Whitelisted ${args}.`)
    },

    [`${prefix}remwl`]: (user, message, bot) => {
        let args = message.split(`${prefix}remwl `)[1];
        if (args.toLowerCase() !== 'damix2131') {
            if (!whitelist.includes(args)) {
                bot.whisper(user, `${args} is not in the whitelist.`);
                return;
            }

            whitelist.filter(p => p !== args);
            console.log(`Removed ${args} from whitelist.`)
            bot.chat(`/msg ${user} Removed ${args} from whitelist.`)
        }
    }
}

module.exports = { public_commands, admin_commands };
