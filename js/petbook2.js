Category = {
	c_div: false,
	_init: function(){
		this.m_div = $('category');
		span = this.m_div.getElementsByTagName('span');
		for(i=0;i<span.length;i++){
			span[i].onmouseover = function(){this.className = 'hover';}
			span[i].onmouseout = function(){if(this != Category.c_div) this.className = '';}
		}
	},

	_ch: function(id){
		if(this.c_div != false) this.c_div.className = '';
		if(arguments.length >1) this.c_div = arguments[1];
		else{
			this.c_div = this.m_div.getElementsByTagName('span')[id-1];
			this.c_div.className = 'hover';
		}
		$('petlist').innerHTML = '<div style="line-height: 100px;text-align:center">載入中...</div>';
		if(id<=12)Ajax.open('POST', '?act=glist', 'group='+id, function(xml){
			$('petlist').innerHTML = xml.responseText;
			if( document.getElementsByClassName ) {
				var set = document.getElementsByClassName('image_party');
				for(var i=0,l=set.length;i<l;i++) Category._setAnim(set[i]);
			}
		});
	},
	
	_setAnim: function(obj) {
		if( !obj.dataset ) return;
		var map = obj.getElementsByClassName('imagemap')[0];
		var sizeD = obj.dataset.size.split(',');
		var sizes = [];
		var actions = [0,1,2,3,5,6,8,10];
		for(var i=0,j=0;i<actions.length;i++) sizes[actions[i]] = {x:sizeD[j++],y:sizeD[j++],f:sizeD[j++],t:sizeD[j++],ox:sizeD[j++],oy:sizeD[j++]};
		var width = map.style.width.replace(/[^0-9]/g,'') * 1;
		var interval = map.dataset.time;
		var totalf = map.dataset.frame;
		var stopAtLoop = false;
		var currentf = 0;
		var animNo = obj.dataset.id;
		var mousedownID = 0;
		var chAnim = function(action, stoploop) {
			stoploop = stoploop || false;
			currentf = 0;
			if( stoploop ) stopAtLoop = true; 
			map.style.backgroundImage = 'url("http://i.cgsword.hk/anim/map/'+animNo+'4'+(('0'+action).substr(-2))+'.png")';
			map.style.width = sizes[action].x+'px';
			map.style.height = sizes[action].y+'px';
			map.style.marginLeft = -sizes[action].ox+'px';
			map.style.marginTop = -sizes[action].oy+'px';
			width = sizes[action].x;
			totalf = sizes[action].f;
			interval = sizes[action].t;
			clearTimeout(animID);
			animF();
		}
		var animF = function(){
			currentf++;
			if( currentf >= totalf ) { currentf=0; if( stopAtLoop ) { stopAtLoop = false; chAnim(0); return; } }
			map.style.backgroundPosition = '-'+(currentf*width)+'px 0px';
			animID = setTimeout(arguments.callee,interval/totalf); 
		};
		var animID;
		chAnim(0);
		obj.addEventListener('mouseover', function(event){
			chAnim(1);
		});
		obj.addEventListener('mousedown', function(event){
			mousedownID = setTimeout(function(){
				chAnim(3);
			}, 500);
		});
		obj.addEventListener('mouseup', function(){
			clearTimeout(mousedownID);
		});
		obj.addEventListener('mouseleave', function(event){
			event.stopPropagation();
			if( stopAtLoop ) return;
			chAnim(0);
		});
		obj.addEventListener('click', function(event){
			event.preventDefault();
			if( event.button == 0 ) {
				chAnim(5, true);
			}
		});
		obj.addEventListener('contextmenu', function(event){
			event.preventDefault();
			chAnim(6, true);
		});
		obj.addEventListener('dblclick', function(event){
		event.preventDefault();
			chAnim(10);
		});
	}
};

Sh = {
	_init: function(){
		div = $('search_div');
		div.style.display = 'block';
		div.style.position = _IE6 ? 'absolute' : 'fixed';
		div.style.left = Math.floor(($('base').clientWidth - div.clientWidth)/2) + 'px';
		div.style.top  = Math.floor((document.documentElement.clientHeight - div.clientHeight)/2) + 'px';
	},

	_sh: function(){
		if(arguments[0] == 'name') Ajax.open('POST', '?act=sh', $('name_search'), function(xml){Sh._p(xml)});
		else if(arguments[0] == 'grow') Ajax.open('POST', '?act=sh', $('grow_search'), function(xml){Sh._p(xml)});
	},

	_p: function(xml){
		if(xml.responseText == '') $('result').innerHTML = '沒有任何資料';
		else{
			div = $('result');
			div.innerHTML = '';
			d = document.createElement('form');
			d.id = 'result_form';
			d.action = 'javascript:Sh._d()';
			str = xml.responseText.split('\n');
			for(var i in str){
				str[i] = str[i].split(',');
				d.innerHTML+= '<span class="block"><input type="checkbox" name="no[]" value="'+str[i][0]+'" class="normal" checked>'+str[i][1]+'</span>';
			}
			d.innerHTML+= '<div><input type="submit" value="顯示" style="padding: 3px 5px;margin-top: 15px"></div>';
			div.appendChild(d);
			if(str.length == 1) this._d();
		}
	},

	_d: function(){
		if(arguments.length > 0) f = 'no='+arguments[0];
		else f = $('result_form');
		Category._ch(Category.m_div.getElementsByTagName('span').length);
		Ajax.open('POST', '?act=dlist', f, function(xml){$('petlist').innerHTML = xml.responseText;});
		$('search_div').style.display = 'none';
	}
}

addevent(window,'onload', function(){Category._init();});