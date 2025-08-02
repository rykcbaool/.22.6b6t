// @ts-nocheck
const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer)

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startup() {
  // Auto-restart toggle
  const startTime = Date.now()

  let restart = true;

  // Password (for AuthMe)
  const PASSWORD = process.env.MC_PASSWORD || '';

  // Server Credentials
  const host = 'eu.6b6t.org';
  const port = 25565;
  const username = '.22';
  const version = '1.19.4';

  // States
  let prefix = '-'
  let loggedIn = false;
  let spawnedIn = 0;

  let global_deaths = 0
  let deaths = 0;
  let hotspot_death = false

  let crystalled = 0; // how many people got crystalled since bot joined
  let crystal_kills = {}
  let crystal_deaths = {}

  let quotes = {}

  let scan_hotspot = false;
  let auto_tp = false;
  let tips_started = false;

  // Misc.
  let whitelist = ['Damix2131', 'q33a', 'ryk_cbaool'];
    const blacklisted_messages = ['---------------------------', 'players sleeping', 'You can vote! Type /vote to get more homes, lower cooldowns & white username color!',
        'Remember to /vote'
    ]

  const bot = mineflayer.createBot({
    host,
    port,
    username,
    version,
    keepAlive: true,
  });
  
  bot.loadPlugin(tpsPlugin)
  const sizes = ["A", "B", "C", "D", "DD", "E", "F", "G", "H", "Z"];
  const answers = [
        "Yes", "No", "Maybe", "Definitely", "Try again later",
        "Absolutely", "Not a chance", "Don't count on it", "Looks good", "Sus"
      ];
  
  const kits = [
    "grief", "cpvp", "totem", "hunter", "build", "build2",
    "build3", "build4", "build5", "build6", "refill", "pvp", "redstone",
    "highway", "tools", "nigger"
  ]

  const spam_messages = [
    `Want to check who has got more kills? Try ${prefix}topkills!`,
    `Curious about the bot's health? Use ${prefix}health!`,
    `Curious how many people died so far? Use ${prefix}deaths!`,
    `Feeling lucky? Roll a dice with ${prefix}roll!`,
    `Can't decide? Use ${prefix}choose option1, option2, ... to get a random pick!`,
    `Flip a coin anytime with ${prefix}flip!`,
    `Need a quick ping test? Try ${prefix}ping!`,
    `Wondering how smart someone is? Try ${prefix}iq username!`,
    `Find out how gay your friends are with ${prefix}gay username!`,
    `Want to rape your friends? Use ${prefix}rape username!`,
    `Check furry levels with ${prefix}furry username!`,
    `See how trans you are with ${prefix}trans username!`,
    `Try the retard meter with ${prefix}retard username!`,
    `Want to know your lesbian percentage? Use ${prefix}lesbian username!`,
    `Check your pp size with ${prefix}pp username!`,
    `Ask the magic 8-ball your question with ${prefix}8ball!`,
    `Curious about boob sizes? Try ${prefix}boobs username!`,
    `Want your own command? Suggest it at discord.gg/mjrDsGCV7F!`
  ];


  const responses = {
    "You are not allowed to teleport while in the 5000x5000 overworld spawn area!": () => bot.chat("I can't teleport currently.")
  }

  /** COMMAND HANDLER **/
  const public_commands = {
    [`${prefix}help`]: (user, message) => {
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
    [`${prefix}rape`]: (user, message) => {
        let args = message.split(`${prefix}rape `)[1]

        if (args && args.trim().length > 0) {   
            bot.chat(`${user} rapes ${args}`)
        } else {
            bot.chat(`Usage: ${prefix}rape (victim)`)
        }
    },
    [`${prefix}jew`]: (user, message) => {
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
    [`${prefix}indian`]: (user, message) => {
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

    [`${prefix}dox`]: (user, message) => {
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
    [`${prefix}pp`]: (user, message) => {
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

    [`${prefix}iq`]: (user, message) => {
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
    [`${prefix}kys`]: (user, message) => {
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
    [`${prefix}gay`]: (user, message) => {
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
    [`${prefix}furry`]: (user, message) => {
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
    [`${prefix}trans`]: (user, message) => {
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
    [`${prefix}retard`]: (user, message) => {
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

    [`${prefix}femboy`]: (user, message) => {
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
    [`${prefix}nigger`]: (user, message) => {
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

    //[`${prefix}kit`]: (user, message) => {
    //  let args = message.split(`${prefix}kit `)[1];

    //  if (args && args.trim().length > 0) {
    //    if (kits.includes(args)) {
    //      bot.chat(`${user} has received kit ${args}`)
    //    } else if (args.toLowerCase() === 'help') {
    //      bot.chat(`Avaiable kits: ${kits.join(', ')}`)
    //    } else {
    //      bot.chat(`Invalid Kit!, Use: ${kits.join(', ')}`)
    //    }
    //  } else {
    //    bot.chat(`Please pick an Kit you want to use with ${prefix}kit help`)
    //  }
    //},

    [`${prefix}lesbian`]: (user, message) => {
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

    [`${prefix}boobs`]: (user, message) => {
      let args = message.split(`${prefix}boobs `)[1];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      const target = (args && args.trim()) || user;
      bot.chat(`${target} has ${randomSize}-cup boobs`);
    },

    [`${prefix}8ball`]: (user, message) => {
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

    [`${prefix}choose`]: (user, message) => {
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
    [`${prefix}kd`]: (user, message) => {
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
    [`${prefix}quote`]: (user, message) => {
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
    }
  }

  const admin_commands = {
    //":tp": (user) => bot.chat(`/tpa ${user}`),
    //":scan": () => {
    //  auto_tp = !auto_tp;
    //  bot.chat(`Scanner is now ${auto_tp ? "ON" : "OFF"}!`);
    //},
    //":pos": () => {
    //  const pos = bot.entity.position;
    //  bot.chat(`My position is: ${Math.floor(pos.x)} X, ${Math.floor(pos.y)} Y, ${Math.floor(pos.z)} Z!`);
    //},
    //":hotspot": () => {
    //  scan_hotspot = !scan_hotspot;
    //  bot.chat(`Hotspot logger is now ${scan_hotspot ? "ON" : "OFF"}!`);
    //},
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
    [`${prefix}run`]: (user, message) => {
      const message_to_run = message.split(`${prefix}run `)[1];
      const blacklist = ["/ignore", "/delhome", "/freecam", "/balloons", "/tpy"];
      if (!blacklist.some(cmd => message_to_run.includes(cmd))) {
        bot.chat(message_to_run);
      } else {
        bot.chat("Blacklisted command!");
      }
    },
    [`${prefix}say`]: (user, message) => {
        const message_to_run = message.split(`${prefix}say `)[1];
        bot.chat(` ${message_to_run}`) // space at start doesn't let any commands to run
    },
    [`${prefix}tempwl`]: (user, message) => {
      let args = message.split(`${prefix}tempwl `)[1];
      whitelist.push(String(args))
      console.log(`Whitelisted ${args}.`)
      bot.chat(`/msg ${user} Whitelisted ${args}.`)
    },
    [`${prefix}remwl`]: (user, message) => {
      let args = message.split(`${prefix}remwl `)[1];
      if (args.toLowerCase() !== 'damix2131') {
        if (!whitelist.includes(args)) {
          bot.whisper(user, `${args} is not in the whitelist.`);
          return;
        }

        whitelist = whitelist.filter(p => p !== args);
        console.log(`Removed ${args} from whitelist.`)
        bot.chat(`/msg ${user} Removed ${args} from whitelist.`)
      }
    },
  };

  /** UTILITIES **/
  function get_uptime() {
    const now = Date.now()
    const uptime = now - startTime

    const totalSeconds = Math.floor(uptime / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours}h ${minutes}m ${seconds}s`
  }

  function random_element(arr) {
    return String(arr[Math.floor(Math.random() * arr.length)])
  }

  function get_random_ip() {
    const array = []

    for (let i = 0; i < 4; i++) {
      array.push(Math.floor(Math.random() * 256))
    }

    const [a, b, c, d] = array;

    return `${a}.${b}.${c}.${d}`
  }

  function return_user(msg) {
    let no_rank_message = '';
    let get_username = '';

    if (msg.startsWith('[')) {
      no_rank_message = msg.split(']')[1];
      get_username = no_rank_message.split('»')[0];
    } else if (msg.includes("whispers")) {
      get_username = msg.split("whispers")[0]
    }
    else {
      get_username = msg.split('»')[0];
    }

    return get_username?.trim() || '';
  }

  function whitelisted_users(user) {
    return whitelist.includes(user.trim());
  }

  /** EVENTS **/
  bot.on('spawn', () => {
    spawnedIn += 1;

      if (!tips_started) {
      tips_started = true;
  
      setInterval(() => {
        const tip = random_element(spam_messages);
        bot.chat(tip);
      }, 180000); // every 5 min
    }
  });

  bot.on("playerCollect", async (collector, collected) => {
    if (collector['username'] == username) {
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

    if (auto_tp) auto_tp = false;

    if (typeof bossBar_text === "string" && bossBar_text.includes("teleport with /hotspot") && scan_hotspot) {
        bot.chat("/hotspot");
        setTimeout(() => {
        const botPosition = bot.entity.position;
        const info = `${Math.floor(botPosition.x)}.X, ${Math.floor(botPosition.y)}.Y, ${Math.floor(botPosition.z)}.Z in minecraft:${bot.game.dimension}`;
        bot.chat(`Hotspot Located At: ${info}`);
        hotspot_death = true
        bot.chat("/kill");
        hotspot_death = false
        }, 10750);
    }
    });

  bot.on("death", () => {
    console.log("Died!");

    
    bot.clearControlStates();
    bot.setControlState("forward", true);
    bot.setControlState("jump", true);

    if (!hotspot_death) {
        deaths ++
    }
  });

  bot.on('messagestr', (message) => {
    if (spawnedIn < 2) {
      if (!loggedIn) {
        if (message.includes("/login")) {
          bot.chat(`/login ${PASSWORD}`);
          loggedIn = true;
        } else if (message.includes("/register")) { // use when auto captcha will be public
          bot.chat(`/register ${PASSWORD}`);
          loggedIn = true;
        }
      }
      return;
    }

    if (spawnedIn >= 2 && !blacklisted_messages.some(blk => message.includes(blk)) && message.trim() !== '') {
      console.log(message);
    }

    const username = return_user(message);
    const command = message.split('» ')[1] || message.split("whispers: ")[1] || '';

    if (!quotes[username]) {
      quotes[username] = []
    }

    if (message.includes('»')) {
      quotes[username].push(message.trim());
    }

    // Auto-TP if scanner enabled
    if (auto_tp) {
      const teleport = ['tp', 'come', 'teleport', 'give me'];
      if (teleport.some(word => command.toLowerCase().includes(word)) && !command.includes("http")) {
        console.log("Teleporting to", username);
        bot.chat(`/tpa ${username}`);
      }
    }

    // Handle whitelisted user commands
    if (loggedIn && spawnedIn >= 2) {
        if (command.startsWith(prefix)) {
            if (whitelisted_users(username)) {
                for (const cmd in admin_commands) {
                    if (command.startsWith(cmd)) {
                    admin_commands[cmd](username, command);
                    }
                }
            }

            for (const cmd in public_commands) {
                if (command.startsWith(cmd)) {
                    public_commands[cmd](username, command)
                }
            }
        }
    }

    // Death logger
    if (message.includes("died") && !message.includes('»')) {
      global_deaths++;
    }

    // Crystal Logger
    if (message.includes("using an end crystal") && !message.includes('»')) {
        const get_killer = message.split("by ")[1].split(" using")[0].trim()
        const get_victim = message.split(" was")[0]

        crystalled++;
        global_deaths++;

        if (get_killer !== get_victim) {
            if (!(get_killer in crystal_kills)) {
                crystal_kills[get_killer] = 1
            } else {
                crystal_kills[get_killer] ++;
            }

            if (!(get_victim in crystal_deaths)) {
              crystal_deaths[get_victim] = 1
            } else {
              crystal_deaths[get_victim] ++;
            }
        }
    }
        
    // Auto-accept tpy requests
    if (message.includes("/tpy")) {
      if (message.includes("Damix2131")) {
        bot.chat(`/tpy Damix2131`);
      } else {
        bot.chat(`/tpn ${username}`)
      }
      
    }

    // Auto-response

    for (const response in responses) {
        if (message.includes(response) || command.includes(response)) {
            responses[response](message);
        }
    }

    // Welcome new players
    if (message.includes("joined") && !message.includes(username)) {
      const player = message.split("joined")[0].trim();
      console.log(`Player ${player} currently joined.`)
      bot.chat(`/whisper ${player} Welcome to 6b6t.org ${player}!`);
    }
  });

  bot.on('kicked', (reason) => {
    console.log('[Kicked]', reason);
  });

  bot.on('end', (reason) => {
    console.log('[Disconnected]', reason);
    if (restart) {
      loggedIn = false;
      spawnedIn = 0;
      setTimeout(startup, 5000);
    }
  });

  bot.on('error', (err) => {
    console.log('[Error]', err);
  });

}

startup();
