/*$(document).ready(function() {
	ui.login();
})*/

var me = {};


var ping="/ping";
var create="/create";
var user="/doudou"
var pass="/doudou";
var login="/login";
var suppr="/delete";
var about = "/about";
var inbox = "/inbox";
var tell = "/tell";
var token = "/a2df9";
var dest = "/pwit7";
var message = "/on va y arriver !!!";

var ui = {
	ping : function(){
		$.ajax({
			url: "http://node.freelancis.net"+ping,
			dataType: "jsonp",
			success: function(data){
				console.log("ca marche",data);
				ui.parse(data);
			},
			error: function(err){
				console.log("ca plante",err);
			}
		});
	},
	createAccount : function(){
		$.ajax({
			url: "http://node.freelancis.net"+create+user+pass,
			dataType: "jsonp",
			success: function(data){
				console.log("ca marche",data);
				ui.parse(data);
			},
			error: function(err){
				console.log("ca plante",err);
			}
		});
	},
	login : function(){
		$.ajax({
			url: "http://node.freelancis.net"+login+user+pass,
			dataType: "jsonp",
			success: function(data){
				console.log("ca marche",data);
				me.user = user; // ametter a jour avec ce que t'auron envoyé les zousouzs
				me.token = data.token;
				token = me.token;
				ui.tell();


			},
			error: function(err){
				console.log("ca plante",err);
			}
		});
	},
	tell : function(){
		var message = encodeURIComponent($("#message",this).val());     
                    console.log(message);              
                var tell = "/tell/";               
                var dest = $("#dest",this).val(); //récupère la valeur du destinataire
            $.ajax({
                url: "http://node.freelancis.net"+tell+me.user+"/"+me.token+"/"+dest+"/"+message,
                type: $(this).attr('method'),
                dataType: "jsonp", 
                    success: function(data){
                    
                        me.user = user;
                        me.message = message;                        
                        me.token = data.token;
                            
                        console.log("message envoyé",data);        
                            
                    },

                 error: function(err){
                 console.log("ca plante",err);

            }                
        });
	},
	inbox : function(){
		$.ajax({
			url: "http://node.freelancis.net"+inbox+"/"+me.user+"/"+me.token,
			dataType: "jsonp",
			success: function(data){
				console.log("ca marche",data);
				
				ui.parse(data);
				
				window.setTimeout(function(){
					ui.inbox();
					console.log("ca marcheeee");
				}, 3000);
				
			},
			error: function(err){
				console.log("ca plante",err);
			}
		});
	},
	about : function(){
		$.ajax({
			url: "http://node.freelancis.net"+about+user,
			dataType: "jsonp",
			success: function(data){
				console.log("ca marche",data);
				ui.parse(data);
			},
			error: function(err){
				console.log("ca plante",err);
			}
		});
	},
	suppr : function(){
		$.ajax({
			url: "http://node.freelancis.net"+suppr+user+pass,
			dataType: "jsonp",
			success: function(data){
				console.log("ca marche",data);
				ui.parse(data);
			},
			error: function(err){
				console.log("ca plante",err);
			}
		});
	},
	parse : function(data){
		$(data.inbox).each(function(i){
			ui.mesg(this);
			console.log(this);
			var date = this.dt;
			var from = this.from;
			var msg = decodeURIComponent(this.message);
			var info = from+" ( "+date+" ) : "+msg;
		});
	},
	mesg : function(line){
		var p = $("<p>").html(line.from+" ( "+line.dt+" ) : "+decodeURIComponent(line.message));
		
		if ($("#"+line.from).length == 0) {
			dest = line.from;
			var div = $("<div>").attr("id", line.from);
			var a = $("<a>").attr("href", "#"+line.from).html(line.from);
			$(div).append(a).append("<br />");
			$("#contact").append(div);
			console.log("n'existe pas");
		} else {
			console.log("existe");
		}
		
		$("#"+line.from).append(p);
		
		$("#"+line.from+" p").hide();
		$("#"+line.from+" a").bind("click", function(e){
			$("#"+line.from+" p").show("slow");
		})
	},
	contact : function(line){

		if ($("#"+line).length == 0) {
			dest = line;
			var div = $("<div>").attr("id", line);
			var a = $("<a>").attr("href", "#"+line).html(line);
			$(div).append(a);
			$("#contact").append(div);
			console.log("n'existe pas");
		} else {
			console.log("existe");
		}
	}
	
}