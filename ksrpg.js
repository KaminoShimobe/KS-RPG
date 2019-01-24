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
	if(message.author.bot == true && command === ">ADD" && messageArray[2] != undefined){
		let other = message.mentions.users.first();
		con.query(`SELECT * FROM user WHERE id = '${other.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		let money = rows[0].money;
		var funds = parseInt(messageArray[2]);	
		if(rows.length < 1) {
			
			message.channel.send("This person doesn't have a KSRPG account!");
			return;
		}	else {

			
			sql = `UPDATE user SET money = ${money + funds} WHERE id = '${other.id}'`;
         
       			 con.query(sql); 
           			message.channel.send(other.username + " transferred $" + funds + " to their KSRPG account!");

			
			return;
		}


		});
	}
	
	
	if(message.author.bot) return;
	
	function mortal(){
		
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			
			sql = `INSERT INTO user (id, class, inventory, location, status, hp, atk, def, matk, mdef, spd, money, lvl, turn) VALUES ('${message.author.id}', 'mortal', '', '', '', ${125}, ${5}, ${5}, ${5}, ${5}, ${5}, ${0}, ${1}, ${0})`;
			con.query(sql, console.log);
			message.channel.send("Mortal class selected! use command `>view [user]` to view someone else's info, or `>view` to view your own info!");
			return;
		}	else {

			message.reply(" You have a KSRPG account!");
			

			
			return;
		}


		});
		

		
	}
	
	function mage(){
		
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			
			sql = `INSERT INTO user (id, class, inventory, location, status, hp, atk, def, matk, mdef, spd, money, lvl, turn) VALUES ('${message.author.id}', 'mage', '', '', '', ${100}, ${3}, ${3}, ${7}, ${7}, ${5}, ${0}, ${1}, ${0})`;
			con.query(sql, console.log);
			message.channel.send("Mage class selected! use command `>view [user]` to view someone else's info, or `>view` to view your own info!");
			return;
		}	else {

			message.reply(" You have a KSRPG account!");
			

			
			return;
		}


		});
		

		
	}
	
	function martial(){
		
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			
			sql = `INSERT INTO user (id, class, inventory, location, status, hp, atk, def, matk, mdef, spd, money, lvl, turn) VALUES ('${message.author.id}', 'martial artist', '', '', '', ${135}, ${7}, ${7}, ${3}, ${3}, ${5}, ${0}, ${1}, ${0})`;
			con.query(sql, console.log);
			message.channel.send("Martial Artist class selected! use command `>view [user]` to view someone else's info, or `>view` to view your own info!");
			return;
		}	else {

			message.reply(" You have a KSRPG account!");
			

			
			return;
		}


		});
		

		
	}
	
	function marksman(){
		
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			
			sql = `INSERT INTO user (id, class, inventory, location, status, hp, atk, def, matk, mdef, spd, money, lvl, turn) VALUES ('${message.author.id}', 'marksman', '', '', '', ${100}, ${7}, ${2}, ${7}, ${2}, ${7}, ${0}, ${1}, ${0})`;
			con.query(sql, console.log);
			message.channel.send("Marksman class selected! use command `>view [user]` to view someone else's info, or `>view` to view your own info!");
			return;
		}	else {

			message.reply(" You have a KSRPG account!");
			

			
			return;
		}


		});
		

		
	}
	
	
	
	function choose(){
		message.author.send(" which class would you want? \n `>mortal` : \n Balanced stats and can use most weapons \n `>mage` : \n Stronger in magic stats but weak in physical stats \n `>martialArtist` : \n Stronger in physical stats but weak in magic stats \n `>marksman` : Fast. Furious. Frail."); 
	const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000000 });
        		collector.once('collect', message => {
            		if (message.content == `${prefix}mortal`) {
               		mortal();
                		return;
            		} else if (message.content == `${prefix}mage`) {
               		mage();
                		return;
            		} else if (message.content == `${prefix}martialArtist`) {
               		martial();
                		return;
            		} else if (message.content == `${prefix}marksman`) {
               		marksman();
                		return;
            		}
				else {
				message.author.send("Not a valid response!");		
			}
			});
	
	
       }
	
	function viewUser(){
		
	
con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;

		if(rows.length < 1) {
			message.reply("You have no KSRPG account!");
			console.log(rows);
			return;
		}
	
		let clas = rows[0].class;
		let location = rows[0].location;
		let status = rows[0].status;
		let hp = rows[0].hp;
		let atk = rows[0].atk;
		let def = rows[0].def;
		let mAtk = rows[0].mAtk;
		let mDef = rows[0].mDef;
		let spd = rows[0].spd;
		let money = rows[0].money;
		let level = rows[0].lvl;
		let turn = rows[0].turn;
				

		let stats = new Discord.RichEmbed()

			
			.setAuthor(message.author.username)
			.setDescription("Lvl: " + level + " \n Class: \n" + clas + "\n Location: \n" + location +  "\n Floor: " + turn + "\n Status: \n" + status + "\n $" + money + "\n HP: " + hp + "\n ATK: " + atk + "\n DEF:" + def + "\n mAtk:" +  mAtk + "\n mDef: "+ mDef + "\n SPD: " + spd )
			.setColor("#4286f4"); 

		message.author.sendEmbed(stats);


		
		

	});
	}
	
	
let other = message.mentions.users.first();

function viewOtherUser(){
	

con.query(`SELECT * FROM user WHERE id = '${other.id}'`, (err, rows) => {
		if(err) throw err;

		if(!rows[0]) return message.channel.send("They don't have a KSRPG account!");

		
		let clas = rows[0].class;
		let location = rows[0].location;
		let status = rows[0].status;
		let level = rows[0].lvl;
		let turn = rows[0].turn;
				

		let stats = new Discord.RichEmbed()

			
			.setAuthor(other.username)
			.setDescription("Lvl: " + level + " \n Class: \n" + clas + "\n Location: \n" + location +  "\n Floor: " + turn)
			.setColor("#d10026"); 

		message.channel.sendEmbed(stats);


		
		

	});
	return;
}
	
	function deleteUser(){

con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;

		let sql;
		if(rows.length < 1) {
			message.reply("You have no user.");
			console.log(rows);
		} else {
			sql = `DELETE FROM user WHERE id = '${message.author.id}'`;
			con.query(sql, console.log);
			message.reply(" KSRPG account deleted! `>user` to create a new one!");
		}

	});
	return;
}
	
if(command === `${prefix}add` && messageArray[1] != undefined){
		
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		let money = rows[0].money;
		var funds = parseInt(messageArray[1]);	
	
		if(rows.length < 1) {
			
			message.channel.send("This person doesn't have a KSRPG account!");
			return;
		}	else {

			if(money > funds && Number.isInteger(funds) === true && funds > 0){
			sql = `UPDATE user SET money = ${money - funds} WHERE id = '${message.author.id}'`;
         
       			 con.query(sql); 
           		message.channel.send("!ADD " + message.author + " " + funds);

			} else{
				message.channel.send("Invalid Input.");
			}
			return;
		}


		});
	}	
	if(command === `${prefix}view` && messageArray[1] === undefined){
			

		viewUser();
		

			

		 return; 

		

		

	}

	if(command === `${prefix}user`){
			
		choose();
		

			

		 return; 

		

		

	}

	
	if(message.channel.type === "dm") return;
	
	if(command === `${prefix}view` && messageArray[1] != undefined ){
			
		viewOtherUser();
		

			

		 return; 

		

		

	}
	
	if(command === `${prefix}delete`){
			
		deleteUser();
		

			

		 return; 

		

		

	}
	
	
	
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

			
			.setTitle("Patch Notes 1/24/29")
			.setDescription("-Adding stuff now so this bot can be badass :sunglasses: \n - Can view users and self.")
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

