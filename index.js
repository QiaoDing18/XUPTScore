var login = {
	session : "",
	username : "",
	password : "",

	//验证码
	vercode : function(){
		$.ajax({
			url : "http://scoreapi.xiyoumobile.com/users/verCode",
			dataType : "jsonp",
			success : function(data){
				var verPic = document.getElementById("verPic");
				verPic.setAttribute("src", data.result.verCode);
				login.session = data.result.session;
			}
		});
	},

	//验证码事件
	vercodeHandle : function(){
		var vercodeListen = document.getElementById("verPic");
		vercodeListen.addEventListener("click", (this.changeVercode).bind(this), "false");
	},

	changeVercode : function(){
		login.vercode();
	},

	//点击
	init : function(){
		login.vercode();
		login.vercodeHandle();
		var oBtn = document.getElementById('btn');
		oBtn.addEventListener("click", (this.check).bind(this), "false");
	},

	//登录
	check : function(){
		var id = document.getElementById("id").value;
		var keys = document.getElementById("password").value;
		var ver = document.getElementById("vercode").value;

		// ------正则------- //
		var idRe = new RegExp("^[0-9]*$");
		var verRe = new RegExp("^.{4}$");
		if(!idRe.test(id)){
			alert("肯定输错啦~");
			login.init();
		}else if(!verRe.test(ver)){
			alert("肯定输错啦~");
			login.init();
		}else{
			login.username = id;
			login.password = keys;
			$.ajax({
				type : "GET",
				url : "http://scoreapi.xiyoumobile.com/users/login",
				data : {
					username : id,
					password : keys,
					session : login.session,
					verCode : ver,
				},
				dataType : "jsonp",
				success : function(data){
					console.log(data);
					if(data.result == "Account Error"){
						alert("一定是哪里出错啦~");
						login.vercode();
					}else if(data.result == "Please check your password or vercode"){
						alert("一定是哪里输错啦~");
						login.vercode();
					}else{
				//------登陆成功后执行------//
						login.setCookie();
						self.location = "login.html";
					}
				},
			});
		}
	},

	setCookie : function(){
		var iSession = "iSession";
		var iUesrname = "iUesrname";
		var iPassword = "iPassword";
		var date = new Date(); //获取当前时间
		var expiresDays = 7;  //将date设置为n天以后的时间
		date.setTime(date.getTime() + expiresDays*24*3600*1000); 
		//格式化为cookie识别的时间
		document.cookie = iSession + "-" + login.session + "+" +
		iUesrname + "-" + login.username + "+" + 
		iSession + "-" + login.session + "+" +
		iPassword + "-" + login.password + ";" +
		"expires=" + 
		date.toGMTString(); 			 //设置cookie
	}
};

login.init();