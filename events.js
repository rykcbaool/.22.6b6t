// events.js
module.exports = function(bot, state) {
    const {
        startup,
        random_element,
        spam_messages,
        blacklisted_messages,
        return_user,
        checkSpam,
        whitelisted_users,
        admin_commands,
        public_commands,
        responses,
        PASSWORD,
        welcomer
    } = state;

    bot.on('spawn', () => {
        state.spawnedIn += 1;

        if (!state.tips_started) {
            state.tips_started = true;

            setInterval(() => {
                const tip = random_element(spam_messages);
                bot.chat(tip);
                state.bot_tips_sent++;
            }, 180000); // every 3 minutes
        }
    });

    bot.on("playerCollect", async (collector, collected) => {
        if (collector.username === bot.username) {
            const inventory = bot.inventory.items();
            for (const item of inventory) {
                await bot.tossStack(item);
            }
        }
    });

    bot.on('login', () => {
        console.log('Logged In');
        bot.setControlState("forward", true);
    });

    bot.on('bossBarCreated', async (bossBar) => {
        const bossBar_text = bossBar?.title?.text;

        if (state.auto_tp) state.auto_tp = false;

        if (typeof bossBar_text === "string" && bossBar_text.includes("teleport with /hotspot") && state.scan_hotspot) {
            bot.chat("/hotspot");
            setTimeout(() => {
                const pos = bot.entity.position;
                const info = `${Math.floor(pos.x)}.X, ${Math.floor(pos.y)}.Y, ${Math.floor(pos.z)}.Z in minecraft:${bot.game.dimension}`;
                bot.chat(`Hotspot Located At: ${info}`);
                state.hotspot_death = true;
                bot.chat("/kill");
                state.hotspot_death = false;
            }, 10750);
        }
    });

    bot.on("death", () => {
        console.log("Died!");
        bot.clearControlStates(); // Planned to make it more human, but meh
        bot.setControlState("forward", true);
        bot.setControlState("jump", true);

        if (!state.hotspot_death) {
            state.deaths++;
        }
    });

    bot.on('messagestr', (message) => {
        const username = return_user(message);
        let command = message.split('» ')[1] || message.split("whispers: ")[1] || '';

        if (state.spawnedIn < 2) {
            if (!state.loggedIn) {
                if (message.includes("/login")) {
                    bot.chat(`/login ${PASSWORD}`);
                    state.loggedIn = true;
                } else if (message.includes("/register")) {
                    bot.chat(`/register ${PASSWORD}`);
                    state.loggedIn = true;
                }
            }
            return;
        }

        if (state.spawnedIn >= 2 && !blacklisted_messages.some(blk => message.includes(blk)) && message.trim() !== '') {
            console.log(message);
        }

        if (!state.quotes[username]) state.quotes[username] = [];
        if (message.includes('»')) state.quotes[username].push(message.trim());

        if (state.auto_tp) {
            const teleport = ['tp', 'come', 'teleport', 'give me'];
            if (teleport.some(word => command.toLowerCase().includes(word)) && !command.includes("http")) {
                console.log("Teleporting to", username);
                bot.chat(`/tpa ${username}`);
            }
        }

        if (state.loggedIn && state.spawnedIn >= 2) {
            if (command.startsWith("<Malachite>")) {
                command = command.replace("<Malachite>", "").replace("</Malachite>", "");
            }

            if (command.startsWith(state.prefix)) {
                if (state.temp_blacklist.has(username)) return;
                if (checkSpam(bot, username)) return;

                if (whitelisted_users(username)) {
                    for (const cmd in admin_commands) {
                        if (command.startsWith(cmd)) {
                            admin_commands[cmd](username, command, bot, state);  // pass bot here
                        }
                    }
                }

                for (const cmd in public_commands) {
                    if (command.startsWith(cmd)) {
                        public_commands[cmd](username, command, bot, state);  // pass bot here
                        state.bot_uses++;
                    }
                }
            }
        }

        if (message.includes("Server restarts in") && !message.includes('»')) {
            // Server restarts in 25200s
            if (state.server_restart === 0) {
                state.server_restart = Number(message.split('Server restarts in ')[1].replace('s', '').trim())
                
                setInterval(() => {
                    state.server_restart--;
                }, 1000)
            }
        }
        
        if (message.includes("died") && !message.includes('»')) {
            state.global_deaths++;
        }

        if (message.includes("using an end crystal") && !message.includes('»')) {
            const get_killer = message.split("by ")[1].split(" using")[0].trim();
            const get_victim = message.split(" was")[0].trim();

            state.crystalled++;
            state.global_deaths++;

            if (get_killer !== get_victim) {
                state.crystal_kills[get_killer] = (state.crystal_kills[get_killer] || 0) + 1;
                state.crystal_deaths[get_victim] = (state.crystal_deaths[get_victim] || 0) + 1;
            }
        }

        if (message.includes("/tpy")) {
            if (message.includes("Damix2131")) {
                bot.chat(`/tpy Damix2131`);
            } else {
                bot.chat(`/tpn ${username}`);
            }
        }

        for (const response in responses) {
            if (message.includes(response) || command.includes(response)) {
                responses[response](message);
            }
        }

        if (message.includes("joined") && !message.includes(bot.username) && welcomer ) {
            const player = message.split("joined")[0].trim();
            console.log(`Player ${player} currently joined.`);
            bot.chat(`/whisper ${player} Welcome to 6b6t.org ${player}!`);
        }
    });

    bot.on('kicked', (reason) => {
        console.log('[Kicked]', reason);
    });

    bot.on('end', (reason) => {
        console.log('[Disconnected]', reason);
        if (state.restart) {
            state.loggedIn = false;
            state.spawnedIn = 0;
            setTimeout(global.startup, 5000);
        }
    });

    bot.on('error', (err) => {
        console.error('[Bot Error]', err);
        if (err.code === 'ECONNREFUSED' || err.message.includes('timed out')) {
            console.log('Attempting to reconnect...');
            setTimeout(global.startup, 5000);
        }
    });
};


