sap.ui.define(['jquery.sap.global', 'ozan/ons/controller/BaseController', 'sap/ui/model/json/JSONModel', 'sap/ui/model/Filter'], function(
	jQuery, BaseController, JSONModel, Filter) {
	"use strict";
	return BaseController.extend("ozan.ons.controller.news.List", {
		onInit: function(oEvent) {

			var oShell = sap.ui.getCore().byId("onsShell");
			oShell.setBackgroundImage("/images/bg.jpg");

			var lang = sap.ui.getCore().getConfiguration().getLanguage();

			var oModel = new JSONModel(jQuery.sap.getModulePath("ozan.ons.model", "/session.json?lang=" + lang));
			sap.ui.getCore().setModel(oModel, "Session");
			this.getView().setModel(oModel, "Session");

			var addBtn = this.getView().byId("addBtn");
			addBtn.setVisible(false);

			var printBtn = this.getView().byId("printBtn");
			printBtn.setVisible(false);

			var downloadBtn = this.getView().byId("downloadBtn");
			downloadBtn.setVisible(false);

			var feedBtn = this.getView().byId("feedBtn");
			feedBtn.setVisible(false);

			var oNewsModel = new JSONModel(jQuery.sap.getModulePath("ozan.ons.model", "/news.json?lang=" + lang));
			this.getView().setModel(oNewsModel, "News");
		},
		onInfoNotFound: function(oEvent) {
			this.getRouter().getTargets().display("newsNotFound", {
				fromTarget: "news"
			});
		},
		onSearch: function(oEvent) {
			var sQuery = oEvent.getSource().getValue();
			var filters;
			if (sQuery && sQuery.length > 0) {
				var filter1 = new Filter("TITLE", sap.ui.model.FilterOperator.Contains, sQuery);
				var filter2 = new Filter("DESCRIPTION", sap.ui.model.FilterOperator.Contains, sQuery);
				var filter3 = new Filter("CONTENT", sap.ui.model.FilterOperator.Contains, sQuery);
				filters = new sap.ui.model.Filter([filter1, filter2, filter3]);
			}

			var list = this.getView().byId("NewsList");
			var binding = list.getBinding("items");
			binding.filter(filters, "Application");
		},
		onSelect: function(oEvent) {
			var source = oEvent.getSource();

			var id = source.data("id");
			this.getRouter().navTo("newsDetail", {
				id: "" + id
			});
		},
		onRefresh: function(oEvent) {
			var oModel = new JSONModel(jQuery.sap.getModulePath("ozan.ons.model", "/news.json"));
			this.getView().setModel(oModel, "News");
		},
		onPrint: function(oEvent) {
			var title = '<center><h1><div class="TitleStyle"></div></h1></center>';
			var date = '<div class="DateStyle">Date</div>';
			var description = '<div class="DescriptionStyle">Description</div>';

			var windowSize = "width=500px, height=600px";
			var w = window.open("", "PrintWindow", windowSize);
			w.document.write(title + date + description);
			w.print();
			w.close();
		},
		onDownload: function(oEvent) {},
		onExport: function(oEvent) {},
		onAdd: function(oEvent) {
			this.getRouter().navTo("addNews");
		}

	});
});