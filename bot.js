var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

const commands = {
	"ping": ping,
	"stinky": stinky,
	"info": info,
	"help": help,
};

const blacklist = ['fuck', 'shit', 'ass', 'cuck'];

function sendMessage(channel, message) {
    bot.sendMessage({to: channel, message: message});
};

function info(channelID){
	sendMessage(channelID, '```Hello! I am a bot. So far I don`t do much, but ' +
	'I`ve been made by: \n' +
	'\nRENDOSKI#3031 \n' +
	'\nstart by getting a list of commands, using !help```');
};

// Command list.
function help(channelID){
	sendMessage(channelID,'```List of current working commands: \n' +
	'- !stinky \n' +
	'- !info \n' +
	'- !help \n' +
	'- !ping \n```');
};

function ping(channelID){
	sendMessage(channelID, 'pong!');
};

function stinky(channelID){
	sendMessage(channelID, 'go take a shower, smelly!');
};

bot.on('message', function (user, userID, channelID, message, evt) {
	
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	
	if (message.substring(0, 1) == '!'){
		var args = message.substring(1).split(' ');
		var cmd = args[0];
		
		if (commands[cmd]) {
			commands[cmd](channelID);
		}
	}
	
	for (let word of message.split(' ')){
		if (blacklist.includes(word.toLowerCase())){
			sendMessage(channelID, word + '!');
		}
	}
});
