VBI.addSceneRectangularTrackingFunctions=
function(s){"use strict";s.RectangularTracking=function(){this.m_PosStart=null;this.m_PosMove=null;this.m_bTrack=false;this.m_keycode=0;};s.RectangularTracking.prototype.onsapkeydown=function(e){if(e.keyCode==this.m_keycode){this.ExitMode();e.preventDefault();return true;}};s.RectangularTracking.prototype.onsapdown=function(e){var r=s.m_Canvas[s.m_nOverlayIndex].getBoundingClientRect();this.m_PosStart=s.GetPosFromPoint([e.clientX-r.left,e.clientY-r.top,0]);this.m_bTrack=true;if(e.type=="mousedown"){document.addEventListener('mouseup',this,true);}else if(e.type=="touchstart"){document.addEventListener('touchend',this,true);}else if(e.type=="pointerdown"){document.addEventListener('pointerup',this,true);}e.preventDefault();s.m_Canvas[s.m_nLabelIndex].focus();return true;};s.RectangularTracking.prototype.handleEvent=function(e){if(e.type=="mouseup"){document.removeEventListener('mouseup',this,true);}else if(e.type=="touchend"){document.removeEventListener('touchend',this,true);}else if(e.type=="pointerup"){document.removeEventListener('pointerup',this,true);if(s.m_Gesture){s.m_Gesture.pointerCount--;if(!s.m_Gesture.pointerCount){s.m_Gesture.target=null;s.m_Gesture=null;}}}this.TrackEnd(e);};s.RectangularTracking.prototype.TrackEnd=function(e){if(!this.m_bTrack){return false;}if(this.m_PosStart&&this.m_PosMove){this.execute(e);}this.m_PosStart=null;this.m_PosMove=null;this.m_bTrack=false;s.RenderAsync(true);e.preventDefault();e.stopPropagation();return true;};s.RectangularTracking.prototype.onsapmove=function(e){if(this.m_bTrack){var r=s.m_Canvas[s.m_nOverlayIndex].getBoundingClientRect();this.m_PosMove=s.GetPosFromPoint([e.clientX-r.left,e.clientY-r.top,0]);}s.SetCursor('crosshair');s.RenderAsync(true);e.preventDefault();return true;};s.RectangularTracking.prototype.onsapout=function(e){};s.RectangularTracking.prototype.execute=function(e){};s.RectangularTracking.prototype.Hook=function(i){s.SetInputMode(i);if(i==VBI.InputModeRectSelect){s.m_Ctx.m_Control.setProperty("rectangularSelection",true);}else{s.m_Ctx.m_Control.setProperty("rectZoom",true);}s.m_DesignVO=this;s.SetCursor('crosshair');s.RenderAsync(true);};s.RectangularTracking.prototype.UnHook=function(){if(s.m_nInputMode==VBI.InputModeRectSelect||s.m_nInputMode==VBI.InputModeRectZoom){s.m_Ctx.onChangeTrackingMode(s.m_nInputMode,false);if(s.m_nInputMode==VBI.InputModeRectSelect){s.m_Ctx.m_Control.setProperty("rectangularSelection",false);}else{s.m_Ctx.m_Control.setProperty("rectZoom",false);}s.SetInputMode(VBI.InputModeDefault);}else{jQuery.sap.log.error("Wrong InputMode in UnHook: "+s.m_nInputMode);}this.m_PosStart=null;this.m_PosMove=null;this.m_bTrack=false;s.m_DesignVO=null;s.RenderAsync(true);};s.RectangularTracking.prototype.ExitMode=function(){this.UnHook();s.SetCursor('default');s.RenderAsync(true);};s.RectangularZoom=function(){s.RectangularTracking.call(this);this.m_keycode=90;this.Hook(VBI.InputModeRectZoom);};s.RectangularZoom.prototype=Object.create(s.RectangularTracking.prototype);s.RectangularZoom.prototype.constructor=s.RectangularZoom;s.RectangularZoom.prototype.execute=function(e){var l=[];var a=[];l[0]=this.m_PosStart[0];l[1]=this.m_PosMove[0];a[0]=this.m_PosStart[1];a[1]=this.m_PosMove[1];s.ZoomToMultiplePositions(l,a,1.0);};s.RectangularZoom.prototype.Render=function(c,d){if(!this.m_bTrack){return false;}if(this.m_PosMove&&this.m_PosStart){var p=s.GetPointFromPos(this.m_PosStart,false);var a=s.GetPointFromPos(this.m_PosMove,false);var b=a.slice(0);var C=a[0]-p[0];var e=a[1]-p[1];var r=s.GetInternalDivClientRect();var f=Math.abs(r.width/r.height);var g=Math.abs(C/e);var h=0;var w=0;if(g<f){w=a[0]-p[0];h=w/f;if(a[0]<p[0]&&a[1]>p[1]||a[0]>p[0]&&a[1]<p[1]){b[1]=p[1]-h;}else{b[1]=p[1]+h;}}else{h=a[1]-p[1];w=f*h;if(a[0]<p[0]&&a[1]>p[1]||a[0]>p[0]&&a[1]<p[1]){b[0]=p[0]-w;}else{b[0]=p[0]+w;}}VBI.Utilities.DrawTrackingRect(d,p[0],p[1],b[0],b[1]);var z=s.GetStretchFactor4Mode();b[0]*=z[0];b[1]*=z[1];this.m_PosMove=s.GetPosFromPoint([b[0],b[1]]);}};s.RectSelection=function(){s.RectangularTracking.call(this);this.m_keycode=82;this.Hook(VBI.InputModeRectSelect);};s.RectSelection.prototype=Object.create(s.RectangularTracking.prototype);s.RectSelection.prototype.constructor=s.RectSelection;s.RectSelection.prototype.execute=function(e){var p=s.GetPointFromPos(this.m_PosStart,false);var a=s.GetPointFromPos(this.m_PosMove,false);var b=[];var c=[];var n;for(n=0;n<=1;n++){if(p[n]<a[n]){b[n]=p[n];c[n]=a[n];}else{b[n]=a[n];c[n]=p[n];}}var z=s.GetStretchFactor4Mode();b[0]/=z[0];c[0]/=z[0];b[1]/=z[1];c[1]/=z[1];this.selectionRect=[b[0],b[1],c[0],c[1]];s.PerFormMultiSelect(e,this);};s.RectSelection.prototype.Render=function(c,d){if(!this.m_bTrack){return false;}if(this.m_PosMove&&this.m_PosStart){var p=s.GetPointFromPos(this.m_PosStart,false);var a=s.GetPointFromPos(this.m_PosMove,false);VBI.Utilities.DrawTrackingRect(d,p[0],p[1],a[0],a[1]);}};}
;
