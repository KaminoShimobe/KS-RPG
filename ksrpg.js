const Discord = require("discord.js");
const Danbooru = require('danbooru');
const mysql = require("mysql");
const http = require('http');
const talkedRecently = new Set();
const prefix = ">";

const bot = new Discord.Client({disableEveryone: true})


	

bot.on("ready", async () => {

	console.log(`Let the games begin... ${bot.user.username}`);
	var channel = bot.channels.get('537660809808183297');
	channel.sendMessage("KS-RPG has been updated! \n Check it out with `>patches`");
	bot.user.setPresence({ status: 'online', game: { name: 'being updated' } });



	try {

		let link = await bot.generateInvite(["ADMINISTRATOR"]);

		console.log(link);

	}	catch(e) {

		console.log(e.stack);

	}



});




bot.on("message", async message => {

	let messageArray = message.content.split(" ");

	let command = messageArray[0];

	let args = messageArray.slice(1);

	if(message.author.bot) return;
	
	
	

	if(message.channel.type === "dm") return;

	if(command === `${prefix}help`){
		
		let help = new Discord.RichEmbed()

			
			.setTitle("KS-RPG Commands")
			.setDescription("**>help**: \n Brings up this list")
			.setColor("#ff9a0c"); 

		message.author.send(help);
		message.reply("I've sent you a DM with the help.");


		return;

	}

	if(command === `${prefix}patches`){
		
		let help = new Discord.RichEmbed()

			
			.setTitle("Patch Notes 1/23/29")
			.setDescription("-Adding stuff now so this bot can be badass :sunglasses:")
			.setColor("#ff9a0c"); 

		message.channel.send(help);
		


		return;

	}






});











bot.login(process.env.BOT_TOKEN);

