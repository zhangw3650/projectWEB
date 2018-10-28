$(function(){
    countItem();
    //1.全选和取消全选
    var isTrue = false;
    $("#checkall").click(function(){
        isTrue = !isTrue;
        if(isTrue){
            //选中操作,checked = true
            //获取所有商品前的选择框,设置选中属性
            $("[name=check]").prop('checked', true);
        }else{
            //取消全选
            $("[name=check]").removeAttr("checked");
            // $("#checkall").prop("checked", false);
        };
        countItem();
    });


    //2.通过商品选择框反选操作全选按钮
    $("[name=check]").click(function(){
        console.log($("[name=check]"))
        console.log($("input[name=check]"))
        //:checked 表示匹配被选中的元素
        //获取所有为被选中元素个数,判断是否小于等于零
        if($("[name=check]").not("input:checked").size() <= 0){
            //全选按钮也应该是选中状态
            $("#checkall").prop("checked", true);
            isTrue = true;
        }else{
            //存在未勾选的元素
            $("#checkall").prop("checked", false);
            isTrue = false;
            // $("#checkall").removeAttr("checked");
        };
        countItem();
    });


    //3.数量操作
    $(".increment").click(function(){
        //点击+,操作输入框
        var value = $(this).prev().val();
        //数量自增之后重新赋值给输入框显示
        $(this).prev().val(++value);
        //价格联动
        //通过层级结构获取当前商品的单价
        var priceStr = $(this).parent().prev().text();
        //截取字符串获取单价
        var price = Number(priceStr.substring(1, priceStr.length));
        //获取小计
        $(this).parent().next().html("<strong>&yen;" + value * price + "</strong>");
        countItem();
    });

    $(".decrement").click(function(){
        if($(this).next().val() > 1){
            var value = $(this).next().val();
            $(this).next().val(--value);
            var priceStr = $(this).parent().prev().text();
            var price = Number(priceStr.substring(1, priceStr.length));
            $(this).parent().next().html("<strong>&yen;" + value * price + "</strong>");
        }else{
            $(this).parent().parent().remove();
        };
        countItem();
    });

    //4.移除操作
    $(".removeItem").click(function(){
        //移除当前商品
        $(this).parent().parent().remove();
        countItem();
    });


    //5.动态修改商品数量,实现价格联动
    //输入框失去焦点时,修改商品价格
    $("[name=count]").blur(function(){
        var value = $(this).val();
        if(isNaN(value)){
            //如果输入非法字符,当前的输入框重新获取焦点,显示红色轮廓线
        }else{
            var priceStr = $(this).parent().prev().text();
            var price = Number(priceStr.substring(1, priceStr.length));
            $(this).parent().next().html("<strong>&yen;" + value * price + "</strong>");
        };
        //调整商品的总数量和总计价格
        countItem();
    });


	//6. 总数量和总价格变动
	function countItem(){
		var sum = 0;
 		var priceSum = 0;
 		/*
 		1. 获取所有选中的元素
 		2. 遍历被选中的元素,获取父节点 $(this).parent().parent()查找 .g-item
 		3. 通过父节点查找后代元素 find("selector");
 		4. 获取当前商品信息的数量和价格
 		*/
 		$("[name=check]:checked").each(function(){
 			sum += Number($(this).parent().parent().find('[name=count]').val());
 			var priceStr=$(this).parent().parent().find('strong').html();
 			priceSum += Number(priceStr.substring(1,priceStr.length));
 		});
 		$(".submit-price span").html('&yen;'+priceSum);
 		$(".submit-count span").text(sum);
 	};


})