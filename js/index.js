$(function(){
    /*-----------图片轮播-----------*/
	//1. 获取图片数组
	//2. 定时器实现图片切换
	//3. 图片切换主要切换数组下标，防止数组越界
    var banner = $(".wrapper");
    var imgs = banner.children();  //图片数组
    var indInfo = $(".imgNav").children();  //索引数组
    var imgIndex = 0;  //初始下标
    var timer;
    timer = setInterval(autoPlay, 1000);  //定时器

    function autoPlay(){
        console.log(imgs[imgIndex])
        //设置元素隐藏与显示
        imgs[imgIndex].style.display = "none";
        imgIndex = ++ imgIndex == imgs.length ? 0 : imgIndex;  //同下理解1
        imgs[imgIndex].style.display = "block";
        
        for(var i = 0; i <indInfo.length; i ++){
            indInfo[i].style.background = "gray";
        };
        //切换索引,切换背景色
        indInfo[imgIndex].style.background = "red";
    };
    
    banner.mouseover(function(){
        //停止计时器
        clearInterval(timer);
    })

    banner.mouseout(function(){
        timer = setInterval(autoPlay, 1000)
    })
})


//理解2:
// ++ imgIndex;
// if(imgIndex == imgs.length){
//     imgIndex = 0;
// }