sap.ui.controller("sap.ui.trident.buddyTracker.controller.Main", {
	
	handleAddContact: function(evt){
		var context = evt.getSource().getBindingContext();
		this.nav.to("Search", context);
	},
	
	handleDelete: function(evt){
		var oList = evt.getSource().getParent();
	    oList.removeAggregation("items", oList.getSwipedItem());
	    oList.swipeOut();
	},

});