sap.ui.controller("sap.ui.trident.buddyTracker.controller.Register", {

	handleSignUp: function(evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("Settings", context);
	},
	
	handleCancel: function(evt){
		this.nav.back("Login");
	}

});