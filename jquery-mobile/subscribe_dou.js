var me = {};

$(document).ready(function() {
    //On hide le chat    
    $('#chat_form').hide();

    //INSCRIPTION
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
                        
                        
                        $('#subscribe_form').hide("slow"); //cache le form d'inscription
                        $('.confirm').hide("slow"); //cache le message de confirmation
                        $('#trigger').hide("slow"); //cache la trigger pour aller directement au form de connexion
                        $('#connexion_form').show("slow"); //affiche le form de connexion
                },
                error: function(err){
                    console.log("ca plante",err);
                }
                
            });
        };
         
    });

    //TRIGGER
    $("#trigger").bind("click",function(e){

        $('#subscribe_form').hide("slow");
        $('.confirm').hide("slow");
        $('#connexion_form').show("slow");
        $('#trigger').remove(); //cache le trigger
            e.preventDefault()
        });


    //QUAND L'USER EST CONNECTE
    $('#user').bind("submit", function(e) { //On écoute le boutton SAVE quand l'user se connecte

        $('#connexion_form').hide("slow");//On cache le form de connexion

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
                    
                        me.user = user, 
                        me.pass = pass,
                        me.token = data.token 
                         
                        console.log("ca marche",data);                     
                            
                        var inbox = $("<h1>").addClass("inbox").html("Vos messages !");
                        $("#contact").append(inbox);
                            
                        ui.inbox();                        
                    
                    },
                    error: function(err){
                        console.log("ca plante",err);
                    }
                    
                });

            /////////////////////////////////////////////////////////////////////

        // Affichage du CHAT
            $('#chat').live("submit", function(e) { //On écoute le bouton d'envoi du message du chat
                e.preventDefault();

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
         
             });

        };
         
    });

});