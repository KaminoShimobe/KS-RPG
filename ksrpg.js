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
	channel.sendMessage("KS-RPG IS LIVE!! CHECK IT OUT WITH `>patches`");
	bot.user.setPresence({ status: 'online', game: { name: '>help' } });



	try {

		let link = await bot.generateInvite(["ADMINISTRATOR"]);

		console.log(link);

	}	catch(e) {

		console.log(e.stack);

	}
//


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
		
		if(rows.length < 1) {
			
			
			
		}	else {
			
			
				sql = `UPDATE user SET location = '', turn = ${0} WHERE id = '${message.author.id}'`;
				con.query(sql, console.log);
				message.author.send("You have been defeated! You must start another quest with `>search [location]`");
			
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
				
					
								function pturn(){	
				if(hp > 0){
				console.log(hp);
				console.log(hpE);	
				message.author.send("HP: **" + hp + "**\n Skills: \n **" + skills + "** \n  What will you do? \n `>fight \n >defend \n >skill [skill] \n >flee`");
				const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000000 });
        		collector.once('collect', message => {
            		if (message.content == `${prefix}fight`) {
               		
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
					sql = `UPDATE user SET hp = ${hpE - 40}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
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
					if(statusE == "defending"){
					sql = `UPDATE user SET hp = ${hpE - mddmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
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
					if(statusE == "defending"){
					sql = `UPDATE user SET hp = ${hpE - (ddmg*2)}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
					con.query(sql, console.log);
					message.author.send("You lunged at the " + mon + " with a kick!");
					message.author.send("The " + mon + " took **" + (ddmg*2) + "** damage!");
					eTurn();
					} else {
					sql = `UPDATE user SET hp = ${hpE - dmg}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;	
					con.query(sql, console.log);
					message.author.send("You lunged at the " + mon + " with a kick!");
					message.author.send("The " + mon + " took **" + (dmg*2) + "** damage!");
					eTurn();
					}
				} else {
					message.author.send("You don't have this skill!");
					eTurn();
				}
			}
			else if (message.content == `${prefix}skill shot`) {
				if(skills.indexOf("shot") != -1){
					var shot = ddmg + mddmg;
					var shot2 = dmg + mdmg
					if(statusE == "defending"){
					sql = `UPDATE user SET hp = ${hpE - shot}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
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
					var oraD = ddmg * Math.floor(Math.random() * 10) + 1;
					var ora = dmg * Math.floor(Math.random() * 10) + 1;
					if(statusE == "defending"){
					sql = `UPDATE user SET hp = ${hpE - oraD}, turn = ${cturn + 1}  WHERE id = 'ENEMY'`;
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
				goLose();       
			}	
			
				}	
					
				if(Espd > spd && cturn == 1 && turn2 == 1){
					
					eTurn();
				} else {
					pturn();
				}		
				});	
						
					
				
			});
	}
	
	function fight(){
		let statsID = 'ST' + message.author.id;
			con.query(`SELECT * FROM user WHERE id = '${statsID}'`, (err, rows) => {
			if(err) throw err;
			let spd = rows[0].spd;
			let turn = rows[0].turn;	
				
		con.query(`SELECT * FROM user WHERE id = 'ENEMY'`, (err, rows) => {
		if(err) throw err;
		let type = rows[0].class;
		let eSpd = rows[0].spd;	
			
			if(type == "Slime" && turn < 2 ){
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
			} else if(type == "Dragon" && turn < 2 ){
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
			}  else if(type == "Demon" && turn < 2 ) {
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
			
			} 
			
		});
				});
	}
	
	function enemy(){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let location = rows[0].location;
			
		
				con.query(`SELECT * FROM user WHERE id = 'ENEMY'`, (err, rows) => {
				if(err) throw err;
				let sql;
					
				if(rows.length < 1) {
					if(location == "Forest"){
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
			
	if(command === `${prefix}go`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		let location = rows[0].location;
		if(rows.length < 1) {
			
			
			message.author.send("Create an KSRPG account with `>user`!");
			
		}	else {
			
			if(location == "Forest"){
		var chance = Math.floor(Math.random() * 10) + 1;
		if(chance > 3){
			goBattle();
		} else if(chance < 3){
			progress();
		} else {
			goFunds();
		}
		} else {
			message.author.send("Start a quest with `>search Forest`!");
			return;
		}
		 return; 
		}
			});
		
		

		

		

	}	
			
	if(command === `${prefix}leave`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			
		message.author.send("You don't have a journey to end!");
			return;
		}	else {

	
			
 			sql = `UPDATE user SET location = '', turn = ${1} WHERE id = '${message.author.id}'`;
			con.query(sql, console.log);
			message.author.send("Journey ended!");
			
			return;
			
			
		}
			});
	}
		
	if(command === `${prefix}search` && messageArray[1] == "Forest"){
		searchForest();
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
			.setDescription("**>help**: \n Brings up this list \n **>add [amount]**: \n Adds funds from KS-Bot account. \n **>view**: \n Displays your stats in a dm. Can be dm'd to bot. \n **>view [user]**: \n Displays another persons stats, but not all the details. \n **>patches**: \n Shows the updates on KSRPG, Check for bug fixes, etc. \n ***DM ONLY CHANNEL COMMANDS***: \n **>user**: \n Creates a user. \n **>search [location]**: \n Starts your journey in a location \n **>go** \n progresses to next floor \n **>leave**: \n Leaves a dungeon.")
			.setColor("#ff9a0c"); 

		message.author.send(help);
		message.reply("I've sent you a DM with the help.");


		return;

	}

	if(command === `${prefix}patches`){
		
		let help = new Discord.RichEmbed()

			
			.setTitle("Patch Notes 1/30/29")
			.setDescription("-Buffed exp gain \n - You can now see your level progress \n -Wait a bit before sending too many messages. You may get bodied.\n-battles tell you when the monster goes first \n -Can now do >skill to use your skill! \n -**KSRPG IS LIVE** \n -There is no limit to the current dungeon the forest, but rewards increase the deeper you go.\n -Working on a shop to purchase items \n -More levels coming hopefully later today, with a boss")
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

