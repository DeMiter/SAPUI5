sap.ui.jsview("sap.ui.trident.buddyTracker.view.App", {

	getControllerName: function () {
		return "sap.ui.trident.buddyTracker.controller.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		//this.setDisplayBlock(true);
		
		// create app
		this.app = new sap.m.App();
		
		// load the login page
		var login = sap.ui.xmlview("Login", "sap.ui.trident.buddyTracker.view.Login");
		login.getController().nav = this.getController();
		this.app.addPage(login, true);
		
		// load the registration page
		var register = sap.ui.xmlview("Register", "sap.ui.trident.buddyTracker.view.Register");
		register.getController().nav = this.getController();
		this.app.addPage(register, false);
		
		// load the settings page
		var settings = sap.ui.xmlview("Settings", "sap.ui.trident.buddyTracker.view.Settings");
		settings.getController().nav = this.getController();
		this.app.addPage(settings, false);
		
		// done
		return this.app;
	}
});