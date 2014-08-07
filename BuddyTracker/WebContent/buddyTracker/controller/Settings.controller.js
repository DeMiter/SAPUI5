sap.ui.controller("sap.ui.trident.buddyTracker.controller.Settings", {

	onPrivacyChange: function(evt){
		var frequency = this.getView().byId("frequency").getSelectedKey();
		var description = this.getView().byId("description");
		var oBundle = this.getView().getModel("i18n").getResourceBundle();
		
		if (frequency == "public") {
			description.setText( oBundle.getText("PrivacyPublicText") );
		} else if (frequency = "protected") {
			description.setText( oBundle.getText("PrivacyProtectedText") );
		} else if (frequency = "private") {
			description.setText( oBundle.getText("PrivacyPrivateText") );
		}
	},
	
	handleStart: function(evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("Main", context);
	}

});