$(function () {
    //全选按钮模块

    //绑定全选按钮改变事件
    $(".checkall").change(function () {
        //$(this).prop("checked") 是全选按钮 checked 的结果 true / false ，将结果赋给各个小按钮
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if($(this).prop("checked")) {    //当全选按钮勾选后
            //就添加对应的类（背景颜色）
            $(".cart-item").addClass("check-cart-item");
        } else {
            //否则去除类
            $(".cart-item").removeClass("check-cart-item");
        }
    })
    //绑定各个小按钮改变事件
    $(".j-checkbox").change(function () {
        //如果勾选小按钮的数量 == 总的小按钮数量
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            //则把true 赋给全选按钮
            $(".checkall").prop("checked", true);
        } else {
            //否则false 赋给全选按钮
            $(".checkall").prop("checked", false);
        }
        if($(this).prop("checked")) { //如果小按钮被选上了
            //其父元素要添加对应的类(背景颜色)
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            //否则去除对应的类
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    })

    //增减商品数量模块

    //绑定增加商品按钮事件
    $(".increment").click(function () {
        //获取初始的数量
        var num = $(this).siblings(".itxt").val();
        num++;
        //再赋值给原来的元素
        $(this).siblings(".itxt").val(num);
        // var p = $(this).parent().parent().siblings(".p-price").html();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var sum = (p * num).toFixed(2);
        // $(this).parent().parent().siblings(".p-sum").html("￥" + sum);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + sum);
        getSum()
    })
    //绑定减少商品按钮事件
    $(".decrement").click(function () {
        //获取初始的数量
        var num = $(this).siblings(".itxt").val();
        //设置商品数量不能小于1
        if (num == 1) {
            return false;
        }
        num--;
        //再赋值给原来的元素
        $(this).siblings(".itxt").val(num);
        // var p = $(this).parent().parent().siblings(".p-price").html();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var sum = (p * num).toFixed(2);
        // $(this).parent().parent().siblings(".p-sum").html("￥" + sum);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + sum);
        getSum()
    })
    //用户修改文本框的值  计算 小计模块
    //当输入框里面的value改变 绑定事件
    $(".itxt").change(function () {
        var vals = $(this).val();
        //当用户输入小于1的值，强行把输入值改为1，false 不允许后面代码
        if (vals < 1) {
            $(this).val(1);
            return false;
        }
        //要是输入的值符合规定
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var sum = (p * vals).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + sum);
        getSum();
    })


   
    getSum();  //刷新页面就自动调用函数，保证商品总数量为3总额也正常
    //计算总件商品和总额  包装成函数，再在各个商品个操作里面 调用函数即可
    function getSum() {
        var count = 0;
        var money = 0;
        //遍历各个商品的数量  i 每一个商品   ele 是每一个商品对应的商品数量
        $(".itxt").each(function (i, ele) {
            //累积相加
            count += parseInt($(ele).val());
        });
        //最后赋值给 总数目所对应的元素
        $(".amount-sum em").text(count);
        //遍历统计各个商品 的价格   i是每一个商品  ele是每一个商品对应的商品价格
        $(".p-sum").each(function (i, ele) {
            //累积相加
            money += parseFloat($(ele).text().substr(1));
        });
        //最后赋值给总数额对应的元素
        $(".price-sum em").text("￥" + money.toFixed(2));
    }

    //删除商品模块
    $(".p-action a").click(function() {
        //删除单个对应的商品
        $(this).parents(".cart-item").remove();
        getSum(); //调用操作总商品数量和总额函数
    })
    $(".remove-batch").click(function() {
        //删除勾选的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum(); 
    })
    $(".clear-all").click(function() {
        //全删操作
        $(".cart-item").remove();
        getSum();
    })
})