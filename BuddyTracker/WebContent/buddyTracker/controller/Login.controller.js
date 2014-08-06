sap.ui.controller("sap.ui.trident.buddyTracker.view.Login", {

	handleSignIn: function(evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("Settings", context);
	},
	
	handleSignUp: function(evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("Register", context);
	},
	
});