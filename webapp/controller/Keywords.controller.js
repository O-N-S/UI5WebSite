sap.ui.define(['jquery.sap.global', 'ozan/ons/controller/BaseController', 'sap/ui/model/json/JSONModel', 'sap/ui/model/Filter'], function(
	jQuery, BaseController, JSONModel, Filter) {
	"use strict";
	return BaseController.extend("ozan.ons.controller.Keywords", {
		onInit: function(oEvent) {

			var oShell = sap.ui.getCore().byId("onsShell");
			oShell.setBackgroundImage("/images/bg.jpg");

			var lang = sap.ui.getCore().getConfiguration().getLanguage();

			var oModel = new JSONModel(jQuery.sap.getModulePath("ozan.ons.model", "/session.json?lang=" + lang));
			sap.ui.getCore().setModel(oModel, "Session");
			this.getView().setModel(oModel, "Session");

			var oModel = new JSONModel(jQuery.sap.getModulePath("ozan.ons.model", "/keywords.json"));
			this.getView().setModel(oModel, "Keywords");
		},
		onSearch: function(oEvent) {
			var sQuery = oEvent.getSource().getValue();
			var filters;
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
				filters = new sap.ui.model.Filter([filter]);
			}

			var list = this.getView().byId("KeywordsList");
			var binding = list.getBinding("items");
			binding.filter(filters, "Application");
		}
	});
});