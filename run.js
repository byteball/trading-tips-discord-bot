/*jslint node: true */
"use strict";
const tradingTips = require('trading-tips');
const discord = require('./discord.js');

async function sendTips() {
	const all_tips = await tradingTips.getAllTips();
	console.log(all_tips);
	all_tips.forEach(discord.sendTradingTip);
	if (all_tips.length > 0)
		discord.sendDisclaimer();
}

async function start() {

	discord.init({ sendTips });
	await sendTips();

	tradingTips.subscribeToRequests(tips => {
		console.log('new tips', tips);
		tips.forEach(discord.sendTradingTip);
		discord.sendDisclaimer();
	}, 10 * 1000);

}

start();

process.on('unhandledRejection', up => { throw up; });
