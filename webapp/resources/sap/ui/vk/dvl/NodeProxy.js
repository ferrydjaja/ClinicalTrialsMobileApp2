/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","../library","../NodeProxy"],function(q,l,N){"use strict";var g=sap.ui.vk.dvl.getJSONObject;var a=N.extend("sap.ui.vk.dvl.NodeProxy",{metadata:{},constructor:function(n,b){N.call(this);this._dvl=n?n.getGraphicsCore()._getDvl():null;this._dvlSceneRef=n?n.getSceneRef():null;this._dvlNodeRef=b;}});a.prototype.destroy=function(){this._dvlNodeRef=null;this._dvlSceneRef=null;this._dvl=null;N.prototype.destroy.call(this);};a.prototype.getNodeRef=function(){return this._dvlNodeRef;};a.prototype.getNodeId=function(){return this._dvlNodeRef;};a.prototype.getVeIds=function(){return g(this._dvl.Scene.RetrieveVEIDs(this._dvlSceneRef,this._dvlNodeRef));};a.prototype.getName=function(){return g(this._dvl.Scene.RetrieveNodeInfo(this._dvlSceneRef,this._dvlNodeRef,sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_NAME)).NodeName;};a.prototype.getLocalMatrix=function(){return sap.ui.vk.TransformationMatrix.convertTo4x3(g(this._dvl.Scene.GetNodeLocalMatrix(this._dvlSceneRef,this._dvlNodeRef)).matrix);};a.prototype.setLocalMatrix=function(v){this._dvl.Scene.SetNodeLocalMatrix(this._dvlSceneRef,this._dvlNodeRef,v&&sap.ui.vk.TransformationMatrix.convertTo4x4(v));this.setProperty("localMatrix",v,true);return this;};a.prototype.getWorldMatrix=function(){return sap.ui.vk.TransformationMatrix.convertTo4x3(g(this._dvl.Scene.GetNodeWorldMatrix(this._dvlSceneRef,this._dvlNodeRef)).matrix);};a.prototype.setWorldMatrix=function(v){this._dvl.Scene.SetNodeWorldMatrix(this._dvlSceneRef,this._dvlNodeRef,v&&sap.ui.vk.TransformationMatrix.convertTo4x4(v));this.setProperty("worldMatrix",v,true);return this;};a.prototype.getOpacity=function(){return g(this._dvl.Scene.RetrieveNodeInfo(this._dvlSceneRef,this._dvlNodeRef,sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_OPACITY)).Opacity;};a.prototype.setOpacity=function(v){this._dvl.Scene.SetNodeOpacity(this._dvlSceneRef,this._dvlNodeRef,v);this.setProperty("opacity",v,true);return this;};a.prototype.getTintColorABGR=function(){return g(this._dvl.Scene.RetrieveNodeInfo(this._dvlSceneRef,this._dvlNodeRef,sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_HIGHLIGHT_COLOR)).HighlightColor;};a.prototype.setTintColorABGR=function(v){this._dvl.Scene.SetNodeHighlightColor(this._dvlSceneRef,this._dvlNodeRef,v);this.setProperty("tintColorABGR",v,true);this.setProperty("tintColor",sap.ui.vk.colorToCSSColor(sap.ui.vk.abgrToColor(v)),true);return this;};a.prototype.getTintColor=function(){return sap.ui.vk.colorToCSSColor(sap.ui.vk.abgrToColor(this.getTintColorABGR()));};a.prototype.setTintColor=function(v){var b=sap.ui.vk.colorToABGR(sap.ui.vk.cssColorToColor(v));this._dvl.Scene.SetNodeHighlightColor(this._dvlSceneRef,this._dvlNodeRef,b);this.setProperty("tintColorABGR",b,true);this.setProperty("tintColor",v,true);return this;};a.prototype.getNodeMetadata=function(){return g(this._dvl.Scene.RetrieveMetadata(this._dvlSceneRef,this._dvlNodeRef)).metadata;};a.prototype.getHasChildren=function(){return(g(this._dvl.Scene.RetrieveNodeInfo(this._dvlSceneRef,this._dvlNodeRef,sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_FLAGS)).Flags&(sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_MAPPED_HASCHILDREN|sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_CLOSED))===sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_MAPPED_HASCHILDREN;};a.prototype.getClosed=function(){return(g(this._dvl.Scene.RetrieveNodeInfo(this._dvlSceneRef,this._dvlNodeRef,sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_FLAGS)).Flags&sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_CLOSED)!==0;};return a;});