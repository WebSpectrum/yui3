YUI.add("model",function(g){var c=YUI.namespace("Env.Model"),f=g.JSON||f,d=g.Lang,h=g.Object,a="change",b="error";function e(){e.superclass.constructor.apply(this,arguments);}g.Model=g.extend(e,g.Base,{idAttribute:"id",initializer:function(i){this.changed={};this.lastChange={};},"delete":function(j,k){var i=this;if(typeof j==="function"){k=j;j={};}this.sync("delete",j,function(l){if(!l&&i.list){i.list.remove(i);}k&&k.apply(null,arguments);});return this;},generateClientId:function(){c.lastId||(c.lastId=0);return"c"+(c.lastId+=1);},getAsHTML:function(i){var j=this.get(i);return g.Escape.html(d.isValue(j)?String(j):"");},getAsURL:function(i){var j=this.get(i);return encodeURIComponent(d.isValue(j)?String(j):"");},isModified:function(){return this.isNew()||!h.isEmpty(this.changed);},isNew:function(){return !d.isValue(this.get("id"));},load:function(j,k){var i=this;if(typeof j==="function"){k=j;j={};}this.sync("read",j,function(m,l){if(!m){i.setAttrs(i.parse(l),j);i.changed={};}k&&k.apply(null,arguments);});return this;},parse:function(i){if(typeof i==="string"){if(f){try{return f.parse(i);}catch(j){this.fire(b,{type:"parse",error:j});return null;}}else{this.fire(b,{type:"parse",error:"Unable to parse response."});g.error("Can't parse JSON response because the json-parse "+"module isn't loaded.");return null;}}return i;},save:function(j,k){var i=this;if(typeof j==="function"){k=j;j={};}this.sync(this.isNew()?"create":"update",j,function(m,l){if(!m&&l){i.setAttrs(i.parse(l),j);i.changed={};}k&&k.apply(null,arguments);});return this;},set:function(k,l,j){var i={};i[k]=l;return this.setAttrs(i);},setAttrs:function(i,j){var p=this.changed,m=this.idAttribute,n,k,l,o;if(!this._validate(i)){return this;}j||(j={});o=j._transaction={};if(m!=="id"){if(h.owns(i,m)){i.id=i[m];}else{if(h.owns(i,"id")){i[m]=i.id;}}}for(k in i){if(h.owns(i,k)){this._setAttr(k,i[k],j);}}if(!j.silent&&!g.Object.isEmpty(o)){l=this.lastChange={};for(k in o){if(h.owns(o,k)){n=o[k];p[k]=n.newVal;l[k]={newVal:n.newVal,prevVal:n.prevVal,src:n.src||null};}}if(!this._changeEvent){this._changeEvent=this.publish(a,{preventable:false});}this.fire(a,{changed:l});}return this;},sync:function(){var i=g.Array(arguments,0,true).pop();if(typeof i==="function"){i();}},toJSON:function(){var i=this.getAttrs();delete i.initialized;delete i.destroyed;if(this.idAttribute!=="id"){delete i.id;}return i;},undo:function(n,j){var m=this.lastChange,l=this.idAttribute,i={},k;n||(n=h.keys(m));g.Array.each(n,function(o){if(h.owns(m,o)){o=o===l?"id":o;k=true;i[o]=m[o].prevVal;}});if(k){return this.setAttrs(i,j);}return true;},url:function(){return"";},validate:function(){},_validate:function(i){var j=this.validate(i);if(d.isValue(j)){this.fire(b,{type:"validate",attributes:i,error:j});return false;}return true;},_defAttrChangeFn:function(i){if(!this._setAttrVal(i.attrName,i.subAttrName,i.prevVal,i.newVal)){i.stopImmediatePropagation();}else{i.newVal=this.get(i.attrName);if(i._transaction){i._transaction[i.attrName]=i;}}}},{NAME:"model",ATTRS:{clientId:{valueFn:"generateClientId",readOnly:true},id:{value:null}}});},"@VERSION@",{optional:["json-parse"],requires:["base-build","escape"]});