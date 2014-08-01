sap.ui.jsview("testbutton.myview", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf testbutton.myview
	*/ 
	getControllerName : function() {
		return "testbutton.myview";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf testbutton.myview
	*/ 
	createContent : function(oController) {
		var button = sap.ui.commons.Button('btn1', {text: 'TEST'})
		return button;
	}

});
