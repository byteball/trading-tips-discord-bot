"use strict";
const path = require('path');
require('dotenv').config({ path: path.dirname(process.mainModule.paths[0]) + '/.env' });

exports.bServeAsHub = false;
exports.bLight = true;

exports.bNoPassphrase = true;

exports.explicitStart = true;

exports.hub = process.env.testnet ? 'obyte.org/bb-test' : 'obyte.org/bb';
exports.deviceName = 'Trading tips discord bot';


// TOR is recommended. Uncomment the next two lines to enable it
exports.socksHost = '127.0.0.1';
exports.socksPort = 9050;


exports.discord_token = process.env.discord_token;
exports.discord_channels = [process.env.channel];

exports.bondFilms = [
	"Dr. No",
	"From Russia With Love",
	"Goldfinger",
	"Thunderball",
	"You Only Live Twice",
	"On Her Majesty's Secret Service",
	"Diamonds Are Forever",
	"Live and Let Die",
	"The Man with the Golden Gun",
	"The Spy Who Loved Me",
	"Moonraker",
	"For Your Eyes Only",
	"Octopussy",
	"A View to a Kill",
	"The Living Daylights",
	"Licence to Kill",
	"GoldenEye",
	"Tomorrow Never Dies",
	"The World is Not Enough",
	"Die Another Day",
	"Casino Royale",
	"Quantum of Solace",
	"Skyfall",
	"Spectre",
	"No Time to Die",
	"Never Say Never Again",
];

exports.explorer_base_url = process.env.testnet ? 'https://testnetexplorer.obyte.org/#' : 'https://explorer.obyte.org/#';
exports.stablecoins_base_url = process.env.testnet ? 'https://testnet.ostable.org/trade/' : 'https://ostable.org/trade/';

console.log('finished discord bot conf');
