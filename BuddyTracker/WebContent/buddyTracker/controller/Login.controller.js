sap.ui.controller("sap.ui.trident.buddyTracker.controller.Login", {

	handleSignIn: function(evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("Main", context);
	},
	
	handleSignUp: function(evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("Register", context);
	},
	
});