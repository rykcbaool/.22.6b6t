// @ts-nocheck
const mineflayer = require('mineflayer');

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startup() {
  // Auto-restart toggle
  let restart = true;

  // Password (for AuthMe)
  const PASSWORD = process.env.MC_PASSWORD || '';

  // Server Credentials
  const host = 'eu.6b6t.org';
  const port = 25565;
  const username = '.22';
  const version = '1.19.4';

  // States
  let loggedIn = false;
  let spawnedIn = 0;

  let global_deaths = 0
  let deaths = 0;
  let hotspot_death = false

  let crystalled = 0; // how many people got crystalled since bot joined
  let crystal_kills = {}

  let scan_hotspot = false;
  let auto_tp = false;

  // Misc.
  const whitelist = ['Damix2131', 'q33a', 'Abottomlesspit', 'ryk_cbaool'];
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
  
  const spam_messages = [
    "Want to check who has got more kills? Try :crystals!",
    "Curious about the bot's health? Use :health!",
    "Curious how many people died so far? Use :deaths!",
    "Feeling lucky? Roll a dice with :roll!",
    "Can't decide? Use :choose option1, option2, ... to get a random pick!",
    "Flip a coin anytime with :flip!",
    "Need a quick ping test? Try :ping!",
    "Wondering how smart someone is? Try :iq username!",
    "Find out how gay your friends are with :gay username!",
    "Want to roast your friends? Use :rape username!",
    "Check how jewish you are, or someone using :jew!",
    "Check your or a friend's pp size with :pp username!",
    "Ask the magic 8-ball your question with :8ball!",
    "Curious about boob sizes? Try :boobs username!",
  ];

  const responses = {
    "You are not allowed to teleport while in the 5000x5000 overworld spawn area!": () => bot.chat("I can't teleport currently.")
  }

  /** COMMAND HANDLER **/
  const public_commands = {
    ":help": (user, message) => {
      const isAdmin = whitelisted_users(user);
      const args = message.trim().split(/\s+/);

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

    ":crystals": () => {
      const entries = Object.entries(crystal_kills);
      if (entries.length === 0) {
        bot.chat(`Amount of people crystalled since join: ${crystalled}`)
      } else {
        const [topUser, topKills] = entries.sort((a, b) => b[1] - a[1])[0];
        bot.chat(`Amount of people crystalled since join: ${crystalled}, Most kills has: ${topUser} with ${topKills} kills`);
      }
      console.log(crystal_kills)
    },
    //":ping": () => bot.chat("pong!"),
    ":deaths": () => bot.chat(`Bot ${deaths}, Global: ${global_deaths}`),
    ":health": () => bot.chat(`Bot has ${bot.health.toFixed(1)} hearts`),
    ":rape": (user, message) => {
        const args = message.split(":rape ")[1]

        if (args && args.trim().length > 0) {   
            bot.chat(`${user} rapes ${args}`)
        } else {
            bot.chat("Usage: :rape (victim)")
        }
    },
    ":jew": (user, message) => {
      const args = message.split(":jew ")[1]
      const jewish = Math.floor(Math.random() * 100)

      if (args && args.trim().length > 0) {
            bot.chat(`${args} is ${jewish}% jewish`)
        } else {
            bot.chat(`${user} is ${jewish}% jewish`)
      }
    },
    ":dox": (user, message) => {
      const args = message.split(":dox ")[1]
      

      if (args && args.trim().length > 0) {
            bot.chat(`${args}'s ip is ${get_random_ip()}!! Send them an pizza to their doorstep!`)
        } else {
            bot.chat("Usage: :dox (victim)")
      }
    },
    ":pp": (user, message) => {
      const args = message.split(":pp ")[1];
      const size = "=".repeat(Math.floor(Math.random() * 50) + 1); // up to 50 for fun

      if (args && args.trim().length > 0) {
        bot.chat(`${args}'s dick: 8${size}D`);
      } else {
        bot.chat(`${user}'s dick: 8${size}D`);
      }
    },
    ":iq": (user, message) => {
      const args = message.split(":iq ")[1];
      const iq = Math.floor(Math.random() * 160) + 40;
      const target = (args && args.trim()) || user;
      bot.chat(`${target}'s IQ is ${iq}`);
    },

    ":gay": (user, message) => {
      const args = message.split(":gay ")[1];
      const percent = Math.floor(Math.random() * 101);
      const target = (args && args.trim()) || user;
      bot.chat(`${target} is ${percent}% gay`);
    },

    ":boobs": (user, message) => {
      const args = message.split(":boobs ")[1];
      const sizes = ["A", "B", "C", "D", "DD", "E", "F", "G", "H", "Z"];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      const target = (args && args.trim()) || user;
      bot.chat(`${target} has ${randomSize}-cup boobs`);
    },

    ":8ball": (user, message) => {
      const answers = [
        "Yes", "No", "Maybe", "Definitely", "Try again later",
        "Absolutely", "Not a chance", "Don't count on it", "Looks good", "Sus"
      ];
      const response = random_element(answers);
      bot.chat(`[8-ball] ${response}`);
    },

    ":roll": () => {
      const rolled = Math.floor(Math.random() * 100) + 1;
      bot.chat(`[Dice] Rolled a ${rolled}`);
    },

    ":flip": () => {
      const result = Math.random() < 0.5 ? "Heads" : "Tails";
      bot.chat(`[CoinFlip] It's ${result}`);
    },

    ":choose": (user, message) => {
      const args = message.split(":choose ")[1];
      if (!args) return bot.chat("Usage: :choose option1, option2, ...");
      const options = args.split(",").map(x => x.trim()).filter(Boolean);
      if (options.length < 2) return bot.chat("Give me at least 2 choices.");
      const choice = random_element(options);
      bot.chat(`I choose: ${choice}`);
    },
    ":playerlist": () => {
      const players = Object.keys(bot.players).lenght;
      if (players.length === 0) {
        bot.chat("No players online.");
      } else {
        bot.chat(`Players online: ${playerCount}`);
      }
    },

    ":tps": () => {
      const tps = bot._client && bot._client.latency ? (1000 / bot._client.latency).toFixed(2) : "unknown";
      bot.chat(`Server TPS: ${tps}`);
    },

    ":ping": () => {
      if (bot.player && typeof bot.player.ping === "number") {
        bot.chat(`Ping: ${bot.player.ping}ms`);
      } else {
        bot.chat("Ping info not available.");
      }
    },
  }

  const commands = {
    //":tp": (user) => bot.chat(`/tpa ${user}`),
    ":scan": () => {
      auto_tp = !auto_tp;
      bot.chat(`Scanner is now ${auto_tp ? "ON" : "OFF"}!`);
    },
    //":pos": () => {
    //  const pos = bot.entity.position;
    //  bot.chat(`My position is: ${Math.floor(pos.x)} X, ${Math.floor(pos.y)} Y, ${Math.floor(pos.z)} Z!`);
    //},
    ":hotspot": () => {
      scan_hotspot = !scan_hotspot;
      bot.chat(`Hotspot logger is now ${scan_hotspot ? "ON" : "OFF"}!`);
    },
    ":say": (user, fullMessage) => {
      const message_to_run = fullMessage.split(":say ")[1];
      const blacklist = ["/ignore", "/delhome", "/freecam", "/balloons", "/tpy"];
      if (!blacklist.some(cmd => message_to_run.includes(cmd))) {
        bot.chat(message_to_run);
      } else {
        bot.chat("Blacklisted command!");
      }
    },
    ":echo": (user, fullMessage) => {
        const message_to_run = fullMessage.split(":echo ")[1];
        bot.chat(` ${message_to_run}`) // space at start doesn't let any commands to run
    }
  };

  /** UTILITIES **/
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
    } else {
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

      if (spawnedIn === 2){
        setInterval(() => {
        const tip = random_element(spam_messages);
        bot.chat(tip);
      }, 300000); // every 5 min
    }
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
    const command = message.split('» ')[1] || '';

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
        if (command.startsWith(":")) {
            if (whitelisted_users(username)) {
                for (const cmd in commands) {
                    if (command.startsWith(cmd)) {
                    commands[cmd](username, command);
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
    if (message.includes("died" && !message.includes('»'))) {
      global_deaths++;
    }

    // Crystal Logger
    if (message.includes("using an end crystal") && !message.includes('»')) {
        const get_killer = message.split("by ")[1].split(" using")[0].trim()
        const get_victim = message.split(" was")[0]
        crystalled += 1

        if (get_killer !== get_victim) {
            if (!(get_killer in crystal_kills)) {
                crystal_kills[get_killer] = 1
            } else {
                crystal_kills[get_killer] ++;
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
