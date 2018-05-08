(function(window,$,undefined){
	window.popup = {
		numbers : 0,
		index : 1000,
		domName : ['','Alert','Confirm','Prompt','Layer','Iframe','Loading','Taps']
	}
	var Fun = function(j_){
		var that = this,
			jd = {
				addTarget : $('body'),
				type : 1,
				cName : "",
				shade :{yes : 1, bgColor : '#000000', opacity : 0.5, animate : {type : 1 , target : 0.6}, close : false},
				area : {w : 'auto', h : 'auto'},
				offset : {fix : 1, t : 'auto',r : 'auto', b : 'auto', l : 'auto'},
				zIndex :{yes:0,val:1000},
				animate : {type : 1, target : 1},
				autoClose : {yes : 0, time : 0},
				move : {yes : 1, handle : '.evPopupHead'},
				head : {yes : 1, text : 'ϵͳ��ʾ'},
				opBut : {yes : 1, close : 1, min : 0, max : 0},
				con : {
					text : [1,"��ʾ��Ϣ"],
					img : [1,"wran"],
					src : 'http://www.ev123.net',
					html : "<p>����html����</p>"
				},
				but : {
					yes : 0,
					button : {}
				},
				bfun : function(){}
			};
			//�ж��������Ĭ��ֵ
			switch(j_.type){
				case  1 :
					jd.but.yes = 1;
					jd.but.button = {
						but_1 : {text:"ȷ��" ,fun : function(){}}
					}
				break;
				case 2 :
					jd.but.yes = 1;
					jd.but.button = {
						but_1 : {text:"ȷ��" ,fun : function(){}},
						but_2 : {text:"ȡ��" ,fun : function(){}}
					}
				break;
				case 3 :
					jd.but.yes = 1;
					jd.but.button = {
						but_1 : {text:"ȷ��" ,fun : function(){}},
						but_2 : {text:"ȡ��" ,fun : function(){}}
					}
				break;
				case 4 :
				break;
				case 5 :
				break;
				case 6 :
					jd.head.yes = 0;
					jd.opBut.yes = 0;
					jd.con.img[0] = 1;
					jd.con.img[1] = "loading";
				break;
				case 7 :
					jd.head.yes = 0;
					jd.opBut.yes = 0;
				break;
			}
		that.j = $.extend(true,{},jd,j_);
		popup.numbers++;
		that.numbers = popup.numbers;
		if(that.j.zIndex.yes){
			that.index = that.j.zIndex.val
		}else{
			that.index = popup.index;
		}
		that.createDom();
	};
	//Fun���캯��ԭ��
	Fun.pt = Fun.prototype;
	//�õ����ڵĿ�ߣ�dom�Ŀ�ߣ�elemnet�Ŀ��
	Fun.pt.winAttr = function(o){
		this.winW = $(window).width();
		this.winH = $(window).height();
		this.domW = $(document).width();
		this.domH = $(document).height();
		this.domST = $(document).scrollTop();
		this.domSL = $(document).scrollLeft();
		this.popupW = o.width();
		this.popupH = o.height();
	};
	//���dom������
	Fun.pt.createDom = function(){
		var that = this,
			j = that.j,
			evShade = $('<div class="evPopupShade"></div>'),
			evPopup = $('<div class="evPopup"></div>'),
			evRemovePopup = $('<small class="funBut rmovePopup"></small>'),
			evHidePopup = $('<small class="funBut hidePopup"></small>'),
			evShowPopup = $('<small class="funBut showPopup"></small>'),
			evPopupOpbut = $('<div class="evPopupOpbut"></div>'),
			evPopupHead =$('<div class="evPopupHead"><div class="evPopupHeadL"></div><div class="evPopupHeadC"><h3 class="evPopupHeadName">'+ j.head.text +'</h3></div><div class="evPopupHeadR"></div></div>'),
			evPopupBody = $('<div class="evPopupBody"><div class="evPopupBodyT"><div class="evPopupBodyTL"></div><div class="evPopupBodyTC"></div><div class="evPopupBodyTR"></div></div><div class="evPopupBodyC"><div class="evPopupBodyCL"></div><div class="evPopupBodyCR"></div><div class="evPopupBodyCC"></div></div><div class="evPopupBodyB"><div class="evPopupBodyBL"></div><div class="evPopupBodyBC"></div><div class="evPopupBodyBR"></div></div></div>'),
			evPopupCon = $('<div class="ev'+ popup.domName[j.type] +'Con"></div>'),
			evPopupBut = $('<div class="evPopupButArea"><div class="evPopupBut"></div></div>');
		//���õ���������ֵ���ʽ����������
		evShade.data("dataIndex",that.numbers).addClass("evShade"+popup.domName[j.type]).css({"z-index":++that.index,"background-color":j.shade.bgColor,"opacity":j.shade.opacity});
		evPopup.data("dataIndex",that.numbers).addClass( "evPopup"+ popup.domName[j.type] +" "+ j.cName).css({"z-index":++that.index});
		//�����ص�Ԫ����ӵ������������رյ�����
		evRemovePopup.data("dataIndex",that.numbers).on("click",function(){
				that.closeAnimate(evShade,j.shade.animate);
				that.closeAnimate(evPopup,j.animate);
		}).appendTo(evPopup);
		//�����ص�Ԫ����ӵ��������������ص�����
		evHidePopup.data("dataIndex",that.numbers).on("click",function(){
				that.popupHide(evShade);
				that.popupHide(evPopup);
		}).appendTo(evPopup);
		//�����ص�Ԫ����ӵ�������������ʾ������
		evShowPopup.data("dataIndex",that.numbers).on("click",function(){
				that.popupShow(evShade);
				that.popupShow(evPopup);
		}).appendTo(evPopup);
		popup.index+=2;
		//�жϰ�ť��ʾ���
		if(j.opBut.yes){
			//��ӹرհ�ť
			if(j.opBut.close){
				var opbutClose = $('<span class="evOpbutClose"></span>');
				opbutClose.attr({"title":"�ر�"}).data("dataIndex",that.numbers).on({
					mouseenter : function(){$(this).addClass("evOpbutCloseHover")},
					mouseleave : function(){$(this).removeClass("evOpbutCloseHover")},
					click : function(){
						evRemovePopup.trigger("click");
					}
				}).appendTo(evPopupOpbut);
			}
			//�����С����ť
			if(j.opBut.min){
				var opbutMin = $('<span class="evOpbutMin"></span>');
				opbutMin.attr({"title":"��С��"}).data("dataIndex",that.numbers).on({
					mouseenter : function(){$(this).addClass("evOpbutMinHover")},
					mouseleave : function(){$(this).removeClass("evOpbutMinHover")},
					click : function(){
						
					}
				}).appendTo(evPopupOpbut);
			}
			//�����󻯰�ť
			if(j.opBut.max){
				var opbutMin = $('<span class="evOpbutMin"></span>'),
						opbutMaxmin = $('<span class="evOpbutManmin"></span>');
				opbutMin.attr({"title":"���"}).data("dataIndex",that.numbers).on({
					mouseenter : function(){$(this).addClass("evOpbutManHover")},
					mouseleave : function(){$(this).removeClass("evOpbutManHover")},
					click : function(){
						
					}
				}).appendTo(evPopupOpbut);
				opbutMaxmin.attr({"title":"��ԭ"}).data("dataIndex",that.numbers).on({
					mouseenter : function(){$(this).addClass("evOpbutManminHover")},
					mouseleave : function(){$(this).removeClass("evOpbutManminHover")},
					click : function(){
						
					}
				}).appendTo(evPopupOpbut);
			}
			evPopupOpbut.appendTo(evPopup);
		}
		//���ݲ�ͬ���ͣ��ж���������
		switch(j.type){
			case 1 : 
				var span = j.con.text[0] == 1 ? '<span class="hintText">'+j.con.text[1]+'</span>' : "",
						img = j.con.img[0] ==  1 ? '<em class="icon '+j.con.img[1]+'Icon"></em>' : "";
				evPopupCon.append(img,span);
			break;
			case 2 :
				var span = j.con.text[0] == 1 ? '<span class="hintText">'+j.con.text[1]+'</span>' : "",
						img = j.con.img[0] ==  1 ? '<em class="icon '+j.con.img[1]+'Icon"></em>' : "";
				evPopupCon.append(img,span);				
			break;
			case 3 :
				var inputE = $('<div class="inputTextE"><div class="inputText"><input type="text"></div></div>');
				if(j.con.text[0] == 1){
					inputE.find("input").attr("placeholder",j.con.text[1]);
				}
				evPopupCon.append(inputE);
			break;
			case 4 :
				var layerHtml = typeof(j.con.html) == 'object' ? j.con.html.html() : j.con.html;
				evPopupCon.append(layerHtml);
			break;
			case 5 : 
				var iframe = $('<iframe src="'+j.con.src+'" frameborder="0" scrolling="no" allowTransparency="true" name="popupIframe_'+ that.numbers +'"  id="popupIframe_'+ that.numbers +'"></iframe>');
				iframe.css({"height":"auto"}).appendTo(evPopupCon);
			break;
			case 6 :
				var loadingImg = $('<div class="loadingImg"></div>'),
						img = $('<em class="'+j.con.img[1]+'Icon"></em>');
					evPopupCon.append(loadingImg.append(img));
			break;
			case 7 :
				var tops = $('<p class="tapsText">'+ j.con.text[1] +'</p>');
				evPopupCon.append(tops);
			break;
		}
		//������ݵ�������
		evPopupBody.find(".evPopupBodyCC").append(evPopupCon);
		//��ӵ�����ť
		if(j.but.yes){
			if(j.type == 1 || j.type == 2 || j.type == 3){
				var butLength = 0,butWidth = 0,x = "",cName="";
				//���ݴ���İ�ť����ѭ����Ӱ�ť
				for(x in j.but.button){
					butLength++;
					cName = j.but.button[x]["cName"] || "";
					var popupBut =  $('<span class="popupBut popupBut_'+ butLength +' '+ cName +'"><b class="popupButI">'+ j.but.button[x]['text'] +'</b></span>');
					popupBut.data("data-name",x).appendTo(evPopupBut.children(".evPopupBut"));
				}
				//����ť���ÿ��
				evPopupBut.find(".popupBut").each(function(){
					$(this).width(100/butLength+"%");
				});
				//����ť���¼�
				evPopupBut.on({
					click : function(){
						var dataName = $(this).data('data-name');
						if(typeof(j.but.button[dataName]['fun'])==='function'){
							j.but.button[dataName]['fun']();
						}
						evRemovePopup.trigger("click");
					}
				},".popupBut");
			}
			evPopupBut.appendTo(evPopup);

		}
		//�жϵ�������
		j.head.yes ?	evPopupHead.prependTo(evPopup) : "";//����������ӱ���
		evPopup.append(evPopupBody).appendTo(j.addTarget);//�ѵ�������ӵ�ҳ����
		that.popupCountWH(evPopup);	//���ú������㵯������
		that.winAttr(evPopup);	//��ⴰ�ں�dom�Ŀ�ߡ�
		//����
		if(j.shade.yes){
			evShade.appendTo(j.addTarget);//�ж��������
			that.shadeCountWH(evShade);//�������ֵĿ��
			that.openAnimate(evShade,j.shade.animate);//���ֶ���
			//�ж��Ƿ��������ӵ���¼�
			j.shade.close ? evShade.on("click",function(){
					that.closeAnimate(evShade,j.shade.animate);
					that.closeAnimate(evPopup,j.animate);
				}) : "";
		}
		that.popupOffset(evPopup);
		that.openAnimate(evPopup,j.animate);
		//�Զ��ر�
		if(j.autoClose.yes){
			setTimeout(function(){
					evRemovePopup.trigger("click");
				},j.autoClose.time*1000);
			//that.autoClose(evPopup);
		}
		if(j.move.yes){
			that.popupMove(evPopup);
		}
	};
	//�������߼���
	Fun.pt.popupCountWH = function(evPopup){
		var that = this,
			j = that.j,
			hh = 0,
			buth = 0,
			ch = 0,
			lh= 0,
			evPopupBodyCC = evPopup.find(".evPopupBodyCC");
		if(j.head.yes){
			hh = evPopup.find(".evPopupHead").height();
			var padT = hh - evPopup.children("div.evPopupBody").children('div.evPopupBodyT').height();
			evPopupBodyCC.css({"padding-top":padT+"px"});
			ch -=hh;
		}
		if(j.but.yes){
			buth = evPopup.find(".evPopupButArea").height();
			evPopupBodyCC.css({"padding-bottom":buth+"px"});
			ch = ch-buth;
		}
		if(j.area.w != "auto"){
			evPopup.css({"width":j.area.w+"px"});
		}
		if(j.area.h != "auto"){
			evPopup.css({"height":j.area.h+"px"});
			ch = j.area.h - evPopup.children("div.evPopupBody").children('div.evPopupBodyT').height() - evPopup.children("div.evPopupBody").children('.evPopupBodyB').height()+ch;
		}else{
			ch = evPopup.height()-evPopup.children("div.evPopupBody").children('div.evPopupBodyT').height() - evPopup.children("div.evPopupBody").children('.evPopupBodyB').height()+ch;
			
		}
		evPopupBodyCC.css({"height":ch+"px"});
		if(j.type == 5){
			if(j.area.w == 'auto' && j.area.h == 'auto'){
				var loadingWait = $('<div class="loadingWait"></div>'),
						loadH = evPopupBodyCC.outerHeight(),
						iframes = evPopupBodyCC.find("iframe");
				loadingWait.css({"height":loadH + "px"}).appendTo(evPopupBodyCC);
				iframes.load(function(){
						loadingWait.remove();
						iframes[0].contentWindow.iframeNumber = that.numbers;
						var iw = iframes.contents().width(),
								ih = iframes.contents().height();
						evPopupBodyCC.children("div.evIframeCon").css({"width":iw+"px","height":ih+"px"});
						iframes.css({"width":iw+"px","height":ih+"px"});
						var iew = evPopup.find(".evPopupBodyC").outerWidth();
						evPopup.css({"width":iew+"px"});
						that.winAttr(evPopup);
						that.popupOffset(evPopup);
				});
			}else{
					var iw = evPopup.children(".evPopupBody").find("div.evIframeCon").width(),
							ih = evPopup.children(".evPopupBody").find("div.evIframeCon").height(),
							loadingWait = $('<div class="loadingWait"></div>'),
							loadH = evPopupBodyCC.outerHeight(),
							iframes = evPopupBodyCC.find("iframe");
					loadingWait.css({"height":loadH + "px","width":"100%"}).appendTo(evPopupBodyCC);
					iframes.css({"width":iw+"px","height":ih+"px","top":"10px"});
				iframes.load(function(){
					iframes[0].contentWindow.iframeNumber = that.numbers;
					loadingWait.remove();
				});
			}
		}else{
				if ( $.browser.msie){
					if( $.browser.version == 7 || $.browser.version == 6){
						var iew = evPopup.find(".evPopupBodyC").outerWidth();
							evPopup.css({"width":(iew+10)+"px"});
						}
					}
		}
		if(j.type == 6){
			if(j.area.w == 'auto' && j.area.h == 'auto'){
				var img = evPopupBodyCC.find("img");
				img.load(function(){
					var iw = img.width(),
							ih = img.width();
						evPopupBodyCC.children("div.evLoadingCon").css({"width":iw+"px","height":ih+"px"});
						that.winAttr(evPopup);
						that.popupOffset(evPopup);
				})
			}
		}
	};
	//���ֵĿ�߼���
	Fun.pt.shadeCountWH = function(evShade){
		var that = this,
				j = that.j;
			if(j.offset.fix){
				evShade.css({"position":"fixed","left":"0px","top":"0px","width":that.winW+"px","height":that.winH+"pc"});
			}else{
				evShade.css({"position":"absolute","left":"0px","top":"0px","width":that.winW+"px","height":that.domH+"px"});
			}
	}
	Fun.pt.popupOffset = function(evPopup){
		var that = this,
				j = that.j,
				t = 0,
				l = 0;
			if(j.offset.fix){
				evPopup.css({"position":"fixed"});
				if(j.offset.t == "auto"){
					t = (that.winH - that.popupH)/2;
					
				}else{
					t = j.offset.t;
				}
			}else{
				if(j.offset.t == "auto"){
					t = that.domST + (that.winH - that.popupH)/2;
				}else{
					t = that.domST+j.offset.t;
				}
			}
			if(j.offset.l!="auto"){
				l = j.offset.l;
			}else{
				l = (that.winW - that.popupW)/2;
			}
			if(t<0){t=0;}
			evPopup.css({"left":l+"px","top":t+"px"});
	};
	Fun.pt.openAnimate = function(o,an){//�򿪶���Ч��
			switch (an.type){
				case 0 :
					
				break;
				case 1	:
					o.css({"opacity":0});
					o.animate({"opacity":an.target},300);
				break;
				case 2 :
					var objH = o.height();
					o.css({"margin-top":-objH+"px","opacity":0});
					o.animate({marginTop:0,opacity:1},300);
				break;
				case 3 :
					var objW = o.width();
					o.css({"margin-left":objW+"px","opacity":0});
					o.animate({marginLeft:0,opacity:1},300);
				break;
				case 4 : 
					var objH = o.height();
					o.css({"margin-top":objH+"px","opacity":0});
					o.animate({marginTop:0,opacity:1},300);
				break;
				case 5 :
					var objW = o.width();
					o.css({"margin-left":-objW+"px","opacity":0});
					o.animate({marginLeft:0,opacity:1},300);
				break;
			}
	};
	Fun.pt.closeAnimate = function(o,an){//�رն���Ч��
			switch (an.type){
				case 0 :
					o.remove();
				break;
				case 1	 :
					o.animate({"opacity":0},300,function(){
						o.remove();
					});
				break;
				case 2 : 
					var objH = o.height();
					o.animate({marginTop:-objH,opacity:0},300,function(){
						o.remove();
					});
				break;
				case 3 :
					var objW = o.width();
					o.animate({marginLeft:objW,opacity:0},300,function(){
						o.remove();						
					});
				break;
				case 4 : 
					var objH = o.height();
					o.animate({marginTop:objH,opacity:0},300,function(){
						o.remove();
					});
				break;
				case 5 :
					var objW = o.width();
					o.animate({marginLeft:-objW,opacity:0},300,function(){
						o.remove();						
					});
				break;
			}
	};
	//�����϶��¼�
	Fun.pt.popupMove = function(evPopup){
		var that = this,
				j = that.j;
		evPopup.find(j.move.handle).on({
			mousedown : function(ev){
				that.winAttr(evPopup);
				var ev = ev || window.event,
						objW = evPopup.width(),
						objH = evPopup.height(),
						objL = evPopup.offset().left,
						objT = evPopup.offset().top,
						zindex = evPopup.css("z-index")*1+1,
						startX = ev.pageX,
						startY = ev.pageY,
						clickW = startX - objL,
						clickH = startY - objT,
						moveX = 0,
						moveY = 0,
						endL = 0,
						endT = 0,
						movePx = 0,
						moveObj = $('<div class="evPopupMoveShade"><div></div></div>');
				moveObj.css({"width":objW+"px","height":objH+"px","left":objL+"px","top":objT+"px","z-index":zindex}).children("div").css({"height":(objH-2)+"px"});
				$(document).on({
					mousemove : function(ev){
						var ev = ev || window.event;
						movePx = Math.abs(ev.pageX - startX);
						if(movePx > 1){
							if(moveObj.data("data-have") != 1){
								moveObj.appendTo(j.addTarget);
								moveObj.data("data-have",1);
							}
							$(document).find("body").css({"cursor":"move"});
							endL = moveX = ev.pageX - clickW;
							endT = moveY = ev.pageY - clickH;
							if(moveX < 0){
								moveX = 0;
								endL = 0;
							}else if(moveX > (that.winW - objW)){
								moveX = that.winW - objW;
								endL = that.winW - objW;
							}
							if(j.offset.fix){
								endT = ev.pageY - clickH - that.domST;
								if(moveY < that.domST){
									moveY = that.domST;
									endT = 0;
								}else if(moveY > (that.domST + that.winH - objH)){
									moveY = that.domST + that.winH - objH;
									endT = moveY - that.domST;
								}
							}else{
								if(moveY < 0){
									moveY = 0;
									endT = 0;
								}else if(moveY > that.domH - objH){
									moveY = that.domH - objH;

									endT = that.domH - objH;
								}
							}
							moveObj.css({"left" : moveX + "px","top" : moveY + "px"});
						}
						return false;
					},
					mouseup : function(){
						if(movePx>1){
							moveObj.remove();
							$(this).off("mousemove mouseup");
							evPopup.css({"left" : endL+"px","top" : endT+"px"});
							$(document).find("body").css({"cursor":"default"});
						}
						$(this).off("mousemove mouseup");
					}
				})
				return false;
			}
		})
	};
	//����popup����
	Fun.pt.popupHide = function(o){
		o.css({display:"none"});
		/*o.animate({opacity:0},300,function(){
			$(this).css({display:"none"});
		});*/
	};
	Fun.pt.popupShow = function(o){
		o.css({display:"block"});
	};	
	$.popup = function(j){
		var o = new Fun(j);
		return o.numbers;
	};
	$.popupClose = function(numbers){
		$('body').children("div.evPopup").each(function(){
			if($(this).data("dataIndex") ==numbers){
				$(this).children("small.rmovePopup").trigger("click");
			}
		})
	};
	$.popupHide = function(numbers){
		$('body').children("div.evPopup").each(function(){
			if($(this).data("dataIndex") == numbers){
				$(this).children("small.hidePopup").trigger("click");
			}
		})
	};
	$.popupShow = function(numbers){
		$('body').children("div.evPopup").each(function(){
			if($(this).data("dataIndex") == numbers){
				$(this).children("small.showPopup").trigger("click");
			}
		})
	};
})(window,jQuery,undefined);