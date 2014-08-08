jQuery.sap.declare("sap.ui.trident.Component");

sap.ui.core.UIComponent.extend("sap.ui.trident.Component", {

	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.trident.buddyTracker.view.App",
			type : "JS",
			viewData : { component : this }
		});
		
		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");

		// Using a local model for offline development
		var oModel = new sap.ui.model.json.JSONModel("buddyTracker/model/mock.json");
		oView.setModel(oModel);
		
		// done
		return oView;
	}
});