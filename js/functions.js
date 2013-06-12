var me = {};
var msg = {};

var login="/login";
var suppr="/delete";
var about = "/about";
var inbox = "/inbox";
var tell = "/tell";

var account = {
    
	createU : function(){
	    $('#subscribe').bind("submit", function(e) { 
     
	        e.preventDefault();
     
     
	        var user = $('#sub-log ').val();
	        var pass = $('#sub-pass').val();
     
     
     
	        if(user == '' || pass == '') {
	            alert('Les champs doivent êtres remplis');
	        } else {
        
	            $.ajax({
	                url: "http://node.freelancis.net/create/"+user+"/"+pass, 
	                type: $(this).attr('method'),
	                dataType: "jsonp", 
	                success: function(data){
             
	                        me.user = user;
	                        me.pass = pass;
	                        me.token = data.token;
                     
	                        console.log("ca marche",data);
	                        var confirm = $("<div>").addClass("confirm").html("Votre compte a bien été créé!");
	                        $("#content").append(confirm);
                     
                     
	                       
	                },
	                error: function(err){
	                    console.log("ca plante",err);
	                }
             
	            });
	        };
      
	    });
	},
    
	//TRIGGER
	trigger : function(){   
		 $("#trigger").bind("click",function(e){
			$('#subscribe_form').hide("slow");
			$('.confirm').hide("slow");
			$('#connexion_form').show("slow");
			$('#trigger').remove(); //cache le trigger
			e.preventDefault()
		});
	},

    //QUAND L'USER EST CONNECTE
	connect : function(){
		    $('#user').bind("submit", function(e) { //On écoute le boutton SAVE quand l'user se connecte

	        $('#connexion_form').hide("slow");//On cache le form de connexion
	        $("a#messages").show("fast");
	        $("a#contact").show("fast");

	        //Affichage du chat
	        $('#chat_form').show("slow");
		    var chat_title = $("<h1>").addClass("chat_title").html("Envoyer un message:");
		    $("#chat_form").prepend(chat_title);
		    e.preventDefault();

		    var user = $('#log-log',this).val();
		    var pass = $('#log-pass',this).val();

		    if(user == '' || pass == '') {
		        alert('Les champs doivent êtres remplis (connexion)');
		    } else {


		    //Affichage de l'INBOX
			$.ajax({
		        url: "http://node.freelancis.net/login/"+user+"/"+pass, 
		        type: $(this).attr('method'),
		        dataType: "jsonp", 
		        success: function(data){

		                me.user = user; 
		                me.pass = pass;
		                me.token = data.token; 

		                console.log("ca marche",data);                     

		                var inbox = $("<h1>").addClass("inbox").html("Vos messages:");
                        $("#inbox").append(inbox);
                        
                         var contact = $("<h1>").addClass("contacts").html("Vos contacts :");
                        
                        $("#contacts").append(contact);


		                u.inbox();                        

		            },
		            error: function(err){
		                console.log("ca plante",err);
		            }

		        });

		        /////////////////////////////////////////////////////////////////////

		    // CAffichage du CHAT
		    $('#chat').live("submit", function(e) { //On écoute le bouton d'envoi du message du chat
		        e.preventDefault();

		        var message = encodeURIComponent($("#message",this).val());     
		            console.log(message);              
		        var tell = "/tell/";               
		        var dest = $("#dest",this).val(); //récupère la valeur du destinataire

		        //ENVOIE LE MESSAGE
				$.ajax({
		            url: "http://node.freelancis.net"+tell+me.user+"/"+me.token+"/"+dest+"/"+message,
		            type: $(this).attr('method'),
		            dataType: "jsonp", 
		                success: function(data){

		                    me.user = user;
		                    me.message = message; 
							
							

		                    console.log("message envoyé",data);
		
							var msg_envoye = $("<p>").addClass("msg_envoye").css({"background-color":"#B3FE97", "color":"#777", "width":"300px", "text-align":"right", "padding":"10px"}).html(decodeURIComponent(message));
                            
							$("#"+dest).append(msg_envoye);
							
							if ($("#"+dest).length == 0) {
                            

								var div = $("<div>").attr("id", dest);
								var a = $("<a>").attr("href", "#"+dest).html(dest);

								$(div).append(a).append("<br />");
								$("#inbox").append(div);
							
								var msg_envoye = $("<p>").addClass("msg_envoye").css({"background-color":"#B3FE97", "color":"#777", "width":"300px", "text-align":"right", "padding":"10px"}).html(decodeURIComponent(message));

								$("#"+dest).append(msg_envoye);
								console.log("n'existe pas");
								
								

							
							} else {
								console.log("existe");
							};
							
							
							

	                    },
		                error: function(err){
		                console.log("ca plante",err);
		                }

		            });        

		     });

		    };
         
	    });
	}

}

ping = function(){
	var ping="/ping";
	$.ajax({
		url: "http://node.freelancis.net"+ping,
		dataType: "jsonp",
		success: function(data){
			console.log("ca marche",data);
		},
		error: function(err){
			console.log("ca plante",err);
		}
	});
}


var u = {
	inbox : function(){
		
		$.ajax({
			url: "http://node.freelancis.net"+inbox+"/"+me.user+"/"+me.token,
			dataType: "jsonp",
			success: function(data){
				console.log("ca marche",data);
				
				u.parse(data);
				
				window.setTimeout(function(){
					u.inbox();
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
				u.parse(data);
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
			},
			error: function(err){
				console.log("ca plante",err);
			}
		});
	},
	parse : function(data){
		$(data.inbox).each(function(i){
			u.mesgAndContact(this);
			console.log(this);
			var date = this.dt;
			var from = this.from;
			var msg = decodeURIComponent(this.message);
			var info = from+" ( "+date+" ) : "+msg;
		});
	},
	mesgAndContact : function(line){
		var p = $("<p>").addClass("msg_recu").html(decodeURIComponent(line.message)).css({"background-color":"#fff", "color":"#777", "width":"300px", "text-align":"left", "padding":"10px"});
		
		if ($("#"+line.from).length == 0) {
			dest = line.from;
			var div = $("<div>").attr("id", line.from);
			var a = $("<a>").attr("href", "#"+line.from).html(line.from);
			
			$(div).append(a).append("<br />");
			$("#inbox").append(div);
			console.log("n'existe pas");
		} else {
			console.log("existe");
		}
		
		$("#"+line.from).append(p);
		
		$("#"+line.from+" p").hide();
		$("#"+line.from+" a").bind("click", function(e){
			$("#dest").val(line.from);
			$("#"+line.from+" p").show("slow");
			
		})
	
		

	},	
}


