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
	
	handleSelectItem: function(evt){
		var context = evt.getSource().getBindingContext();
		var item = context.getObject();

		if (item.Group == "false"){
			this.nav.to("Map", context);
		} else {
			this.nav.to("Group", context);
		}
	},
	
	onSearch : function (oEvt) {
	    
	    // add filter for search
	    var aFilters = [];
	    var sQuery = oEvt.getSource().getValue();
	    if (sQuery && sQuery.length > 0) {
	      var filter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
	      aFilters.push(filter);
	    }

	    // update list binding
	    var list = this.getView().byId("idList");
	    var binding = list.getBinding("items");
	    binding.filter(aFilters, "Application");
    },

});