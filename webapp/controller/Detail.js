sap.ui.define(['jquery.sap.global', 'ozan/ons/controller/BaseController', 'sap/ui/model/json/JSONModel', 'sap/ui/model/Filter'], function(
	jQuery, BaseController, JSONModel, Filter) {
	"use strict";
	return BaseController.extend("ozan.ons.controller.Detail", {
		onInit: function(oEvent) {

			var oShell = sap.ui.getCore().byId("onsShell");
			oShell.setBackgroundImage("/images/bg.jpg");

			var lang = sap.ui.getCore().getConfiguration().getLanguage();

			var oModel = new JSONModel(jQuery.sap.getModulePath("ozan.ons.model", "/session.json?lang=" + lang));
			sap.ui.getCore().setModel(oModel, "Session");
			this.getView().setModel(oModel, "Session");

		}
	});
});