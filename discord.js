/*jslint node: true */
"use strict";

const Discord = require('discord.js');
const conf = require('ocore/conf.js');

var client = null;



async function init({ sendTips }) {
	if (!conf.discord_token)
		throw Error("discord_token missing in conf");
	if (!conf.discord_channels || !conf.discord_channels.length)
		throw Error("channels missing in conf");
	client = new Discord.Client();
	client.on('ready', () => {
		console.log(`Logged in Discord as ${client.user.tag}!`);
	});
	client.on('error', (error) => {
		console.log(`Discord error: ${error}`);
	});
	client.on('message', async msg => {
		if (msg.author.id === client.user.id)
			return console.log('skipping own message');
		if (!conf.discord_channels.includes(msg.channel.id))
			return console.log('message in wrong channel');
		console.log('got message', msg)
		if (['update', 'tips'].includes(msg.content.toLowerCase()))
			await sendTips();
		else
			msg.channel.send("Type `update` to get the latest trading tips");
	});
	await client.login(conf.discord_token);
	setBotActivity();
	setInterval(setBotActivity, 1000 * 60 * 24);
}

function setBotActivity() {
	const i = Math.floor(Math.random() * conf.bondFilms.length);
	client.user.setActivity(conf.bondFilms[i], {type: "WATCHING"});
}


function sendToDiscord(to_be_sent) {
	if (!client)
		return console.log("discord client not initialized");
	if (process.env.mute)
		return console.log("client muted");
	conf.discord_channels.forEach(function(channelId){
		client.channels.fetch(channelId).then(function(channel){
			channel.send(to_be_sent);
		});
	});
}


const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);


function sendTradingTip(tip) {

	const objEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`New trading tip: ${tip.action} ${tip.token}`)
		.setURL(conf.stablecoins_base_url + tip.aa)
		.addFields({ name: "Current price", value: `${tip.current_price.toPrecision(6)} ${tip.reserve_token || 'R'}`, inline: true })
		.addFields({ name: "Target price", value: `${tip.target_price.toPrecision(6)} ${tip.reserve_token || 'R'}`, inline: true })
		.addFields({ name: "Price difference", value: `${tip.price_difference_percentage.toPrecision(6)}%`, inline: true })
		.addFields({ name: `${capitalize(tip.action)} up to`, value: `${tip.max_amount} ${tip.token || 'T1'}` })

	sendToDiscord(objEmbed);
}

function sendDisclaimer() {
	sendToDiscord("These trading tips are not investment advice, do your own research.")
}


exports.sendTradingTip = sendTradingTip;
exports.sendDisclaimer = sendDisclaimer;
exports.init = init;
