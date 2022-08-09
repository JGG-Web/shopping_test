$(function () {
    //节流阀
    var flag = true;
    //设置返回顶部
    $(".elevator li:last").click(function () {
        $("body, html").animate({
            scrollTop: 0
        })
    })

    //设置elevator电梯的显示和隐藏
    var recomTop = $(".recom").offset().top;
    eleva(); //在刷新没有页面滚动的时候也可以看到电梯
    //封装一个显示 隐藏电梯的函数
    function eleva() {
        if ($(document).scrollTop() >= recomTop) {
            $(".elevator").fadeIn();
        } else {
            $(".elevator").fadeOut();
        }
    }
    $(window).scroll(function () {
        eleva();//当页面滚动也调用函数
        //当页面滚动的时候， 红色背景颜色也跟着变
        //遍历每一个 楼层
        if (flag == true) {   //如果节流阀打开 则运行以下代码
            $(".floor .w").each(function (i, ele) {
                //如果页面滚动的距离 大于  这层楼的 top距离
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    //则 li的背景颜色发生变化，相应的其他li的背景颜色清空
                    $(".elevator li").eq(i).addClass("current").siblings().removeClass("current");
                }

            })
        }
    })

    //设置跳转各个楼层
    $(".elevator li").click(function () {
        flag = false;
        /* console.log($(this).index()); */
        //获取被点击li的索引号
        var index = $(this).index();
        //通过索引号找到$(".floor .w")相应的子孩子元素，从而获得其offset().top 
        var current = $(".floor .w").eq(index).offset().top;
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {   //animate 中的回调函数  节流阀功能
            flag = true;
        });
        $(this).addClass("current").siblings("li").removeClass("current");
    })

})