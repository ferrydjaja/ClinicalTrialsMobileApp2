sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("ClinicalTrials.ClinicalTrials.controller.Feedback", {
		handleRouteMatched: function(oEvent) {
			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;
				var oPath;
				if (this.sContext) {
					oPath = {
						path: "/" + this.sContext,
						parameters: oParams
					};
					this.getView().bindObject(oPath);
				}
			}
		},

        onInit: function() {

            /*this below code for get the JSON Model form Manifest.json file*/
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            var oModelCondition = this.getOwnerComponent().getModel("ConditionModel");
            this.getView().byId("selectConditionAS").setModel(oModelCondition);
            this.getView().byId("selectConditionAS").bindAggregation("suggestionItems", {
                path: "/",
                template: new sap.ui.core.Item({
                    text: "{desc}",
                    key: '{code}'
                })
            });


            var oModelCountry = this.getOwnerComponent().getModel("CountryModel");
            this.getView().byId("selectCountryAS").setModel(oModelCountry);

            var oModelState = this.getOwnerComponent().getModel("StateModel");
            this.getView().byId("selectStateAS").setModel(oModelState);
            this.getView().byId("selectStateAS").bindAggregation("suggestionItems", {
                path: "/",
                template: new sap.ui.core.Item({
                    text: "{state}",
                    key: '{code}'
                })
            });

            var oModelDistance = this.getOwnerComponent().getModel("DistanceModel");
            this.getView().byId("selectDistanceAS").setModel(oModelDistance);

            var oModelDistance = this.getOwnerComponent().getModel("TrialStatusModel");
            this.getView().byId("selectTrialStatusAS").setModel(oModelDistance);

        },

        onSelectConditionChange: function(oEvent) {},

        onSelectCountryChange: function(oEvent) {
            console.log(oEvent.getParameters().selectedItem.getKey());


            if (oEvent.getParameters().selectedItem.getKey() != 'US') {
                this.getView().byId("selectStateAS").setValue("");
                this.getView().byId("selectStateAS").setEnabled(false);
            } else {
                this.getView().byId("selectStateAS").setValue("");
                this.getView().byId("selectStateAS").setEnabled(true);
            }
        },

        onSelectStateChange: function(oEvent) {
            console.log(oEvent.getParameters().selectedItem.getKey());
        },

        onSelectDistanceChange: function(oEvent) {},

        onSelectTrialStatusChange: function(oEvent) {},

        _onRadioButtonGroupSelect: function() {

        },

		onNavButtonTo: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("list", true);
		},

		
        onButtonPress: function(oEvent) {

            var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({
                text: "{i18n>MSG0}",
                title: "{i18n>MSG1}"
            });

            function wasteTime() {
                busyDialog.open();
            }

            function runNext() {
                busyDialog.close();
            }

            var cond = this.getView().byId("selectConditionAS").getValue().trim();
            var cntry = this.getView().byId("selectCountryAS").getSelectedKey().trim();
            var state = this.getView().byId("selectStateAS").getSelectedKey().trim();
            var city = this.getView().byId("selectCityAS").getValue().trim();
            var gndr = this.getView().byId("selectGenderAS").getSelectedIndex();
            var gndrAr = ['All', 'Male', 'Female'];
            gndr = gndrAr[gndr];
            var recrs = this.getView().byId("selectTrialStatusAS").getSelectedKey().trim();
            var age = this.getView().byId("selectAgeAS").getSelectedIndex();
            var ageAr = ['', '0', '1', '2'];
            age = ageAr[age];

            var dist = this.getView().byId("selectDistanceAS").getSelectedKey().trim();

            if (cond.length > 0) {
                console.log(cond + ':' + cntry + ':' + state + ':' + city + ':' + gndr + ':' + recrs + ':' + ':' + age + ':' + dist);

                wasteTime();

				var this_ = this;

                $.ajax({
                    type: 'GET',
                    async: true,
                    cache: true,
                    url: "/nodejs?q=1&cond=" + cond + "&cntry=" + cntry + "&state=" + state + "&city=" + city + "&recrs=" + recrs + "&gndr=" + gndr + "&age=" + age + "&dist=" + dist,
                    success: function(data) {
                        console.log(data);

                        if (data != '{}') {
                            console.log(data.results.length);

                            if (data.results.length > 0) {
                                runNext();

                                var oModel = new sap.ui.model.json.JSONModel();
								oModel.setData(null);
								oModel.setSizeLimit(999999);

								oModel.setData({
                                    modelData: [data]
                                });
								sap.ui.getCore().setModel(oModel);
								this_.onNavButtonTo();

                            } else {
                                runNext();
                                jQuery.sap.require("sap.m.MessageBox");
                                sap.m.MessageBox.show(jQuery.sap.resources({
                                    url: "i18n/i18n.properties"
                                }).getText("NO_INFO"), {
                                    icon: sap.m.MessageBox.Icon.INFORMATION,
                                    title: "{i18n>WELCOME_TITLE}",
                                    actions: sap.m.MessageBox.Action.OK,
                                    onClose: null,
                                    //styleClass: ""                        
                                });
                            }
                        } else {
                            // No record {}
                            runNext();
                            jQuery.sap.require("sap.m.MessageBox");
                            sap.m.MessageBox.show(jQuery.sap.resources({
                                url: "i18n/i18n.properties"
                            }).getText("NO_INFO"), {
                                icon: sap.m.MessageBox.Icon.INFORMATION,
                                title: "{i18n>WELCOME_TITLE}",
                                actions: sap.m.MessageBox.Action.OK,
                                onClose: null,
                                //styleClass: ""                        
                            });
                        }

                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        runNext();
                        jQuery.sap.require("sap.m.MessageBox");
                        sap.m.MessageBox.show(jQuery.sap.resources({
                                url: "i18n/i18n.properties"
                            }).getText("ERROR_INFO"), {
                                icon: sap.m.MessageBox.Icon.INFORMATION,
                                title: "{i18n>WELCOME_TITLE}",
                                actions: sap.m.MessageBox.Action.OK,
                                onClose: null,
                                //styleClass: ""                        
                            });
                    }
                });

            } else {
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show(jQuery.sap.resources({
                    url: "i18n/i18n.properties"
                }).getText("VALID_KEYWORD"), {
                    icon: sap.m.MessageBox.Icon.INFORMATION,
                    title: "{i18n>WELCOME_TITLE}",
                    actions: sap.m.MessageBox.Action.OK,
                    onClose: null,
                    //styleClass: ""                        
                });
            }

        },

    });
});