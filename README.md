# SCpl Discord Bot

A modular, multi-server Discord bot built with Node.js and `discord.js` (v13). The bot provides reaction-based role assignment (auto-role), reaction threshold message pinning (auto-pin), moderation tools, per-guild YAML configuration persistence, and general utility commands.

## Features

- **Reaction Auto-Role System**: Bind specific emojis on designated messages to guild roles. Users automatically receive or lose roles when adding or removing reactions. Includes an embed generator command (`create-autorole-message`) that posts the role menu, reacts with all configured emojis, and registers the schemes automatically.
- **Reaction Auto-Pin System**: Automatically pin messages in a specific channel or across the entire server once a reaction count threshold is reached. Supports content filtering (`noting-special` for any message, or `image-or-gif` for media attachments and image embeds) and optional automatic unpinning when reactions drop below the threshold.
- **Per-Guild Configuration**: Server settings (custom prefix, argument brackets, default cooldowns, channel IDs, auto-role schemes, and auto-pin rules) are stored per guild in `src/config/servers/<guildId>.yaml` and cached in memory.
- **Moderation & Administration**: Kick and ban commands with direct message notifications and configurable message history deletion windows (0-7 days), plus bulk message pruning (`clear`).
- **Dynamic Command & Event Handlers**: Automatic discovery and registration of command and event modules at startup with permission checks, guild/DM scope enforcement, per-user cooldown tracking, and custom usage formatting.

---

## Project Structure

```text
SCpl-Discord-Bot/
├── src/
│   ├── commands/              # Command modules (*.command.js)
│   ├── config/
│   │   ├── config.js          # Global default configuration and credentials
│   │   └── servers/           # Per-guild YAML configuration files (<guildId>.yaml)
│   ├── events/                # Discord gateway event listeners (*.event.js)
│   ├── handlers/
│   │   ├── command.handler.js # Command loader, parser, permission & cooldown guard
│   │   ├── coronaApi.handler.js # Axios HTTP client setup for external stats API
│   │   ├── event.handler.js   # Event listener loader and validator
│   │   └── settings.handler.js # Per-guild YAML config loader and serializer
│   └── index.js               # Bot entry point and client initialization
├── package.json
└── Procfile                   # Process definition for worker deployment
```

---

## Commands Reference

By default, the global prefix is `/` (customizable per server via `set-prefix`). Required arguments are denoted with `(arg)` and optional arguments with `[arg]`.

### Auto-Role Management

| Command | Aliases | Permissions | Description |
| :--- | :--- | :--- | :--- |
| `create-autorole-message` | `create-autorole`, `car`, `carm` | `ADMINISTRATOR` | Creates an embed message in the target channel, adds reactions, and binds each reaction to a role. |
| `set-autorole-scheme` | `set-autorole`, `sar` | `ADMINISTRATOR` | Binds a reaction on an existing message ID to a role. |
| `autorole-schemes` | `autoroles`, `ars` | `ADMINISTRATOR` | Lists all active auto-role schemes on the server. |
| `delete-autorole-scheme` | `delete-autorole`, `dar` | `ADMINISTRATOR` | Deletes an auto-role scheme by its index number. |

### Auto-Pin Management

| Command | Aliases | Permissions | Description |
| :--- | :--- | :--- | :--- |
| `set-autopin-scheme` | `set-autopin`, `sap` | `ADMINISTRATOR` | Creates or updates an auto-pin rule (`all` or `#channel`, emoji, threshold count, content filter, auto-unpin flag). |
| `autopin-schemes` | `autopins`, `aps` | `ADMINISTRATOR` | Lists all configured auto-pin schemes for the server. |
| `delete-autopin-scheme` | `delete-autopin`, `dap` | `ADMINISTRATOR` | Removes an auto-pin scheme by its index number. |

### Moderation

| Command | Aliases | Permissions | Description |
| :--- | :--- | :--- | :--- |
| `ban` | - | `BAN_MEMBERS` | Bans a mentioned member, deletes 0-7 days of their messages, and sends a DM notification with the reason. |
| `kick` | - | `KICK_MEMBERS` | Kicks a mentioned member from the server and notifies them via DM. |
| `clear` | `clean`, `cls`, `clr` | `MANAGE_MESSAGES` | Bulk-deletes between 1 and 99 recent messages (younger than 14 days) in the current channel. |

### Server & Bot Configuration

| Command | Aliases | Scope / Permissions | Description |
| :--- | :--- | :--- | :--- |
| `set-prefix` | `prefix` | Guild (`ADMINISTRATOR`) | Updates the command prefix for the current server. |
| `reset-prefix` | - | Guild (`ADMINISTRATOR`) | Resets the server prefix back to the global default. |
| `set-bot-activity` | `bot-activity`, `bot-status` | Owner (DM only) | Updates the bot presence activity type and text. |
| `reset-bot-activity` | `reset-bot-status` | Owner (DM only) | Clears the bot presence status. |
| `set-bot-avatar` | `bot-avatar` | Owner (DM only) | Updates the bot avatar from a URL or local path. |
| `set-bot-username` | `set-bot-nickname`, `bot-nick` | Owner (DM only) | Changes the global username of the bot account. |

### Utilities & Experimental Commands

| Command | Aliases | Status | Description |
| :--- | :--- | :--- | :--- |
| `help` | - | Enabled | Displays all available commands or detailed usage for a specific command. |
| `ping` | - | Enabled | Health check command that responds with `Pong!`. |
| `coin` | - | Enabled | Flips a coin (`Orzeł!` or `Reszka!`). |
| `dice` | - | Enabled | Rolls a standard 6-sided die (1-6). |
| `random` | - | Enabled | Generates a random integer within an inclusive `[from, to]` range. |
| `info` | - | Disabled | Displays bot metadata embed (author, version). |
| `calculator` / `calculator2` | `calc`, `c` | Disabled (WIP) | Custom expression parser supporting parentheses, `+`, `-`, `*`, `/`, exponents (`^`), and roots (`v`). |
| `covid19data` | `covid`, `covid19` | Disabled (WIP) | Fetches global or country-specific COVID-19 statistics via `disease.sh` API. |

---

## Event Listeners

| Event Module | Gateway Event | Status | Behavior |
| :--- | :--- | :--- | :--- |
| `give-role` | `messageReactionAdd` | Enabled | Assigns the mapped role when a user reacts to a tracked auto-role message. |
| `take-role` | `messageReactionRemove` | Enabled | Removes the mapped role when a user removes their reaction. |
| `remove-autorole` | `messageDelete` | Enabled | Cleans up auto-role schemes associated with a deleted message. |
| `pin-message` | `messageReactionAdd` | Enabled | Pins a message when reaction count and attachment/embed filters match an auto-pin scheme. |
| `unpin-message` | `messageReactionRemove` | Enabled | Unpins a message if reactions fall below the threshold and auto-unpin is enabled. |
| `join-message` | `guildMemberAdd` | Disabled | Sends a welcome message to the configured `welcomeChannelId`. |
| `leave-message` | `guildMemberRemove` | Disabled | Sends a farewell message to the configured `farewellChannelId`. |

---

## Getting Started

### Prerequisites

- **Node.js**: v16.6.0 or newer (required by `discord.js` v13)
- **npm**: v7+

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure bot settings in `src/config/config.js`:
   ```javascript
   module.exports = {
     token: process.env.DISCORD_TOKEN || "YOUR_BOT_TOKEN",
     prefix: "/",
     argsChar1: "(",
     argsChar2: ")",
     argsChar3: "[",
     argsChar4: "]",
     language: "Polish",
     cooldownDefaultAmount: "0",
     owner: "YOUR_DISCORD_USER_ID",
     coronaApi: "https://disease.sh/v3/covid-19"
   }
   ```

3. Start the bot:
   ```bash
   node src/index.js
   ```

---

## Roadmap & Planned Restructuring

- **Environment & Secret Management**: Move sensitive values (`DISCORD_TOKEN`, `OWNER_ID`) to `.env` via `dotenv` and untrack local configuration backups.
- **Discord.js v14 & Slash Commands Migration**: Upgrade from prefix-based message parsing (`discord.js` v13) to native Discord Application Commands (`ChatInputCommandInteraction`) with `GatewayIntentBits` and `Partials` enums.
- **Command Categorization**: Group `src/commands/` into domain subdirectories (`moderation/`, `autorole/`, `autopin/`, `config/`, `utility/`) instead of a flat file list.
- **Storage Layer Upgrade**: Replace synchronous `readFileSync`/`writeFileSync` YAML mutations with an asynchronous storage provider (SQLite via `better-sqlite3` or Prisma) with schema validation.
- **Internationalization (i18n)**: Extract hardcoded Polish response strings into locale dictionaries (`locales/pl.json`, `locales/en.json`) to utilize the `language` setting already present in server configs.
