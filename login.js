var login = {
	session : "",
	username : "",
	password : "",

	getCookie : function(){
		var iSession = "iSession";
		var iUesrname = "iUesrname";
		var iPassword = "iPassword";
		var getCookie = document.cookie;
		var arrCookie = getCookie.split("+");
		var tips;
		for(var i=0;i<arrCookie.length;i++){   
			var arr = arrCookie[i].split("-");
			if(iSession == arr[0]){
				login.session = arr[1];
			}else if(iUesrname == arr[0]){
				login.username = arr[1];
			}else if(iPassword == arr[0]){
				login.password = arr[1];
			}
		}
		// console.log(login.session);
		if(login.session == "" || login.username == "" || login.password == ""){
			window.location = "index.html";
		}
		// ---------获取cookie成功后测试执行----------- //
		login.searchInfHandle();
	},

	//获取基本信息
	information : function(){
		$.ajax({
			dataType : "jsonp",
			url : "http://scoreapi.xiyoumobile.com/users/info",
			data : {
				username : login.username,
				password : login.password,
			},
			success : function(data){
				// console.log(data);

				//---- 基本信息的处理 ----//
				
			},
		});
	},


	//全局
	year : "",
	semester : "",


	//查询事件
	searchInfHandle : function(){
		var search = document.getElementById("search-btn");
		search.addEventListener("click", (this.searchMessage).bind(this), false);
	},

	searchMessage : function(){
		var main = document.getElementsByClassName("main-box")[0];
		var contentBoxTemp = document.getElementsByClassName("content")[0];
		contentBoxTemp.parentNode.removeChild(contentBoxTemp);
		var tempBox = document.createElement("div");
		tempBox.setAttribute("class","content");
		main.appendChild(tempBox);

		var selects = document.getElementsByClassName("bottom")[0].getElementsByTagName("select");
		var year = selects[0].value;
		var semester = selects[1].value;

		//赋值给全局
		login.year = year;
		login.semester = semester;

		var contentBox = document.getElementsByClassName("content")[0];

		var askBox = document.createElement("div");
		var img1 = document.createElement("img");
		var img2 = document.createElement("img");
		var infBox2 = document.createElement("div");
		var pLabel = document.createElement("p");
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");

		askBox.setAttribute("class","askBox");
		img1.setAttribute("class","user");
		img1.setAttribute("src","img/xuptlogo.jpg");
		img2.setAttribute("class","triangle2");
		img2.setAttribute("src","img/triangle2.png");
		infBox2.setAttribute("class","infBox2");

		span1.innerHTML = year + "学年，";
		span2.innerHTML = "第" + semester + "学期成绩查询";

		pLabel.appendChild(span1);
		pLabel.appendChild(span2);

		infBox2.appendChild(pLabel);

		askBox.appendChild(img1);
		askBox.appendChild(img2);
		askBox.appendChild(infBox2);

		contentBox.appendChild(askBox);

		// -------在这里执行查询---------- //
		login.score();
	},

	//成绩
	score : function(){
		$.ajax({
			type : "GET",
			dataType : "jsonp",
			url : "http://scoreapi.xiyoumobile.com/score/year",
			data : {
				username : login.username,
				password : login.password,
				session : login.session,
				year : login.year,
				semester : login.semester,
				updata : "1",
			},
			success : function(data){
				// console.log(data);

				if(data.error == "true"){
					alert("现在暂时查不到相关信息……");
				}else if(data.result == "No Recode"){
					alert("查的这些还没有啦~");
				}else{
					for(var i=0; i<data.result.score.length; i++){
						var contentBox = document.getElementsByClassName("content")[0];
						var showInf = document.createElement("div");
						var img1 = document.createElement("img");
						var img2 = document.createElement("img");
						var infBox1 = document.createElement("div");
						var pLabel1 = document.createElement("p");
						var pLabel2 = document.createElement("p");
						var pLabel3 = document.createElement("p");
						var pLabel4 = document.createElement("p");
						var span1 = document.createElement("span");
						var span2 = document.createElement("span");
						var span3 = document.createElement("span");
						var span4 = document.createElement("span");

						infBox1.setAttribute("class","infBox1");
						img1.setAttribute("src","img/xiyou3g.jpg");
						img1.setAttribute("class","xiyou3g");
						img2.setAttribute("src","img/triangle1.png");
						img2.setAttribute("class","triangle1");
						showInf.setAttribute("class","showInf");

						span1.innerHTML = "科目：" + data.result.score[i].Title;
						span2.innerHTML = "卷面成绩：" + data.result.score[i].RealScore;
						span3.innerHTML = "最终成绩：" + data.result.score[i].EndScore;
						span4.innerHTML = "状态：" + data.result.score[i].Exam;

						pLabel1.appendChild(span1);
						pLabel2.appendChild(span2);
						pLabel3.appendChild(span3);
						pLabel4.appendChild(span4);
						infBox1.appendChild(pLabel1);
						infBox1.appendChild(pLabel2);
						infBox1.appendChild(pLabel3);
						infBox1.appendChild(pLabel4);
						showInf.appendChild(img1);
						showInf.appendChild(img2);
						showInf.appendChild(infBox1);

						contentBox.appendChild(showInf);
					}
				}
			}
		});
	}
};

login.getCookie();