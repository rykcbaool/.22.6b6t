// commands.js
//const { bot, whitelisted_users, state.random_element, get_random_ip, get_uptime, crystal_kills, crystalled, deaths, global_deaths, crystal_deaths, quotes, bot_uses, bot_tips_sent, whitelist, sizes, answers, spawnedIn, welcomer } = require('./util');
const prefix = "-";

const public_commands = {
    [`${prefix}help`]: (user, message, bot, state) => {
        const isAdmin = state.whitelisted_users(user);
        let args = message.trim().split(/\s+/);

        const isAdminMode = args[1] === "admin" && isAdmin;
        const pageArg = isAdminMode ? args[2] : args[1];
        const page = parseInt(pageArg) || 1;

        const commandSource = isAdminMode ? admin_commands : public_commands;
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

    [`${prefix}topkills`]: (user, message, bot, state) => {
        const entries = Object.entries(state.crystal_kills);
        if (entries.length === 0) {
            bot.chat(`Amount of people crystalled since join: ${state.crystalled}`)
        } else {
            const [topUser, topKills] = entries.sort((a, b) => b[1] - a[1])[0];
            bot.chat(`Amount of people crystalled since join: ${state.crystalled}, Most kills has: ${topUser} with ${topKills} kills`);
        }
    },

    [`${prefix}uptime`]: (user, message, bot, state) => bot.chat(`Uptime: ${state.get_uptime()}`),
    [`${prefix}deaths`]: (user, message, bot, state) => bot.chat(`Bot ${state.deaths}, Global: ${state.global_deaths}`),
    [`${prefix}health`]: (user, message, bot, state) => bot.chat(`Bot has ${bot.health.toFixed(1)} hearts`),

    [`${prefix}rape`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}rape `)[1]

        if (args && args.trim().length > 0) {
            bot.chat(`${user} rapes ${args}`)
        } else {
            bot.chat(`Usage: ${prefix}rape <username>`)
        }
    },

    [`${prefix}jew`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}jew `)[1]
        let jewish = Math.floor(Math.random() * 100)

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
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

    [`${prefix}indian`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}indian `)[1]
        const indian = Math.floor(Math.random() * 100)

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
        }

        if (args && args.trim().length > 0) {
            bot.chat(`${args} is ${indian}% indian`)
        } else {
            bot.chat(`${user} is ${indian}% indian`)
        }
    },

    [`${prefix}dox`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}dox `)[1]

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
        }

        if (args && args.trim().length > 0) {
            bot.chat(`${args}'s ip is ${state.get_random_ip()}!! Send them an pizza to their doorstep!`)
        } else {
            bot.chat(`Usage: ${prefix}dox <username>`)
        }
    },

    [`${prefix}pp`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}pp `)[1];
        const size = "=".repeat(Math.floor(Math.random() * 50));

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
        }

        if (args && args.trim().length > 0) {
            bot.chat(`${args}'s dick: 8${size}D`);
        } else {
            bot.chat(`${user}'s dick: 8${size}D`);
        }
    },

    [`${prefix}iq`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}iq `)[1];
        const iq = Math.floor(Math.random() * 160) + 40;

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
        }

        if (args && args.trim().length > 0) {
            bot.chat(`${args}'s IQ is ${iq}`);
        } else {
            bot.chat(`${user}'s IQ is ${iq}`);
        }
    },

    [`${prefix}kys`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}kys `)[1];

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
        }

        if (args && args.trim().length > 0) {
            bot.chat(`Go kill yourself ${args}`);
        } else {
            bot.chat(`Usage: ${prefix}kys <username>`);
        }
    },

    [`${prefix}gay`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}gay `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
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

    [`${prefix}furry`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}furry `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
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

    [`${prefix}trans`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}trans `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
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

    [`${prefix}retard`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}retard `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
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

    [`${prefix}femboy`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}femboy `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
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

    [`${prefix}nigger`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}nigger `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
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
    // [`${prefix}kit`]: (user, message, bot, state) => {
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

    [`${prefix}lesbian`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}lesbian `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
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

    [`${prefix}turkish`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}turkish `)[1];
        let percent = Math.floor(Math.random() * 101);

        if (args === 'random') {
            const players = Object.keys(bot.players)
            args = state.random_element(players);
        }

        if (args && args.trim().length > 0) {
            if (args.toLowerCase() === 'qbasty') {
                percent = Math.floor(Math.random() * 31) + 70;
            }
            bot.chat(`${args} is ${percent}% turkish`);
        } else {
            bot.chat(`${user} is ${percent}% turkish`);
        }
    },

    [`${prefix}boobs`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}boobs `)[1];
        const randomSize = state.sizes[Math.floor(Math.random() * state.sizes.length)];
        const target = (args && args.trim()) || user;
        bot.chat(`${target} has ${randomSize}-cup boobs`);
    },

    [`${prefix}8ball`]: (user, message, bot, state) => {
        const response = state.random_element(state.answers);
        bot.chat(`[8-ball] ${response}`);
    },

    [`${prefix}dice`]: (user, message, bot, state) => {
        const rolled = Math.floor(Math.random() * 5) + 1;
        bot.chat(`[Dice] Rolled a ${rolled}`);
    },

    [`${prefix}flip`]: (user, message, bot, state) => {
        const result = Math.random() < 0.5 ? "Heads" : "Tails";
        bot.chat(`[CoinFlip] It's ${result}`);
    },

    [`${prefix}choose`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}choose `)[1];
        if (!args) return bot.chat(`Usage: ${prefix}choose option1, option2, ...`);
        const options = args.split(" ").map(x => x.trim()).filter(Boolean) || args.split(",").map(x => x.trim()).filter(Boolean);
        if (options.length < 2) return bot.chat("Give me at least 2 choices.");
        const choice = state.random_element(options);
        bot.chat(`I choose: ${choice}`);
    },

    [`${prefix}playerlist`]: (user, message, bot, state) => {
        const players = Object.keys(bot.players).length;
        if (players.length === 0) {
            bot.chat("No players online.");
        } else {
            bot.chat(`Players in-game: ${players}`);
        }
    },

    [`${prefix}tps`]: (user, message, bot, state) => {
        const tps = bot.getTps()
        bot.chat(`Server TPS: ${tps}`);
    },

    [`${prefix}kd`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}kd `)[1];
        if (args && args.trim().length > 0) {

            if (args === 'random') {
                const players = Object.keys(bot.players)
                args = state.random_element(players);
            }
            const target = args.trim();

            // Check if player exists in kills or deaths
            const hasKills = state.crystal_kills.hasOwnProperty(target);
            const hasDeaths = state.crystal_deaths.hasOwnProperty(target);

            if (hasKills || hasDeaths) {
                const kills = state.crystal_kills[target] || 0;
                const deaths = state.crystal_deaths[target] || 0;
                const kd = deaths === 0 ? kills : (kills / deaths).toFixed(2);

                bot.chat(`${target} has ${kills} kill${kills !== 1 ? 's' : ''} and ${deaths} death${deaths !== 1 ? 's' : ''}. KD: ${kd}`);
            } else {
                bot.chat(`Player ${target} has no recorded kills or deaths.`);
            }
        } else {
            bot.chat(`Usage: ${prefix}kd <username>`);
        }
    },

    [`${prefix}quote`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}quote `)[1];

        if (args && args.trim().length > 0) {
            if (args === 'random') {
                const players = Object.keys(bot.players)
                args = state.random_element(players);
            }
            const target = args.trim();

            if (state.quotes[target] && state.quotes[target].length > 0) {
                const randomQuote = state.quotes[target][Math.floor(Math.random() * state.quotes[target].length)];
                bot.chat(`Quote from ${target}: "${randomQuote}"`);
            } else {
                bot.chat(`No quotes found for ${target}.`);
            }
        } else {
            bot.chat(`Usage: ${prefix}quote <username>`);
        }
    },

    [`${prefix}restart`]: (user, message, bot, state) => {
        let counting = false
        if (state.server_restart !== 0) {
            bot.chat(`Server will restart in approximately: ${state.server_restart} seconds.`)
            counting = true
        } else if (counting && state.server_restart === 0) {
            // bot.chat("Countdown is 0, but server didn't restart, did it?")
        } else {
            bot.chat("Server didn't announce when server restarts.")
        }
    },

    [`${prefix}stats`]: (user, message, bot, state) => {
        bot.chat(`Bot uses: ${state.bot_uses}, Bot tips sent: ${state.bot_tips_sent}, Ads seen: ${state.ads_seen}, word "dupe" mentioned: ${state.dupe_mentioned}`)
    },

    [`${prefix}weather`]: (user, message, bot, state) => {
        let rainState = bot.rainState > 0 ? 'Raining' : 'Clear skies';
        let thunderState = bot.thunderState > 0 ? 'Thunderstorm' : 'No thunder';

        bot.chat(`Weather: ${rainState} | ${thunderState}`);
    },

    [`${prefix}time`]: (user, message, bot, state) => {
        const timeOfDay = bot.time.timeOfDay;
        const day = bot.time.day;

        const timeState = timeOfDay === 0 ? 'Sunrise' :
                        timeOfDay < 6000 ? 'Morning' :
                        timeOfDay === 6000 ? 'Noon' :
                        timeOfDay < 12000 ? 'Afternoon' :
                        timeOfDay === 12000 ? 'Sunset' :
                        timeOfDay < 18000 ? 'Evening' :
                        timeOfDay === 18000 ? 'Midnight' :
                        'Night';

        const moonPhases = [
        'Full Moon', 'Waning Gibbous', 'Third Quarter',
        'Waning Crescent', 'New Moon', 'Waxing Crescent',
        'First Quarter', 'Waxing Gibbous'
        ];
        const moonPhaseIndex = bot.time.moonPhase;
        const moonPhase = moonPhases[moonPhaseIndex] || 'Unknown';

        bot.chat(`Day ${day} | Time: ${timeState} (${Math.floor(timeOfDay)}/24000 ticks) | Moon Phase: ${moonPhase}`);
    },

    // not in use. maybe later

    /*[`${prefix}poll`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}poll `)[1]

        if (args && args.length > 0) {
            let poll_objects = args.includes(', ') ? args.split(', ') : args.split(' ');

            const topic = args[0]
            const option_1 = args[1]
            const option_2 = args[2]
            const time_length = args[3]

            bot.chat(`[POLL] Poll has started!:`)
        }
    },*/

    [`${prefix}discord`]: (user, message, bot, state) => {
        bot.chat(`Official discord server of .22 - https://discord.gg/mjrDsGCV7F`)
    }    
}

const admin_commands = {
    // Uncomment and fill if needed
    // ":tp": (user) => bot.chat(`/tpa ${user}`),
    // ":scan": (user, message, bot, state) => {
    //   auto_tp = !auto_tp;
    //   bot.chat(`Scanner is now ${auto_tp ? "ON" : "OFF"}!`);
    // },
    // ":pos": (user, message, bot, state) => {
    //   const pos = bot.entity.position;
    //   bot.chat(`My position is: ${Math.floor(pos.x)} X, ${Math.floor(pos.y)} Y, ${Math.floor(pos.z)} Z!`);
    // },
    // ":hotspot": (user, message, bot, state) => {
    //   scan_hotspot = !scan_hotspot;
    //   bot.chat(`Hotspot logger is now ${scan_hotspot ? "ON" : "OFF"}!`);
    // },

    [`${prefix}debug`]: (user, command, bot, state) => {
        //const loadedEntities = Object.keys(bot?.entities).length || 'none';
        const loadedChunks = Object.keys(bot.world?.chunks || {}).length;
        const openWindow = bot.currentWindow?.title || 'none';
        const creativeMode = bot.game?.gameMode === 1 ? 'Yes' : 'No';
        const flying = bot.entity?.onGround === false ? 'Yes' : 'No';
        const heldItem = bot.heldItem ? bot.heldItem.name : 'None';
        const botPing = bot.player?.ping

        const memoryUsageMB = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        const status = `Bot-Ping: ${botPing} | Spawned: ${state.spawnedIn} times | Loaded Chunks: ${loadedChunks} | Open GUI: ${openWindow} | Creative: ${creativeMode} | Flying: ${flying} | Held Item: ${heldItem} | Heap Memory: ${memoryUsageMB} MB`;

        bot.chat(`/msg ${user} ${status}`);
    },

    [`${prefix}run`]: (user, message, bot, state) => {
        const message_to_run = message.split(`${prefix}run `)[1];
        const blacklist = ["/ignore", "/delhome", "/freecam", "/balloons", "/tpy"];
        if (!blacklist.some(cmd => message_to_run.includes(cmd))) {
            bot.chat(message_to_run);
        } else {
            bot.chat("Blacklisted command!");
        }
    },

    [`${prefix}say`]: (user, message, bot, state) => {
        const message_to_run = message.split(`${prefix}say `)[1];
        bot.chat(` ${message_to_run}`) // space at start doesn't let any commands to run
    },

    [`${prefix}welcomer`]: (user, message, bot, state) => {
       state.welcomer = !state.welcomer;
       bot.chat(`Scanner is now ${state.welcomer ? "ON" : "OFF"}!`);
    },

    [`${prefix}tempwl`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}tempwl `)[1];
        state.whitelist.push(String(args))
        console.log(`Whitelisted ${args}.`)
        bot.chat(`/msg ${user} Whitelisted ${args}.`)
    },

    [`${prefix}remwl`]: (user, message, bot, state) => {
        let args = message.split(`${prefix}remwl `)[1];
        if (args.toLowerCase() !== 'damix2131') {
            if (!state.whitelist.includes(args)) {
                bot.whisper(user, `${args} is not in the whitelist.`);
                return;
            }

            state.whitelist = state.whitelist.filter(p => p !== args);
            console.log(`Removed ${args} from whitelist.`)
            bot.chat(`/msg ${user} Removed ${args} from whitelist.`)
        }
    },
    [`${prefix}timeout`]: (user, message, bot, state) => {
        if (user === 'Damix2131') {
            bot.chat("Removing keep_alive listener!, timing out in 30 seconds as of now.")
            bot._client.removeAllListeners('keep_alive');    
        }
    }, 
}

module.exports = { public_commands, admin_commands };
