window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preview_img.addEventListener('mousemove', function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // 判断 不能让黄色遮挡层出preview_img框
        if(maskX <= 0) {
            maskX = 0;
        } else if(maskX >= preview_img.offsetWidth - mask.offsetWidth) {
            maskX = preview_img.offsetWidth - mask.offsetWidth;
        }
        if(maskY <= 0) {
            maskY = 0;
        } else if(maskY >= preview_img.offsetHeight - mask.offsetHeight) {
            maskY = preview_img.offsetHeight - mask.offsetHeight;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        var bigImg = document.querySelector('.bigImg');
        //大图片移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层最大移动距离
        //大图片移动距离 =    maskX/Y    * (bigTmg.offsetWidth - big.offsetWidth) / (preview_img.offsetWidth - mask.offsetWidth) 
        var bigImgX = maskX * (bigImg.offsetWidth - big.offsetWidth) / (preview_img.offsetWidth - mask.offsetWidth);
        var bigImgY = maskY * (bigImg.offsetHeight - big.offsetHeight) / (preview_img.offsetHeight - mask.offsetHeight);
        bigImg.style.left = -bigImgX + 'px';
        bigImg.style.top = -bigImgY + 'px';
    })

})