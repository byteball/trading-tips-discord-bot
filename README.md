# Trading tips discord bot

Watch the [Obyte bonded stablecoins](https://ostable.org) and post a notification on Discord when there is an opportunity to buy or sell with profit.

The trading recommendations are not financial advice, use at your own risk.

## Setup

**Important:** tested only with NodeJS version 12.

- `yarn`
- Run with `node run.js`, it will create an app data directory in `~/.conf/trading-tips-discord-bot` then fail due to configuration missing
- While logged in to Discord webapp, create an application at https://discord.com/developers/applications 
- Select the application, select bot in menu, copy the bot token
- Copy `.env.sample` file to `.env` and complete it with the bot token and the channel id the bot will post to
- While logged in to Discord, click this link to add the bot to your server: https://discord.com/api/oauth2/authorize?client_id=800406815875530822&permissions=67584&scope=bot, `client_id` can be found in the General Information of your Discord application, permissions should be `2048` to allow only posting message.
- Run the bot with `node run.js`
