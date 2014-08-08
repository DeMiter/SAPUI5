sap.ui.controller("sap.ui.trident.buddyTracker.controller.Settings", {

	onPrivacyChange: function(evt){
		var privacy = this.getView().byId("privacy").getSelectedKey();
		var oBundle = this.getView().getModel("i18n").getResourceBundle();
		var text;
		
		if (privacy == "public") {
			text = oBundle.getText("PrivacyPublicText");
		} else if (privacy == "protected") {
			text = oBundle.getText("PrivacyProtectedText");
		} else if (privacy == "private") {
			text = oBundle.getText("PrivacyPrivateText");
		}
		
		this.getView().byId("description").prop("text", text);
	},
	
	handleStart: function(evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("Main", context);
	}

});