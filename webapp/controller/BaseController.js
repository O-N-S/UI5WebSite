sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/ui/core/routing/History', 'sap/m/Popover', 'sap/m/Button',
	'sap/ui/unified/MenuItem', 'sap/ui/unified/Menu'
], function(jQuery, Controller, History, Popover, Button, MenuItem, Menu) {
	"use strict";
	return Controller.extend("ozan.ons.controller.BaseController", {
		onInit: function(oEvent) {},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		_onRouteMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();

			oView.bindElement({
				path: "/orders(" + oArgs.order + ")",
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function(oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function(oEvent) {
						oView.setBusy(false);
					}
				}
			});
		},
		_onBindingChange: function(oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		onNavBack: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("start", {}, true /*no history*/ );
			}
		},

		onChangeLanguage2EN: function(event) {
			sap.ui.getCore().getConfiguration().setLanguage("en-US");
		},
		goChangeLanguage2DE: function(event) {
			sap.ui.getCore().getConfiguration().setLanguage("de-DE");
		},
		goHome: function(oEvent) {
			this.getRouter().navTo("home");
		},
		goNews: function(oEvent) {
			this.getRouter().navTo("newsList");
		},
		goInfos: function(oEvent) {
			this.getRouter().navTo("infosList");
		},
		goBlogs: function(oEvent) {
			this.getRouter().navTo("blogsList");
		},
		goGlossary: function(oEvent) {
			this.getRouter().navTo("glossaryList");
		},
		goContact: function(oEvent) {
			this.getRouter().navTo("contact");
		},
		goDisclaimer: function(oEvent) {
			this.getRouter().navTo("disclaimer");
		},
		goImpressum: function(oEvent) {
			this.getRouter().navTo("impressum");
		},
		goLogin: function(oEvent) {
			this.getRouter().navTo("login");
		},
		goAbout: function(oEvent) {
			this.getRouter().navTo("about");
		},
		goUsage: function(oEvent) {
			this.getRouter().navTo("usage");
		},
		goLogout: function(oEvent) {
			this.getRouter().navTo("logout");
		},
		goKeywords: function(oEvent) {
			this.getRouter().navTo("keywords");
		}
	});
});