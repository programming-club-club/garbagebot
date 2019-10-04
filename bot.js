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
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	
	/* Planned functions: 
	!bruh (posts a bruh sound effect idk)
	!yt 'whatever' (searches for a youtube video)
	!google 'blah blah' (posts a google link to a search for the input maybe)
	!uwuize 'sentence' (you know what the fuck this thing does)
	!hydration (toggle command maybe? reminder to drink water or some gay shit)
	*/
	
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'pong!'
                });
            break;
            // Just add any case commands if you want to..
			// Adding commands requires 
			/* 	
				case 'newCommand':
				bot.sendMessage({ to: channelID, message: 'responce to new command' });
				break; 
			*/
			
			// Command !stinky just insults the user.
			// Maybe when given a ping, it can insult someone else?
			case 'stinky':
				bot.sendMessage({ 
					to: channelID, 
					message: 'go take a shower, smelly!' 
				});
			break;
			
			// Command !info tells the user about the bot's capabilities.
			case 'info':
			bot.sendMessage({ 
				to: channelID, 
				message: '```Hello! I am a bot. So far I don`t do much, but ' +
				'I`ve been made by: \n' +
				'\n RENDOSKI#3031 \n' +
				'\nstart by getting a list of commands, using !commands```'
			});
			break;
			
			case 'commands':
			bot.sendMessage({
				to: channelID,
				message: '```List of current working commands: \n' +
				'- !stinky \n' +
				'- !info \n' +
				'- !commands \n```'
			});
			break;
         }
     }
});