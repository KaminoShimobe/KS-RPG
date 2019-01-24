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


var con_fig = {
	host: "us-cdbr-iron-east-03.cleardb.net",
	user: "bbd7576b85e61c",
	password: process.env.MY_SQL,
	database: "heroku_5a385f0d66fa896",
	port: 3306
};

var con;

function handleDisconnect() {
con = mysql.createConnection(con_fig);
con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  }); 	

process.on('uncaughtException', function (err) {
    console.log(err);
	
}); 
	


con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
       throw err;                                 // server variable configures this)
    }
});
       }
handleDisconnect();

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
	
	if(command === `${prefix}table`){
	if(message.author.id == '242118931769196544'){
	var sql = "CREATE TABLE user (id VARCHAR(30), class VARCHAR(30), inventory VARCHAR(30), location VARCHAR(30), status VARCHAR(30), hp INT, atk INT, def INT, mAtk INT, mDef INT, spd INT, money INT, lvl INT, turn INT)";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	message.author.send("Table created");
  	});
	}
	}




});











bot.login(process.env.BOT_TOKEN);

