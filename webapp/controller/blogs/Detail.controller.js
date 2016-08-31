sap.ui.define(['jquery.sap.global','ozan/ons/controller/Detail','sap/ui/model/json/JSONModel','sap/ui/model/Filter'], function (jQuery,Detail,JSONModel,Filter) { "use strict"; return Detail.extend("ozan.ons.controller.blogs.Detail", {
			onInit: function(oEvent) {
				
	var oShell = sap.ui.getCore().byId("onsShell");
	oShell.setBackgroundImage("/images/bg.jpg"); 

	var lang = sap.ui.getCore().getConfiguration().getLanguage();

	var oModel = new JSONModel(jQuery.sap.getModulePath("ozan.ons.model", "/session.json?lang="+lang));
	sap.ui.getCore().setModel(oModel, "Session");
	this.getView().setModel(oModel, "Session");

				
			var addBtn = this.getView().byId("addBtn");
			addBtn.setVisible(false);

			var editBtn = this.getView().byId("editBtn");
			editBtn.setVisible(false);

			var tabBar = this.getView().byId("tabBar");
			tabBar.setVisible(false);

			var shareBtn = this.getView().byId("shareBtn");
			shareBtn.setVisible(false);

			var downloadBtn = this.getView().byId("downloadBtn");
			downloadBtn.setVisible(false);

			var printBtn = this.getView().byId("printBtn");
			printBtn.setVisible(false);

			var copyBtn = this.getView().byId("copyBtn");
			copyBtn.setVisible(false);

			var deleteBtn = this.getView().byId("deleteBtn");
			deleteBtn.setVisible(false);
		

				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("blogDetail").attachPatternMatched(this._onObjectMatched, this);
			},
			_onObjectMatched: function (oEvent) {
				var id = oEvent.getParameter("arguments").id;
				var myModel = new JSONModel(jQuery.sap.getModulePath("ozan.ons.model", "/blogs.json?id="+id));
	myModel.attachRequestCompleted(function(data) {
			var pages = data.oSource.oData.Pages;
			this._data = pages[0];

			var date = "Created " + this._data.CREATED + " / Changed "+ pages[0].CHANGED;
			var dateFld = this.getView().byId("DateField");
			dateFld.setHtmlText(date.replace(/&lt;/g, "<").replace(/&gt;/g, ">"));	
			
			var title = this._data.TITLE;
			var titleFld = this.getView().byId("TitleField");
			titleFld.setHtmlText(title.replace(/&lt;/g, "<").replace(/&gt;/g, ">"));	
			
			var description = this._data.DESCRIPTION;
			var descriptionFld = this.getView().byId("DescriptionField");
			descriptionFld.setHtmlText(description.replace(/&lt;/g, "<").replace(/&gt;/g, ">"));	
			
			var content = this._data.CONTENT;
			var contentFld = this.getView().byId("ContentField");
			contentFld.setHtmlText(content.replace(/&lt;\/\s/g, "<").replace(/&lt;/g, "<").replace(/&gt;/g, ">"));	
		}, this);
			},
			onToggle: function (oEvent) {
	var panel = this.getView().byId("ContentPanel");
	var mode = !panel.getExpanded();
	
	panel.setExpanded(mode);
	var btn = this.getView().byId("ExColButton");
	if (mode) {
		btn.setIcon("sap-icon://collapse-group");
	}
	else {
		btn.setIcon("sap-icon://expand-group");
	}},
			onPrint : function (oEvent) {
	var title = '<center><h1><div class="TitleStyle">'+this._data.TITLE_DE+'</div></h1></center>';
	var link = '<center><div style="font-size: 80%;">Link zur Webseite: <a href="http://www.ozan-sueel.de:8080/blog/'+this._data.ID+'">O/N/S</a></div></center>';
	var created = '<div style="font-size: 80%;">Erstellungsdatum: '+this._data.CREATED+'</div>';		
	var changed = '<div style="font-size: 80%;">Letzte Änderung: am '+this._data.CHANGED+'</div>';		
	var author = '<div style="font-size: 80%;">Author: '+this._data.AUTHOR+'</div>';		
	var keywords = '<div style="font-size: 80%;">Letzte Änderung am '+this._data.KEYWORDS+'</div>';		
	var description = '<div style="padding-top: 20px; padding-bottom: 20px; font-style: italic;">'+this._data.DESCRIPTION_DE+'</div>';
	var content = '<div style="padding: 20px; border: 1px solid gray;">'+this._data.CONTENT_DE+'</div>';

	var windowSize = "width=500px, height=600px";
	var w = window.open("", "PrintWindow", windowSize);
	w.document.write(title+link+created+changed+keywords+author+description+content);
	w.print();
	w.close();
},
			onShare: function(oEvent) {
				if (! this._oDialog) {
					this._oDialog = sap.ui.xmlfragment("ozan.ons.fragment.ShareDialog", this);
				}
				this._oDialog.open();
			},
			onCloseShareDialog: function(oEvent) {
				var aContexts = oEvent.getParameter("selectedContexts");
				oEvent.getSource().getBinding("items").filter([]);
			},
			onShareFacebook: function(oEvent) {
				this._oDialog.close();
			},
			onShareTwitter: function(oEvent) {
				this._oDialog.close();
				// <a href="http://www.twitter.com/share?url=http://www.google.com/>Tweet</a>
			},
			onExit : function () {
				if (this._oDialog) {
					this._oDialog.destroy();
				}
			}
			
	   	}); });