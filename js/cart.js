$(function(){
    countItem();
    //1.全选和取消全选
    var isTrue = false;
    $("#checkall").click(function(){
        isTrue = !isTrue;
        if(isTrue){
            //选中操作,checked = true
            //获取所有商品前的选择框,设置选中属性
            $("[name=check]").prop('checked', 'true');
        }else{
            //取消全选
            $("[name=check]").removeAttr("checked");
            // $("#checkall").prop("checked", false);
        }
    });


    //2.通过商品选择框反选操作全选按钮
    $("[name=check]").click(function(){
        console.log(isTrue)
        //:checked 表示匹配被选中的元素
        //获取所有为被选中元素个数,判断是否小于等于零
        if($("input[name=check]").not("input:checked").size() <= 0){
            //全选按钮也应该是选中状态
            $("#checkall").prop("checked", "true");
            isTrue = true;
        }else{
            //存在未勾选的元素
            $("#checkall").prop("checked", false);
            isTrue = false;
            // $("#checkall").removeAttr("checked");
        }
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


    //6总数量和总价格联动
    function countItem(){
        //各类商品的数量值和总价
        //获取各类商品的总数
        var sum = 0;
        $("[name=count]").each(function(){
            //遍历所有的name=count的输入框,取值相加
            sum += Number($(this).val());
        });

        //获取所有的商品的总价格
        var priceSum = 0;
        $(".t-sum strong").each(function(){
            var priceStr = $(this).text();  //&yen;169
            var price = Number(priceStr.substring(1, priceStr.length));
            priceSum += price;
        });
        //在页面底部显示数量和价格
		$(".submit-count span").html(sum);
		$(".submit-price span").html('&yen;'+priceSum);
    };

})