const Discord = require("discord.js");
const Danbooru = require('danbooru');
const mysql = require("mysql");
const http = require('http');
const talkedRecently = new Set();
const prefix = ">";

const bot = new Discord.Client({disableEveryone: true})


	

bot.on("ready", async () => {

	console.log(`Let the games begin... ${bot.user.username}`);
	var channel = bot.channels.get('540209185430700043');
	//channel.sendMessage("KS-RPG is down until further notice. \n  Info in `>patches`");
	bot.user.setPresence({ status: 'idle', game: { name: '>patches' } });

//

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
		
	let statsID = 'ST' + message.author.id;
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

		con.query(`SELECT * FROM user WHERE id = '${statsID}'`, (err, rows) => {		
			let exp = rows[0].lvl;
			let cap = level * 100;
		let stats = new Discord.RichEmbed()

			
			.setAuthor(message.author.username)
			.setDescription("Lvl: " + level + "\n Exp to next level: \n" + exp + "/" + cap + " \n Class: \n" + clas + "\n Location: \n" + location +  "\n Floor: " + turn + "\n Status: \n" + status + "\n $" + money + "\n HP: " + hp + "\n ATK: " + atk + "\n DEF:" + def + "\n mAtk:" +  mAtk + "\n mDef: "+ mDef + "\n SPD: " + spd )
			.setColor("#4286f4"); 

		message.author.sendEmbed(stats);


		});
		

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
	
// if(command === `${prefix}add` && messageArray[1] != undefined){
		
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;
// 		let money = rows[0].money;
// 		var funds = parseInt(messageArray[1]);	
	
// 		if(rows.length < 1) {
			
// 			message.channel.send("This person doesn't have a KSRPG account!");
// 			return;
// 		}	else {

// 			if(money > funds && Number.isInteger(funds) === true && funds > 0){
// 			sql = `UPDATE user SET money = ${money - funds} WHERE id = '${message.author.id}'`;
         
//        			 con.query(sql); 
//            		message.channel.send("!ADD " + message.author + " " + funds);

// 			} else{
// 				message.channel.send("Invalid Input.");
// 			}
// 			return;
// 		}


// 		});
// 	}	
// 	if(command === `${prefix}view` && messageArray[1] === undefined){
			

// 		viewUser();
		

			

// 		 return; 

		

		

// 	}

// 	if(command === `${prefix}user`){
			
// 		choose();
		

			

// 		 return; 

		

		

// 	}
// 	if(command === `${prefix}toss` && messageArray[1] != undefined){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let items = rows[0].inventory;
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		if(items.indexOf("pot") != -1 && messageArray[1] == "pot"){
// 				var used = items.replace('pot\n','');
// 				sql = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
// 				con.query(sql, console.log);
// 				message.author.send("Tossed a potion!");
// 			return;
// 		}	else if(items.indexOf("mpot") != -1 && messageArray[1] == "mpot"){
// 				var used = items.replace('mpot\n','');
// 				sql = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
// 				con.query(sql, console.log);
// 				message.author.send("Tossed a mega potion!");
// 			return;
// 		}	else if(items.indexOf("upot") != -1 && messageArray[1] == "upot"){
// 				var used = items.replace('upot\n','');
// 				sql = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
// 				con.query(sql, console.log);
// 				message.author.send("Tossed an ultra potion!");
// 			return;
// 		}	else if(items.indexOf("reviv") != -1 && messageArray[1] == "reviv"){
// 				var used = items.replace('reviv\n','');
// 				sql = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
// 				con.query(sql, console.log);
// 				message.author.send("Tossed a revive!");
// 			return;
// 		}	else if(items.indexOf("revivu") != -1 && messageArray[1] == "revivu"){
// 				var used = items.replace('revivu\n','');
// 				sql = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
// 				con.query(sql, console.log);
// 				message.author.send("Tossed an ultra revive!");
// 			return;
// 		}	else if(items.indexOf("blade") != -1 && messageArray[1] == "blade"){
// 				var used = items.replace('blade\n','');
// 				sql = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
// 				con.query(sql, console.log);
// 				message.author.send("Tossed a blade!");
// 			return;
// 		}	else if(items.indexOf("mwand") != -1 && messageArray[1] == "mwand"){
// 				var used = items.replace('mwand\n','');
// 				sql = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
// 				con.query(sql, console.log);
// 				message.author.send("Tossed a magic wand!");
// 			return;
// 		}	else if(items.indexOf("bomb") != -1 && messageArray[1] == "bomb"){
// 				var used = items.replace('bomb\n','');
// 				sql = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
// 				con.query(sql, console.log);
// 				message.author.send("Tossed a bomb!");
// 			return;
// 		}	else if(items.indexOf("warp") != -1 && messageArray[1] == "warp"){
// 				var used = items.replace('warp\n','');
// 				sql = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
// 				con.query(sql, console.log);
// 				message.author.send("Tossed a warp hole!");
// 			return;
// 		}	else if(items.indexOf("glasses") != -1 && messageArray[1] == "glasses"){
// 				var used = items.replace('glasses\n','');
// 				sql = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
// 				con.query(sql, console.log);
// 				message.author.send("Tossed some really cool glasses!");
// 			return;
// 		}	else {
// 			message.author.send("You can't toss that!");
// 			return;
// 		}	
		

// 		});
// 	}
	
// 	if(command === `${prefix}buy` && messageArray[1] === `pot`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let stuff = rows[0].inventory;
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
// 		var items = stuff + "\n" + messageArray[1];
// 		if(money < 500) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
// 		if(items.length > 255){
// 			message.author.send("Your inventory is full! >toss [item] to get rid of an item!");
// 			return;
// 		}	
// 		sql = `UPDATE user SET money = ${money - 500}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		message.author.send("You bought a potion!");

// 		});
// 	}
	
// 	if(command === `${prefix}buy` && messageArray[1] === `mpot`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let stuff = rows[0].inventory;
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
// 		var items = stuff + "\n" + messageArray[1];
// 		if(money < 2000) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
// 		if(items.length > 255){
// 			message.author.send("Your inventory is full! >toss [item] to get rid of an item!");
// 			return;
// 		}	
// 		sql = `UPDATE user SET money = ${money - 2000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		message.author.send("You bought a mega potion!");

// 		});
// 	}
	
// 	if(command === `${prefix}buy` && messageArray[1] === `upot`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let stuff = rows[0].inventory;
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
// 		var items = stuff + "\n" + messageArray[1];
// 		if(money < 5000) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
// 		if(items.length > 255){
// 			message.author.send("Your inventory is full! >toss [item] to get rid of an item!");
// 			return;
// 		}	
// 		sql = `UPDATE user SET money = ${money - 5000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		message.author.send("You bought an ultra potion!");

// 		});
// 	}
	
// 	if(command === `${prefix}buy` && messageArray[1] === `reviv`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let stuff = rows[0].inventory;
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
// 		var items = stuff + "\n" + messageArray[1];
// 		if(money < 10000) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
// 		if(items.length > 255){
// 			message.author.send("Your inventory is full! >toss [item] to get rid of an item!");
// 			return;
// 		}	
// 		sql = `UPDATE user SET money = ${money - 10000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		message.author.send("You bought a revive!");

// 		});
// 	}
	
// 	if(command === `${prefix}buy` && messageArray[1] === `revivu`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let stuff = rows[0].inventory;
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
// 		var items = stuff + "\n" + messageArray[1];
// 		if(money < 25000) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
// 		if(items.length > 255){
// 			message.author.send("Your inventory is full! >toss [item] to get rid of an item!");
// 			return;
// 		}	
// 		sql = `UPDATE user SET money = ${money - 25000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		message.author.send("You bought an ultra revive!");

// 		});
// 	}
	
// 	 if(command === `${prefix}buy` && messageArray[1] === `blade`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let stuff = rows[0].inventory;
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
// 		var items = stuff + "\n" + messageArray[1];
// 		if(money < 50000) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
// 		if(items.length > 255){
// 			message.author.send("Your inventory is full! >toss [item] to get rid of an item!");
// 			return;
// 		}	
// 		sql = `UPDATE user SET money = ${money - 50000}, inventory = '${items}' WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		message.author.send("You bought a blade!");

// 		});
// 	}
	
// 	if(command === `${prefix}buy` && messageArray[1] === `mwand`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let stuff = rows[0].inventory;
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
// 		var items = stuff + "\n" + messageArray[1];
// 		if(money < 50000) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
// 		if(items.length > 255){
// 			message.author.send("Your inventory is full! >toss [item] to get rid of an item!");
// 			return;
// 		}	
// 		sql = `UPDATE user SET money = ${money - 50000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		message.author.send("You bought a magic wand!");

// 		});
// 	}
	
// 	if(command === `${prefix}buy` && messageArray[1] === `bomb`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;
// 		let stuff = rows[0].inventory;
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
// 		var items = stuff + "\n" + messageArray[1];
// 		if(money < 100000) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
// 		if(items.length > 255){
// 			message.author.send("Your inventory is full! >toss [item] to get rid of an item!");
// 			return;
// 		}	
// 		sql = `UPDATE user SET money = ${money - 100000}, inventory = '${items}' WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		message.author.send("You bought a bomb!");

// 		});
// 	}
	
// 	if(command === `${prefix}buy` && messageArray[1] === `statboost`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let hp = rows[0].hp;
// 		let atk = rows[0].atk;
// 		let def = rows[0].def;
// 		let mAtk = rows[0].mAtk;
// 		let mDef = rows[0].mDef;
// 		let spd = rows[0].spd;	
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
		
// 		if(money < 1000000) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
			
// 		sql = `UPDATE user SET money = ${money - 1000000} WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		let sql3;
// 			message.author.send("Which stat would you like to allocate to? \n >hp \n >atk \n >def \n >matk \n >mdef \n >spd");
// 			const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000000 });
//         		collector.once('collect', message => {
//             		if (message.content == `${prefix}hp`) {
               		
// 			sql3 = `UPDATE user SET hp = ${hp + 10} WHERE id = '${message.author.id}'`;
// 			con.query(sql3);
// 				message.author.send("HP increased!");
						
//                 		return;
//             		} else if (message.content == `${prefix}atk`) {
               		
// 			sql3 = `UPDATE user SET atk = ${atk + 1} WHERE id = '${message.author.id}'`;
// 			con.query(sql3);	
// 				message.author.send("ATK increased!");
				
//                 		return;
//             		} else if (message.content == `${prefix}def`) {
               		
// 			sql3 = `UPDATE user SET def = ${def + 1} WHERE id = '${message.author.id}'`;
// 			con.query(sql3);	
// 				message.author.send("DEF increased!");
						
//                 		return;
//             		} else if (message.content == `${prefix}matk`) {
               		
// 			sql3 = `UPDATE user SET mAtk = ${mAtk + 1} WHERE id = '${message.author.id}'`;
// 			con.query(sql3);
// 				message.author.send("MATK increased!");
					
//                 		return;
//             		} else if (message.content == `${prefix}mdef`) {
               		
// 			sql3 = `UPDATE user SET mDef = ${mDef + 1} WHERE id = '${message.author.id}'`;
// 			con.query(sql3);	
// 				message.author.send("MDEF increased!");
						
//                 		return;
//             		} else if (message.content == `${prefix}spd`) {
               		
// 			sql3 = `UPDATE user SET spd = ${spd + 1} WHERE id = '${message.author.id}'`;
// 			con.query(sql3);
// 				message.author.send("spd increased!");
						
//                 		return;
//             		} else {
// 			sql3 = `UPDATE user SET hp = ${hp + 10} WHERE id = '${message.author.id}'`;
// 			con.query(sql3);
// 				message.author.send("HP increased!");
			
// 			}	
// 			});	

// 		});
// 	}
	
// 	if(command === `${prefix}buy` && messageArray[1] === `warp`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let stuff = rows[0].inventory;
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
// 		var items = stuff + "\n" + messageArray[1];
// 		if(money < 1000000) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
// 		if(items.length > 255){
// 			message.author.send("Your inventory is full! >toss [item] to get rid of an item!");
// 			return;
// 		}	
// 		sql = `UPDATE user SET money = ${money - 1000000}, inventory = '${items}' WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		message.author.send("You bought a warp hole!");

// 		});
// 	}
	
// 	if(command === `${prefix}buy` && messageArray[1] === `megaBoost`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let hp = rows[0].hp;
// 		let atk = rows[0].atk;
// 		let def = rows[0].def;
// 		let mAtk = rows[0].mAtk;
// 		let mDef = rows[0].mDef;
// 		let spd = rows[0].spd;	
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
		
// 		if(money < 5000000) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
			
// 		sql = `UPDATE user SET hp = ${hp + 10}, atk = ${atk + 1}, def = ${def + 1}, mAtk = ${mAtk + 1}, mDef = ${mDef + 1}, spd = ${spd + 1}, money = ${money - 5000000}  WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		message.author.send("You increased all of your stats by 1!");

// 		});
// 	}
	
// 	if(command === `${prefix}buy` && messageArray[1] === `glasses`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;	
// 		let stuff = rows[0].inventory;
// 		if(rows.length < 1) {
// 			message.reply("You have no user!");
// 			console.log(rows);
// 			return;
// 		}

// 		let money = rows[0].money;
// 		var items = stuff + "\n" + messageArray[1];
// 		if(money < 10000000) {
// 			message.author.send("Insufficient Funds.");
// 			return;
// 		}
// 		if(items.length > 255){
// 			message.author.send("Your inventory is full! >toss [item] to get rid of an item!");
// 			return;
// 		}	
// 		sql = `UPDATE user SET money = ${money - 10000000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
// 		con.query(sql);		
// 		message.author.send("You bought some really cool glasses!");

// 		});
// 	}
	
	
	
	function shop(){
		let help = new Discord.RichEmbed()

			
			.setTitle("KS-RPG SHOP >buy [item] to purchase!")
			.setDescription("**pot** - $500 \n Heals 50 HP. Usable in battle only. \n **mpot** - $2000 \n Heals 100 HP. Usable in battle only. \n **upot** - $5000 \n Heals HP to full. Usable in battle only \n **reviv** - $10,000 \n Revives you to half hp when defeated. \n **revivu** - $25,000 \n Revives you to full hp when defeated. \n **blade** - $50,000 \n Sword that gives 30 additional damage to physical attacks \n **mwand** - $50,000 \n Magic wand that gives 30 additional magic damage to magic attacks \n **bomb** - $100,000 \n Chance to insta KO enemies, not bosses though \n **statboost** - $1,000,000 \n Permanently increases a stat \n **warp** - $1,000,000 \n You don't lose what floor you were at if you die \n **megaBoost** - $5,000,000 \n You increase all stats by 1 \n **glasses** - $10,000,000 \n Displays the stats of enemies when facing them.")
			.setColor("#ff9a0c"); 

		message.channel.send(help);
	}

	function inventory(){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			
			
			message.author.send("Create an KSRPG account with `>user`!");
			
		}	else {

 			
			message.author.send("Inventory: **" + stuff + "**");
			
			
		}
			});
		return;
	}
	
	function searchForest(){

		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			
			
			message.author.send("Create an KSRPG account with `>user`!");
			
		}	else {

 			sql = `UPDATE user SET location = 'Forest', turn = ${1} WHERE id = '${message.author.id}'`;
			con.query(sql, console.log);
			message.author.send("Welcome to the forest! Type `>go` to progress to the next floor!");
			
			
		}
			});
		return;
	}
	
	function searchCave(){
		let accessID = 'A' + message.author.id;
		con.query(`SELECT * FROM user WHERE id = '${accessID}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			
			message.author.send("You don't have access to this area!");
			return;
		}	else {

			con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			
			
			message.author.send("Create an KSRPG account with `>user`!");
			
		}	else {

 			sql = `UPDATE user SET location = 'Cave', turn = ${1} WHERE id = '${message.author.id}'`;
			con.query(sql, console.log);
			message.author.send("Welcome to the cave! Type `>go` to progress to the next floor!");
			
			
		}
			});
		return;
		}


		});
		
	}
	
	
	
	function progress(){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		let floor = rows[0].turn;	
		if(rows.length < 1) {
			
			
			message.author.send("Create an KSRPG account with `>user`!");
			
		}	else {

 			sql = `UPDATE user SET turn = ${floor + 1} WHERE id = '${message.author.id}'`;
			con.query(sql, console.log);
			message.author.send("Proceeded to floor **" + floor + "**");
			return;
			
		}
			});
		return;	
	}
	
	function goFunds(){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let money = rows[0].money;
		let floor = rows[0].turn;
			let sql;
			if(rows.length < 1) {
			
			return;
		}	else {
			
			var funds = floor * Math.floor(Math.random() * 9999) + 1;
			
 			
			sql = `UPDATE user SET money = ${money + funds} WHERE id = '${message.author.id}'`;
			con.query(sql);
			message.author.send("You found $" + funds +"!");
			progress();
			return;
		}
		});	
				
	}
	
	
	function goMoney(){
		con.query(`SELECT * FROM user WHERE id = 'ENEMY'`, (err, rows) => {
		if(err) throw err;
		let funds = rows[0].money;
		let monster = rows[0].class;
			let sql;
			if(rows.length < 1) {
			
			return;
		} else{
			// sql = `DELETE FROM user WHERE id = 'ENEMY'`;
			// con.query(sql, console.log);
		if(monster == "Wizard"){
			funds = 1000000;
		}	
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let money = rows[0].money;
			if(rows.length < 1) {
			
			return;
		}	else {
			
			
			
 			
			sql = `UPDATE user SET money = ${money + funds} WHERE id = '${message.author.id}'`;
			con.query(sql);
			message.author.send("You found $" + funds +" from the defeated " + monster + "!");
			var sql2 = `DELETE FROM user WHERE id = 'ENEMY'`;
			con.query(sql2, console.log);
			progress();
			return;
		}
		});	
		}
		});		
	}
	
		function goLose(){
		con.query(`SELECT * FROM user WHERE id = 'ENEMY'`, (err, rows) => {
		if(err) throw err;
		let sql;
		
		if(rows.length < 1) {
			
			
			
		}	else {
			
			
				sql = `DELETE FROM user WHERE id = 'ENEMY'`;
				con.query(sql, console.log);
				
			
			
		}
			});
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		let items = rows[0].inventory;
		let use;	
		if(rows.length < 1) {
			
			
			
		}	else {
			
				if(items.indexOf("warp") != -1){
				var used = items.replace('warp\n','');
				use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
				con.query(use, console.log);
				message.author.send("You have been defeated! Your warp hole activated and you didn't lose your spot in the dungeon!`");
				} else {
					sql = `UPDATE user SET location = '', turn = ${0} WHERE id = '${message.author.id}'`;
					con.query(sql, console.log);
					message.author.send("You have been defeated! You must start another quest with `>search [location]`");
				}
				return;
		}
			});	
	}
	
	function goExp(){
		con.query(`SELECT * FROM user WHERE id = 'ENEMY'`, (err, rows) => {
		if(err) throw err;
		let Elvl = rows[0].lvl;
		let monster = rows[0].class;
			let sql;
			if(rows.length < 1) {
			
			return;
		} else{
			var exp;
			if(monster == "Slime"){
				exp = Elvl * Math.floor(Math.random() * 25) + 1;
			} else if(monster == "Dragon"){
				exp = Elvl * Math.floor(Math.random() * 50) + 1;
			} else if(monster == "Wizard"){
				exp = Elvl * Math.floor(Math.random() * 1000) + 1;
			} else {
				exp = Elvl * Math.floor(Math.random() * 100) + 1;
			}	
		let statsID = 'ST' + message.author.id;
		con.query(`SELECT * FROM user WHERE id = '${statsID}'`, (err, rows) => {
		if(err) throw err;	
			let cap = rows[0].lvl;
			
			sql = `UPDATE user SET lvl = ${cap + exp} WHERE id = '${statsID}'`;
			con.query(sql);
			message.author.send("You gained **" + exp + "** experience points!");
			
		
			
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let lvl = rows[0].lvl;
		let hp = rows[0].hp;
		let atk = rows[0].atk;
		let def = rows[0].def;
		let mAtk = rows[0].mAtk;
		let mDef = rows[0].mDef;
		let spd = rows[0].spd;	
			let sql2;
			if(rows.length < 1) {
			
			return;
		}	else {
			
			var lvlUP = lvl * 100;
			
			function allocate(){
			let sql3;
			message.author.send("You leveled up! Which stat would you like to allocate to? \n >hp \n >atk \n >def \n >matk \n >mdef \n >spd");
			const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000000 });
        		collector.once('collect', message => {
            		if (message.content == `${prefix}hp`) {
               		
			sql3 = `UPDATE user SET hp = ${hp + 10} WHERE id = '${message.author.id}'`;
			con.query(sql3);
				message.author.send("HP increased!");
			goMoney();			
                		return;
            		} else if (message.content == `${prefix}atk`) {
               		
			sql3 = `UPDATE user SET atk = ${atk + 1} WHERE id = '${message.author.id}'`;
			con.query(sql3);	
				message.author.send("ATK increased!");
			goMoney();			
                		return;
            		} else if (message.content == `${prefix}def`) {
               		
			sql3 = `UPDATE user SET def = ${def + 1} WHERE id = '${message.author.id}'`;
			con.query(sql3);	
				message.author.send("DEF increased!");
			goMoney();			
                		return;
            		} else if (message.content == `${prefix}matk`) {
               		
			sql3 = `UPDATE user SET mAtk = ${mAtk + 1} WHERE id = '${message.author.id}'`;
			con.query(sql3);
				message.author.send("MATK increased!");
			goMoney();			
                		return;
            		} else if (message.content == `${prefix}mdef`) {
               		
			sql3 = `UPDATE user SET mDef = ${mDef + 1} WHERE id = '${message.author.id}'`;
			con.query(sql3);	
				message.author.send("MDEF increased!");
			goMoney();			
                		return;
            		} else if (message.content == `${prefix}spd`) {
               		
			sql3 = `UPDATE user SET spd = ${spd + 1} WHERE id = '${message.author.id}'`;
			con.query(sql3);
				message.author.send("spd increased!");
			goMoney();			
                		return;
            		} else {
			sql3 = `UPDATE user SET hp = ${hp + 10} WHERE id = '${message.author.id}'`;
			con.query(sql3);
				message.author.send("HP increased!");
			goMoney();	
			}	
				});
			}
			
 			if(cap > lvlUP){
			sql = `UPDATE user SET lvl = ${cap - lvlUP} WHERE id = '${statsID}'`;
			con.query(sql);	
			sql2 = `UPDATE user SET lvl = ${lvl + 1} WHERE id = '${message.author.id}'`;
			con.query(sql2);
				allocate()
			} else {
				goMoney();
			}	
			
			
		}
		});
		});
		}
		});		
	}
	
	function forestClear(){
		let accessID = 'A' + message.author.id;
		con.query(`SELECT * FROM user WHERE id = '${accessID}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			
			sql = `INSERT INTO user (id, lvl) VALUES ('${accessID}', ${1})`;
			con.query(sql, console.log);
			message.channel.send("A new location has been found! `>search cave` to visit the next location!");
			goExp();
			return;
		}	else {

			message.author.send("You have cleared the Forest successfully again!");
			goExp();

			
			return;
		}


		});
	}

	function forestBoss(){
		let statsID = 'ST' + message.author.id;
	function eTurn(){
		
			con.query(`SELECT * FROM user WHERE id = 'ENEMY'`, (err, rows) => {
			if(err) throw err;
		let status2 = rows[0].status;
		let hp2 = rows[0].hp;
		let atk2 = rows[0].atk;
		let def2 = rows[0].def;
		let mAtk2 = rows[0].mAtk;
		let mDef2 = rows[0].mDef;
		let spd2 = rows[0].spd;	
		let turn2 = rows[0].turn;
		let mon2 = rows[0].class	
		var roll2 = Math.floor(Math.random() * 6) + 1;	
		
				con.query(`SELECT * FROM user WHERE id = '${statsID}'`, (err, rows) => {
				if(err) throw err;
				let sql2;
				let statusE2 = rows[0].status;
				let hpE2 = rows[0].hp;
				let mdefE2 = rows[0].mDef;
				var dmg2 = (mAtk2 * roll2);
				var ddmg2 =  dmg2 - mdefE2;	
				var chance = Math.floor(Math.random() * 10) + 1;
				if(hp2 > 0) {	
					if(chance > 3){
						if(statusE2 == "defending"){
						sql2 = `UPDATE user SET status = '', hp = ${hpE2 - ddmg2}, turn = ${turn2 + 1} WHERE id = '${statsID}'`;
						con.query(sql2, console.log);
						message.author.send("The " + mon2 + " chanted an evil spell!");
						message.author.send("You took **" + ddmg2 + "** damage!");
						battle();
						} else {
						sql2 = `UPDATE user SET hp = ${hpE2 - dmg2}, turn = ${turn2 + 1} WHERE id = '${statsID}'`;
						con.query(sql2, console.log);
						message.author.send("The " + mon2 + " chanted an evil spell!");
						message.author.send("You took **" + dmg2 + "** damage!");
						battle();
						}
					}	
						 else {
							sql2 = `UPDATE user SET status = 'chanting', turn = ${turn2 + 1} WHERE id = 'ENEMY'`;
							con.query(sql2, console.log);
							message.author.send("The " + mon2 + " chanted a spell!");
							battle();
						}
				}	else {
					message.author.send("You won!")
					forestClear();
				}
					});
					});
				
	}
		
			con.query(`SELECT * FROM user WHERE id = '${statsID}'`, (err, rows) => {
			if(err) throw err;
		let status = rows[0].status;
		let skills = rows[0].inventory;
		let hp = rows[0].hp;
		let atk = rows[0].atk;
		let def = rows[0].def;
		let mAtk = rows[0].mAtk;
		let mDef = rows[0].mDef;
		let spd = rows[0].spd;	
		let cturn = rows[0].turn;	
		var roll = Math.floor(Math.random() * 6) + 1;	
		
				con.query(`SELECT * FROM user WHERE id = 'ENEMY'`, (err, rows) => {
				if(err) throw err;
				let sql;
				let sql0;
				let statusE = rows[0].status;
				let hpE = rows[0].hp;
				let defE = rows[0].def;
				let mdefE = rows[0].mDef;
				var dmg = (atk * roll);
				var ddmg =  dmg - defE;	
				var mdmg = (mAtk * roll);
				var mddmg =  mdmg - defE;	
				let mon = rows[0].class
				let Espd = rows[0].spd;	
				let turn2 = rows[0].turn;
				var kdmg = ddmg*2;
					
					con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let use;
		let items = rows[0].inventory;
		let baseHp = rows[0].hp;				
					
								function pturn(){	
				if(hp > 0){
				console.log(hp);
				console.log(hpE);	
				if(items.indexOf("glasses") != -1){
				message.author.send("Enemy stats: ??????????" );	
				}	
				message.author.send("HP: **" + hp + "**\n Skills: \n **" + skills + "** \n Items:" + items + " \n  What will you do? \n `>fight \n >defend \n >skill [skill] \n >item [item]`");
				const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000000 });
        		collector.once('collect', message => {
            		if (message.content == `${prefix}fight`) {
               			if(items.indexOf("blade") != -1){
					dmg += 30;
					ddmg +=30;
					message.author.send("The Blade increased your damage!");
				}
					if(statusE == "chanting"){
					sql = `UPDATE user SET status = '', hp = ${hpE - ddmg}, turn = ${cturn + 1} WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("The " + mon + " took **" + ddmg + "** damage!");
					sql0 = `UPDATE user hp = ${hp - ddmg}, turn = ${cturn + 1} WHERE id = '${statsID}'`;
					con.query(sql0, console.log);
					message.author.send("But you took **" + ddmg + "** reflected damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - dmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("The " + mon + " took **" + dmg + "** damage!");
					eTurn();
					}
						
                		return;
            		} else if (message.content == `${prefix}defend`) {
               				sql = `UPDATE user SET status = 'defending', turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					message.author.send("You raised your defenses!");
					eTurn();
                		return;
            		} else if (message.content == `${prefix}skill yeet`) {
               			if(skills.indexOf("yeet") != -1){
					if(statusE == "chanting"){
					sql = `UPDATE user SET SET status = '', hp = ${hpE - 40}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("You YEETED the " + mon + "!");
					message.author.send("The " + mon + " took **40** damage!");
					message.author.send("The spell cannot reflect the **YEET**");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - 40}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;	
					con.query(sql, console.log);
					message.author.send("You YEETED the " + mon + "!");
					message.author.send("The " + mon + " took **40** damage!");
					eTurn();
					}
				}	else {
					message.author.send("You don't have this skill!");
					eTurn();
				}
				}
				else if (message.content == `${prefix}skill beam`) {
				if(skills.indexOf("beam") != -1){
					
					if(items.indexOf("mwand") != -1){
					mdmg += 30;
					mddmg +=30;
					message.author.send("The magic wand increased your damage!");
				}
					if(statusE == "chanting"){
					sql = `UPDATE user SET status = '', SET hp = ${hpE - mddmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("You fired a beam at the " + mon + "!");
					message.author.send("The " + mon + " took **" + mddmg + "** damage!");
					sql0 = `UPDATE user hp = ${hp - mddmg}, turn = ${cturn + 1} WHERE id = '${statsID}'`;
					con.query(sql0, console.log);
					message.author.send("But you took **" + mddmg + "** reflected damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - mdmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;	
					con.query(sql, console.log);
					message.author.send("You fired a beam at the " + mon + "!");
					message.author.send("The " + mon + " took **" + mdmg + "** damage!");
					eTurn();
					}
				}	else {
					message.author.send("You don't have this skill!");
					eTurn();
				}
					}
				else if (message.content == `${prefix}skill kick`) {
				if(skills.indexOf("kick") != -1){
					if(items.indexOf("blade") != -1){
					kdmg += 30;
					ddmg +=30;
					message.author.send("The Blade increased your damage!");
				}
					if(statusE == "chanting"){
					sql = `UPDATE user SET status = '', SET hp = ${hpE - kdmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("You lunged at the " + mon + " with a kick!");
					message.author.send("The " + mon + " took **" + kdmg + "** damage!");
					sql0 = `UPDATE user hp = ${hp - ddmg}, turn = ${cturn + 1} WHERE id = '${statsID}'`;
					con.query(sql0, console.log);
					message.author.send("But you took **" + ddmg + "** reflected damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - kdmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;	
					con.query(sql, console.log);
					message.author.send("You lunged at the " + mon + " with a kick!");
					message.author.send("The " + mon + " took **" + kdmg + "** damage!");
					eTurn();
					}
				} else {
					message.author.send("You don't have this skill!");
					eTurn();
				}
			}
			else if (message.content == `${prefix}skill shot`) {
				if(skills.indexOf("shot") != -1){
					if(items.indexOf("blade") != -1){
					dmg += 30;
					ddmg +=30;
					message.author.send("The Blade increased your damage!");
					}
					
					if(items.indexOf("mwand") != -1){
					mdmg += 30;
					mddmg +=30;
					message.author.send("The magic wand increased your damage!");
					}	
					var shot = ddmg + mddmg;
					var shot2 = dmg + mdmg
					if(statusE == "chanting"){
					sql = `UPDATE user SET status = '', SET hp = ${hpE - shot}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("You shot at the " + mon + " with a gun!");
					message.author.send("The " + mon + " took **" + (ddmg + mddmg) + "** damage!");
					sql0 = `UPDATE user hp = ${hp - shot}, turn = ${cturn + 1} WHERE id = '${statsID}'`;
					con.query(sql0, console.log);
					message.author.send("But you took **" + shot + "** reflected damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - shot2}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;	
					con.query(sql, console.log);
					message.author.send("You shot at the " + mon + " with a gun!");
					message.author.send("The " + mon + " took **" + (dmg + mdmg) + "** damage!");
					eTurn();
					}
				}	else {
					message.author.send("You don't have this skill!");
					eTurn();
				}

                		return;
            		} else if (message.content == `${prefix}skill ORA`) {
				if(skills.indexOf("ORA") != -1){
					if(items.indexOf("blade") != -1){
					dmg += 30;
					ddmg +=30;
					message.author.send("The Blade increased your damage!");
				}
					var oraD = ddmg * Math.floor(Math.random() * 10) + 1;
					var ora = dmg * Math.floor(Math.random() * 10) + 1;
					if(statusE == "chanting"){
					sql = `UPDATE user SET status = '', SET hp = ${hpE - oraD}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("You hit the " + mon +" with a barrage of punches!");
					message.author.send("The " + mon + " took **" + oraD + "** damage!");
					sql0 = `UPDATE user hp = ${hp - oraD}, turn = ${cturn + 1} WHERE id = '${statsID}'`;
					con.query(sql0, console.log);
					message.author.send("But you took **" + oraD + "** reflected damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - ora}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;	
					con.query(sql, console.log);
					message.author.send("You hit the " + mon +" with a barrage of punches!");
					message.author.send("The " + mon + " took **" + ora + "** damage!");
					eTurn();
					}
				} else {
					message.author.send("You don't have this skill!");
					eTurn();
				}
			} else if (message.content == `${prefix}item pot`) {
				if(items.indexOf("pot") != -1){
					var health = baseHp - hp;
					if(health <= 50) {
					sql = `UPDATE user SET status = '', SET hp = ${hp + health}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('pot\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);
					message.author.send("You have been healed by " + health + " points!");
					eTurn();
					} else {
					sql = `UPDATE user SET status = '', SET hp = ${hp + 50}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('pot\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);	
					message.author.send("You have been healed by 50 points!");
					eTurn();
					}
				} else {
					message.author.send("You don't have this item!");
					eTurn();
				}
			} else if (message.content == `${prefix}item mpot`) {
				if(items.indexOf("mpot") != -1){
					var health = baseHp - hp;
					if(health <= 100) {
					sql = `UPDATE user SET status = '', SET hp = ${hp + health}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('mpot\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);
					message.author.send("You have been healed by " + health + " points!");
					eTurn();
					} else {
					sql = `UPDATE user SET status = '', SET hp = ${hp + 100}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('mpot\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);	
					message.author.send("You have been healed by 100 points!");
					eTurn();
					}
				} else {
					message.author.send("You don't have this item!");
					eTurn();
				}
			}  else if (message.content == `${prefix}item upot`) {
				if(items.indexOf("upot") != -1){
					sql = `UPDATE user SET status = '', SET hp = ${baseHp}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('upot\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);	
					message.author.send("You have been healed to full health!");
					eTurn();
					
				} else {
					message.author.send("You don't have this item!");
					eTurn();
				}
			}
   //          		else if (message.content == `${prefix}flee`) {
   //             		var flee = Math.floor(Math.random() * 6) + 1;
			// if(flee > 2){
			// 	message.author.send("Got away safely");
			// 	progress();
   //              		return;
   //          		} else {
			// 	message.author.send("Couldn't get away...");
			// 	eTurn();
			// }
			// }
				
				else {
				message.author.send("Not a valid response!");
				eTurn();	
			}
			});
			} else {
				if(items.indexOf("reviv") != -1){
					var halfHp = Math.floor(baseHp / 2);
					sql = `UPDATE user SET status = '', SET hp = ${halfHp}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('reviv\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);
					message.author.send("Your revive activated!");
					pturn();
				} else if(items.indexOf("revivu") != -1){
					sql = `UPDATE user SET status = '', SET hp = ${baseHp}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('revivu\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);
					message.author.send("Your ultra revive activated!");
					pturn();
				} else {
				goLose();    
				}
			}	
			
				}	
					
				if(Espd > spd && cturn == 1 && turn2 == 1){
					
					eTurn();
				} else {
					pturn();
				}		
				});	
						
				});	
				
			});
	}
	
	
	function battle(){
		let statsID = 'ST' + message.author.id;
	function eTurn(){
		
			con.query(`SELECT * FROM user WHERE id = 'ENEMY'`, (err, rows) => {
			if(err) throw err;
		let status2 = rows[0].status;
		let hp2 = rows[0].hp;
		let atk2 = rows[0].atk;
		let def2 = rows[0].def;
		let mAtk2 = rows[0].mAtk;
		let mDef2 = rows[0].mDef;
		let spd2 = rows[0].spd;	
		let turn2 = rows[0].turn;
		let mon2 = rows[0].class	
		var roll2 = Math.floor(Math.random() * 6) + 1;	
		
				con.query(`SELECT * FROM user WHERE id = '${statsID}'`, (err, rows) => {
				if(err) throw err;
				let sql2;
				let statusE2 = rows[0].status;
				let hpE2 = rows[0].hp;
				let defE2 = rows[0].def;
				var dmg2 = (atk2 * roll2);
				var ddmg2 =  dmg2 - defE2;	
				var chance = Math.floor(Math.random() * 10) + 1;
				if(hp2 > 0) {	
					if(chance > 3){
						if(statusE2 == "defending"){
						sql2 = `UPDATE user SET status = '', hp = ${hpE2 - ddmg2}, turn = ${turn2 + 1} WHERE id = '${statsID}'`;
						con.query(sql2, console.log);
						message.author.send("You took **" + ddmg2 + "** damage!");
						battle();
						} else {
						sql2 = `UPDATE user SET hp = ${hpE2 - dmg2}, turn = ${turn2 + 1} WHERE id = '${statsID}'`;
						con.query(sql2, console.log);
						message.author.send("You took **" + dmg2 + "** damage!");
						battle();
						}
					}	
						 else {
							sql2 = `UPDATE user SET status = 'defending', turn = ${turn2 + 1} WHERE id = 'ENEMY'`;
							con.query(sql2, console.log);
							message.author.send("The " + mon2 + " raised its defenses!");
							battle();
						}
				}	else {
					message.author.send("You won!")
					goExp();
				}
					});
					});
				
	}
		
			con.query(`SELECT * FROM user WHERE id = '${statsID}'`, (err, rows) => {
			if(err) throw err;
		let status = rows[0].status;
		let skills = rows[0].inventory;
		let hp = rows[0].hp;
		let atk = rows[0].atk;
		let def = rows[0].def;
		let mAtk = rows[0].mAtk;
		let mDef = rows[0].mDef;
		let spd = rows[0].spd;	
		let cturn = rows[0].turn;	
		var roll = Math.floor(Math.random() * 6) + 1;	
		
				con.query(`SELECT * FROM user WHERE id = 'ENEMY'`, (err, rows) => {
				if(err) throw err;
				let sql;
				let statusE = rows[0].status;
				let hpE = rows[0].hp;
				let defE = rows[0].def;
				let mdefE = rows[0].mDef;
				var dmg = (atk * roll);
				var ddmg =  dmg - defE;	
				var mdmg = (mAtk * roll);
				var mddmg =  mdmg - defE;	
				let mon = rows[0].class
				let Espd = rows[0].spd;	
				let turn2 = rows[0].turn;
				var kdmg = ddmg*2;
					con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let use;
		let items = rows[0].inventory;
		let baseHp = rows[0].hp;				
						
								function pturn(){	
				if(hp > 0){
				console.log(hp);
				console.log(hpE);	
				if(items.indexOf("glasses") != -1){
				message.author.send("Enemy stats: \n HP: " + hpE + " \n Atk: " + rows[0].atk + "\n Def: " + defE + "\n mAtk: " + rows[0].mAtk + "\n mDef: " + mdefE + "\n Spd: " + Espd );	
				}	
				
				message.author.send("HP: **" + hp + "**\n Skills: \n **" + skills + "** \n Items:" + items + " \n  What will you do? \n `>fight \n >defend \n >skill [skill] \n >item [item] \n >flee`");
				const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000000 });
        		collector.once('collect', message => {
            		if (message.content == `${prefix}fight`) {
               			if(items.indexOf("blade") != -1){
					dmg += 30;
					ddmg +=30;
					message.author.send("The Blade increased your damage!");
				}
					if(statusE == "defending"){
					sql = `UPDATE user SET status = '', hp = ${hpE - ddmg}, turn = ${cturn + 1} WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("The " + mon + " took **" + ddmg + "** damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - dmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("The " + mon + " took **" + dmg + "** damage!");
					eTurn();
					}
						
                		return;
            		} else if (message.content == `${prefix}defend`) {
               				sql = `UPDATE user SET status = 'defending', turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					message.author.send("You raised your defenses!");
					eTurn();
                		return;
            		} else if (message.content == `${prefix}skill yeet`) {
               			if(skills.indexOf("yeet") != -1){
					if(statusE == "defending"){
					sql = `UPDATE user SET status = '', SET hp = ${hpE - 40}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("You YEETED the " + mon + "!");
					message.author.send("The " + mon + " took **40** damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - 40}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;	
					con.query(sql, console.log);
					message.author.send("You YEETED the " + mon + "!");
					message.author.send("The " + mon + " took **40** damage!");
					eTurn();
					}
				}	else {
					message.author.send("You don't have this skill!");
					eTurn();
				}
				}
				else if (message.content == `${prefix}skill beam`) {
				if(skills.indexOf("beam") != -1){
					if(items.indexOf("mwand") != -1){
					mdmg += 30;
					mddmg +=30;
					message.author.send("The magic wand increased your damage!");
				}
					if(statusE == "defending"){
					sql = `UPDATE user SET status = '', SET hp = ${hpE - mddmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("You fired a beam at the " + mon + "!");
					message.author.send("The " + mon + " took **" + mddmg + "** damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - mdmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;	
					con.query(sql, console.log);
					message.author.send("You fired a beam at the " + mon + "!");
					message.author.send("The " + mon + " took **" + mdmg + "** damage!");
					eTurn();
					}
				}	else {
					message.author.send("You don't have this skill!");
					eTurn();
				}
					}
				else if (message.content == `${prefix}skill kick`) {
				if(skills.indexOf("kick") != -1){
					if(items.indexOf("blade") != -1){
					kdmg += 30;
					ddmg +=30;
					message.author.send("The Blade increased your damage!");
				}
					if(statusE == "defending"){
					sql = `UPDATE user SET status = '', SET hp = ${hpE - kdmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("You lunged at the " + mon + " with a kick!");
					message.author.send("The " + mon + " took **" + kdmg + "** damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - kdmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;	
					con.query(sql, console.log);
					message.author.send("You lunged at the " + mon + " with a kick!");
					message.author.send("The " + mon + " took **" + kdmg + "** damage!");
					eTurn();
					}
				} else {
					message.author.send("You don't have this skill!");
					eTurn();
				}
			}
			else if (message.content == `${prefix}skill shot`) {
				if(skills.indexOf("shot") != -1){
					if(items.indexOf("blade") != -1){
					dmg += 30;
					ddmg +=30;
					message.author.send("The Blade increased your damage!");
				}
					if(items.indexOf("mwand") != -1){
					mdmg += 30;
					mddmg +=30;
					message.author.send("The magic wand increased your damage!");
				}
					var shot = ddmg + mddmg;
					var shot2 = dmg + mdmg
					if(statusE == "defending"){
					sql = `UPDATE user SET status = '', SET hp = ${hpE - shot}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("You shot at the " + mon + " with a gun!");
					message.author.send("The " + mon + " took **" + (ddmg + mddmg) + "** damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - shot2}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;	
					con.query(sql, console.log);
					message.author.send("You shot at the " + mon + " with a gun!");
					message.author.send("The " + mon + " took **" + (dmg + mdmg) + "** damage!");
					eTurn();
					}
				}	else {
					message.author.send("You don't have this skill!");
					eTurn();
				}

                		return;
            		} else if (message.content == `${prefix}skill ORA`) {
				if(skills.indexOf("ORA") != -1){
					if(items.indexOf("blade") != -1){
					dmg += 30;
					ddmg +=30;
					message.author.send("The Blade increased your damage!");
				}
					var oraD = ddmg * Math.floor(Math.random() * 10) + 1;
					var ora = dmg * Math.floor(Math.random() * 10) + 1;
					if(statusE == "defending"){
					sql = `UPDATE user SET status = '', SET hp = ${hpE - oraD}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("You hit the " + mon +" with a barrage of punches!");
					message.author.send("The " + mon + " took **" + (ddmg*2) + "** damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - ora}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;	
					con.query(sql, console.log);
					message.author.send("You hit the " + mon +" with a barrage of punches!");
					message.author.send("The " + mon + " took **" + (dmg*2) + "** damage!");
					eTurn();
					}
				} else {
					message.author.send("You don't have this skill!");
					eTurn();
				}
			} else if (message.content == `${prefix}item pot`) {
				if(items.indexOf("pot") != -1){
					var health = baseHp - hp;
					if(health <= 50) {
					sql = `UPDATE user SET status = '', hp = ${hp + health}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('pot\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);
					message.author.send("You have been healed by " + health + " points!");
					eTurn();
					} else {
					sql = `UPDATE user SET status = '', hp = ${hp + 50}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('pot\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);	
					message.author.send("You have been healed by 50 points!");
					eTurn();
					}
				} else {
					message.author.send("You don't have this item!");
					eTurn();
				}
			} else if (message.content == `${prefix}item mpot`) {
				if(items.indexOf("mpot") != -1){
					var health = baseHp - hp;
					if(health <= 100) {
					sql = `UPDATE user SET status = '', hp = ${hp + health}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('mpot\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);
					message.author.send("You have been healed by " + health + " points!");
					eTurn();
					} else {
					sql = `UPDATE user SET status = '', hp = ${hp + 100}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('mpot\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);	
					message.author.send("You have been healed by 100 points!");
					eTurn();
					}
				} else {
					message.author.send("You don't have this item!");
					eTurn();
				}
			}  else if (message.content == `${prefix}item upot`) {
				if(items.indexOf("upot") != -1){
					sql = `UPDATE user SET status = '', hp = ${baseHp}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('upot\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);	
					message.author.send("You have been healed to full health!");
					eTurn();
					
				} else {
					message.author.send("You don't have this item!");
					eTurn();
				}
			}  else if (message.content == `${prefix}item bomb`) {
				if(items.indexOf("bomb") != -1){
					var dft = Math.floor(Math.random() * 2) + 1;
					if(dft == 1) {
					var used = items.replace('bomb\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);
					message.author.send("The monster was blown up!");
					goExp();
					} else {
					var used = items.replace('bomb\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);	
					message.author.send("The bomb was a dud....");
					eTurn();
					}
				} else {
					message.author.send("You don't have this item!");
					eTurn();
				}
			}
            		else if (message.content == `${prefix}flee`) {
               		var flee = Math.floor(Math.random() * 6) + 1;
			if(flee > 2){
				message.author.send("Got away safely");
				progress();
                		return;
            		} else {
				message.author.send("Couldn't get away...");
				eTurn();
			}
			}
				
				else {
				message.author.send("Not a valid response!");
				eTurn();	
			}
			});
			} else {
				if(items.indexOf("reviv") != -1){
					var halfHp = Math.floor(baseHp / 2);
					sql = `UPDATE user SET status = '', hp = ${halfHp}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('reviv\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);
					message.author.send("Your revive activated!");
					eTurn();
				} else if(items.indexOf("revivu") != -1){
					sql = `UPDATE user SET status = '', hp = ${baseHp}, turn = ${cturn + 1}  WHERE id = '${statsID}'`;
					con.query(sql, console.log);
					var used = items.replace('revivu\n','');
					use = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
					con.query(use, console.log);
					message.author.send("Your ultra revive activated!");
					eTurn();
				} else {
				goLose();    
				}       
			}	
			
				}
						
					
				if(Espd > spd && cturn == 1 && turn2 == 1){
					
					eTurn();
				} else {
					pturn();
				}	
					});	
				});	
						
					
				
			});
	}
	
	function fight(){
		let statsID = 'ST' + message.author.id;
			con.query(`SELECT * FROM user WHERE id = '${statsID}'`, (err, rows) => {
			if(err) throw err;
			let spd = rows[0].spd;
				
				
		con.query(`SELECT * FROM user WHERE id = 'ENEMY'`, (err, rows) => {
		if(err) throw err;
		let type = rows[0].class;
		let eSpd = rows[0].spd;	
			
			if(type == "Slime"){
			   const booru = new Danbooru()
		booru.posts({ tags: 'slime rating:safe', random: true }).then(posts => {
 		 // Select a random post from posts array
  		const index = Math.floor(Math.random() * posts.length)
  		const post = posts[index]
 
  		// Get post's url 
 		 const url = booru.url(post.file_url)
 			
		let slime1 = new Discord.RichEmbed()

			.setTitle("A slime has appeared!")
			.setImage(url.href)
			.setColor("#407f3b");

		message.author.sendEmbed(slime1);
		battle();
  		 })
			} else if(type == "Dragon"){
			   const booru = new Danbooru()
		booru.posts({ tags: 'dragon rating:safe', random: true }).then(posts => {
 		 // Select a random post from posts array
  		const index = Math.floor(Math.random() * posts.length)
  		const post = posts[index]
 
  		// Get post's url 
 		 const url = booru.url(post.file_url)
 			
		let dragon1 = new Discord.RichEmbed()

			.setTitle("A dragon has appeared!")
			.setImage(url.href)
			.setColor("#407f3b");

		message.author.sendEmbed(dragon1);
 		battle();
  		 })
			}  else if(type == "Demon") {
			   const booru = new Danbooru()
		booru.posts({ tags: 'demon rating:safe', random: true }).then(posts => {
 		 // Select a random post from posts array
  		const index = Math.floor(Math.random() * posts.length)
  		const post = posts[index]
 
  		// Get post's url 
 		 const url = booru.url(post.file_url)
 			
		let demon1 = new Discord.RichEmbed()

			.setTitle("A demon has appeared!")
			.setImage(url.href)
			.setColor("#407f3b");

		message.author.sendEmbed(demon1);
 		battle();
  		 })
			
			} else if(type == "Wizard") {
			   const booru = new Danbooru()
		booru.posts({ tags: 'wizard rating:safe', random: true }).then(posts => {
 		 // Select a random post from posts array
  		const index = Math.floor(Math.random() * posts.length)
  		const post = posts[index]
 
  		// Get post's url 
 		 const url = booru.url(post.file_url)
 			
		let demon1 = new Discord.RichEmbed()

			.setTitle("The **boss** wizard has appeared!")
			.setImage(url.href)
			.setColor("#407f3b");

		message.author.sendEmbed(demon1);
 		forestBoss();
  		 })
			
			} 
			
		});
				});
	}
	
	function enemy(){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let location = rows[0].location;
		let floor = rows[0].turn;	
		
				con.query(`SELECT * FROM user WHERE id = 'ENEMY'`, (err, rows) => {
				if(err) throw err;
				let sql;
					
				if(rows.length < 1) {
					if(location == "Forest" && floor != 100){
						var enem = Math.floor(Math.random() * 10) + 1;
						if(enem < 2){
							var eLvl = Math.floor(Math.random() * 5) + 1;
							var eHP = 200 + (eLvl * 10);
							var eAtk = 10 + eLvl;
							var eDef = 8 + eLvl;
							var emAtk = 10 + eLvl;
							var emDef = 8 + eLvl;
							var eSpd = 5 + eLvl;
							var cost =  eLvl * Math.floor(Math.random() * 9999) + 1;
						sql = `INSERT INTO user (id, class, hp, atk, def, matk, mdef, spd, money, lvl, turn) VALUES ('ENEMY', 'Dragon', ${eHP}, ${eAtk}, ${eDef}, ${emAtk}, ${emDef}, ${eSpd}, ${cost}, ${eLvl}, ${1})`;
						con.query(sql, console.log);
						fight();
							return;
						} else if(enem > 3 && enem < 10){
							var eLvl = Math.floor(Math.random() * 3) + 1;
							var eHP = 50 + (eLvl * 10);
							var eAtk = 1 + eLvl;
							var eDef = 1 + eLvl;
							var emAtk = 1 + eLvl;
							var emDef = 1 + eLvl;
							var eSpd = 1 + eLvl;
							var cost =  eLvl * Math.floor(Math.random() * 999) + 1
						sql = `INSERT INTO user (id, class, hp, atk, def, matk, mdef, spd, money, lvl, turn) VALUES ('ENEMY', 'Slime', ${eHP}, ${eAtk}, ${eDef}, ${emAtk}, ${emDef}, ${eSpd}, ${cost}, ${eLvl}, ${1})`;
						con.query(sql, console.log);
						fight();
							return;
						} else {
							var eLvl = Math.floor(Math.random() * 10) + 1;
							var eHP = 400 + (eLvl * 10);
							var eAtk = 20 + eLvl;
							var eDef = 15 + eLvl;
							var emAtk = 20 + eLvl;
							var emDef = 15 + eLvl;
							var eSpd = 10 + eLvl;
							var cost =  eLvl * Math.floor(Math.random() * 99999) + 1
						sql = `INSERT INTO user (id, class, hp, atk, def, matk, mdef, spd, money, lvl, turn) VALUES ('ENEMY', 'Demon', ${eHP}, ${eAtk}, ${eDef}, ${emAtk}, ${emDef}, ${eSpd}, ${cost}, ${eLvl}, ${1})`;
						con.query(sql, console.log);
						fight();
							return;
						}
					}	else if(location == "Forest" && floor == 100){
							var eLvl = 20;
							var eHP = 750 
							var eAtk = 7;
							var eDef = 10;
							var emAtk = 15;
							var emDef = 15;
							var eSpd = 10;
							var cost =  1000000;
						sql = `INSERT INTO user (id, class, hp, atk, def, matk, mdef, spd, money, lvl, turn) VALUES ('ENEMY', 'Wizard', ${eHP}, ${eAtk}, ${eDef}, ${emAtk}, ${emDef}, ${eSpd}, ${cost}, ${eLvl}, ${1})`;
						con.query(sql, console.log);
						fight();
					}
					else {
						message.author.send("Location not found.");
						return;
					}
				}	
					
					else {
					sql = `DELETE FROM user WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
						enemy();
						
				}
				});	
			return;
				});
	}
	
	function goBattle(){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		let status = rows[0].status;
		let clas = rows[0].class;	
		let hp = rows[0].hp;
		let atk = rows[0].atk;
		let def = rows[0].def;
		let mAtk = rows[0].mAtk;
		let mDef = rows[0].mDef;
		let spd = rows[0].spd;
		let items = rows[0].inventory;
	
		
		if(rows.length < 1) {
			
			message.author.send(" create a KSRPG account with `>user`!");
			
		}	else {
					let statsID = 'ST' + message.author.id;
					con.query(`SELECT * FROM user WHERE id = '${statsID}'`, (err, rows) => {
					if(err) throw err;
					let sql;
					
					if(rows.length < 1) {
						if(clas == "mortal"){
						sql = `INSERT INTO user (id, inventory, status, hp, atk, def, matk, mdef, spd, lvl, turn) VALUES ('${statsID}', 'yeet',  '', ${hp}, ${atk}, ${def}, ${mAtk}, ${mDef}, ${spd}, ${0}, ${1})`;
						con.query(sql, console.log);
						enemy();
						return;
						} else if(clas == "mage"){
						sql = `INSERT INTO user (id, inventory, status, hp, atk, def, matk, mdef, spd, lvl, turn) VALUES ('${statsID}', 'beam',  '', ${hp}, ${atk}, ${def}, ${mAtk}, ${mDef}, ${spd}, ${0}, ${1})`;
						con.query(sql, console.log);
						enemy();
						return;
						} else if(clas == "martial artist"){
						sql = `INSERT INTO user (id, inventory, status, hp, atk, def, matk, mdef, spd, lvl, turn) VALUES ('${statsID}', 'kick',  '', ${hp}, ${atk}, ${def}, ${mAtk}, ${mDef}, ${spd}, ${0}, ${1})`;
						con.query(sql, console.log);
						enemy();
						return;
						} else {
						sql = `INSERT INTO user (id, inventory, status, hp, atk, def, matk, mdef, spd, lvl, turn) VALUES ('${statsID}', 'shot',  '', ${hp}, ${atk}, ${def}, ${mAtk}, ${mDef}, ${spd}, ${0}, ${1})`;
						con.query(sql, console.log);
						enemy();
						return;
						}
					}	else {
						
						sql = `UPDATE user SET status = '', hp = ${hp}, atk = ${atk}, def = ${def}, mAtk = ${mAtk}, mDef = ${mDef}, spd = ${spd}, turn = ${1} WHERE id = '${statsID}'`;
						con.query(sql, console.log);
						enemy();
					}
			
				return;
		});
		
			}
			
			});
	
	}	
			
// 	if(command === `${prefix}go`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;
// 		let location = rows[0].location;
// 		if(rows.length < 1) {
			
			
// 			message.author.send("Create an KSRPG account with `>user`!");
			
// 		}	else {
			
// 			if(location == "Forest"){
// 		var chance = Math.floor(Math.random() * 10) + 1;
// 		if(chance > 3){
// 			goBattle();
// 		} else if(chance < 3){
// 			progress();
// 		} else {
// 			goFunds();
// 		}
// 		} else {
// 			message.author.send("Start a quest with `>search Forest`!");
// 			return;
// 		}
// 		 return; 
// 		}
// 			});
		
		

		

		

// 	}	
			
// 	if(command === `${prefix}leave`){
// 		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
// 		if(err) throw err;
// 		let sql;
// 		if(rows.length < 1) {
			
// 		message.author.send("You don't have a journey to end!");
// 			return;
// 		}	else {

	
			
//  			sql = `UPDATE user SET location = '', turn = ${1} WHERE id = '${message.author.id}'`;
// 			con.query(sql, console.log);
// 			message.author.send("Journey ended!");
			
// 			return;
			
			
// 		}
// 			});
// 	}
		
// 	if(command === `${prefix}search` && messageArray[1] == "Forest"){
// 		searchForest();
// 	}

// 	if(command === `${prefix}inventory`){
// 		inventory();
// 	}

// 	if(command === `${prefix}shop`){
// 		shop();
// 	}
			  
			  
	
	if(message.channel.type === "dm") return;
	
// 	if(command === `${prefix}view` && messageArray[1] != undefined ){
			
// 		viewOtherUser();
		

			

// 		 return; 

		

		

// 	}
	
// 	if(command === `${prefix}delete`){
			
// 		deleteUser();
		

			

// 		 return; 

		

		

// 	}
	
	
	
	if(command === `${prefix}help`){
		
		let help = new Discord.RichEmbed()

			
			.setTitle("KS-RPG Commands")
			.setDescription("**>help**: \n Brings up this list \n **>add [amount]**: \n Adds funds from KS-Bot account. \n **>view**: \n Displays your stats in a dm. Can be dm'd to bot. \n **>view [user]**: \n Displays another persons stats, but not all the details. \n **>patches**: \n Shows the updates on KSRPG, Check for bug fixes, etc. \n ***DM ONLY CHANNEL COMMANDS***: \n **>user**: \n Creates a user. \n **>search [location]**: \n Starts your journey in a location \n **>go** \n progresses to next floor \n **>leave**: \n Leaves a dungeon. \n **>shop**: \n Pulls up a shop. \n **>inventory**: \n Displays your current inventory.")
			.setColor("#ff9a0c"); 

		message.author.send(help);
		message.reply("I've sent you a DM with the help.");


		return;

	}

	if(command === `${prefix}patches`){
		
		let help = new Discord.RichEmbed()

			
			.setTitle("Patch Notes 2/3/29")
			.setDescription("- KS-RPG down until further notice. Changes will be made to money scaling, levels, and inventory. Changes may result in loss of money for the sake of economy, but will be made up in exclusive items.")
			.setColor("#ff9a0c"); 

		message.channel.send(help);
		


		return;

	}
	
	if(command === `${prefix}table`){
	if(message.author.id == '242118931769196544'){
	var sql = "CREATE TABLE user (id VARCHAR(30), class VARCHAR(30), inventory VARCHAR(255), location VARCHAR(30), status VARCHAR(30), hp INT, atk INT, def INT, mAtk INT, mDef INT, spd INT, money INT, lvl INT, turn INT)";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	message.author.send("Table created");
  	});
	}
	}
			
	if(command === `${prefix}drop`){
	if(message.author.id == '242118931769196544'){
	var sql = "DROP TABLE user";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	message.author.send("Table dropped!");
  	});
	}
	}




});











bot.login(process.env.BOT_TOKEN);

