
$(document).ready(function() {
var messages=$("a#message");
var contacts=$("a#contact");
var connexion=$("a#connexion");
var inscription=$("a#inscription");
var contactsingle=$("#contacts a");
		
		
		$("#subscribe_form a").bind("click",function(e){
		e.preventDefault();
		$('#connexion_form').show("slow");
		$('#subscribe_form').hide("slow");
		$('.confirm').hide("slow");
	});
		
	$(inscription).bind("click",function(e){
		e.preventDefault();
		
		$("#subscribe_form").show("slow");
		$('#connexion_form').hide("slow");
		$("#contacts").hide("slow");
		$("#inbox").hide("slow");
	});
	
	$(connexion).bind("click",function(e){
		e.preventDefault();
		
		$('#connexion_form').show("slow");
		$("#subscribe_form").hide("slow");
		$("#contacts").hide("slow");
		$("#inbox").hide("slow");
	});
	
	$(messages).bind("click",function(e){
		e.preventDefault();
		$('#connexion_form').hide("slow");
		$("#subscribe_form").hide("slow");
		$("#contacts").hide("slow");
		$("#inbox").show("slow");
	});
	
	$(contacts).bind("click",function(e){
		e.preventDefault();
		$('#connexion_form').hide("slow");
		$("#subscribe_form").hide("slow");
		$("#inbox").hide("slow");
		$("#contacts").show("slow");
	});
	
	$(contactsingle).bind("click",function(e){
		e.preventDefault();
		console.log(contactsingle);
		$("#contacts p").hide();
		$("#chat").show("slow");
		
	});
	




});