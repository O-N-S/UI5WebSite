sap.ui.define(['ozan/ons/controller/BaseController'], function(BaseController) {
	"use strict";
	return BaseController.extend("ozan.ons.controller.App", {

		onInit: function(oEvent) {
			jQuery.sap.log.setLevel(jQuery.sap.log.Level.INFO);

			var oRouter = this.getRouter();

			oRouter.attachBypassed(function(oEvent) {
				var sHash = oEvent.getParameter("hash");
				jQuery.sap.log.info("Sorry, but the hash '" + sHash + "' is invalid.", "The resource was not found.");
			});

			oRouter.attachRouteMatched(function(oEvent) {
				var sRouteName = oEvent.getParameter("name");
				jQuery.sap.log.info("User accessed route " + sRouteName + ", timestamp = " + new Date().getTime());
			});

		}
	});
});