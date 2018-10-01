/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var A={};A.render=function(r,a){if(!a.initializationDone){a.initControls();a.initializationDone=true;}var b=a.getId();r.write("<header");r.writeControlData(a);r.addClass("sapUiAppHdr");r.writeClasses();r.write(">");r.write("<div id=\""+b+"-appHeaderWelcomeLogoffAreas\" class=\"sapUiAppHdrWelcomeLogoffArea sapUiInverted-CTX\">");this.renderWelcomeAndLogoffAreas(r,a);r.write("</div>");r.write("<div id=\""+b+"-logoArea\" class=\"sapUiAppHdrLogo\">");this.renderLogoArea(r,a);r.write("</div>");r.write("</header>");};A.renderLogoArea=function(r,a){var s=a.getLogoSrc();if(!s){q.sap.require("sap.ui.core.theming.Parameters");s=sap.ui.core.theming.Parameters._getThemeImage();}if(!s){s=sap.ui.resource("sap.ui.commons","themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/img/applicationheader/SAPLogo.png");}a.oLogo.setSrc(s);r.renderControl(a.oLogo);if(a.getLogoText()!=""){a.oLogoText.setText(a.getLogoText());a.oLogoText.setTooltip(a.getLogoText());r.renderControl(a.oLogoText);}};A.renderWelcomeAndLogoffAreas=function(r,a){var b=a.getId();if(a.getDisplayWelcome()){var c=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");var p=sap.ui.getCore().getConfiguration().getRTL()?"padding-left":"padding-right";if(a.getUserName()!=""){r.write("<label class=\"sapUiLbl sapUiLblEmph\" style=\"text-align: left;\" id=\""+b+"-welcomeLabel\">"+c.getText("APPHDR_WELCOME_USER")+":</label>");r.write("&nbsp;");r.write("<label class=\"sapUiLbl\" style=\"text-align: left;",p,":15px;\" id=\"",b,"-userLabel\">");r.writeEscaped(a.getUserName());r.write("</label>");}else{r.write("<label class=\"sapUiLbl sapUiLblEmph\" style=\"text-align: left;"+p+":15px;\" id=\""+b+"-welcomeLabel\">"+c.getText("APPHDR_WELCOME")+"</label>");}}if(a.getDisplayLogoff()){if(a.getDisplayWelcome()){r.write("<span role=\"separator\" class=\"sapUiTbSeparator\"></span>");}r.renderControl(a.oLogoffBtn);}};return A;},true);
