function encodeImage(src, callback) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image();
    
      img.onload = function(){
        canvas.width  = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        callback(canvas.toDataURL());
      }
      img.src = src;;
}

encodeImage('/img/logo.png', function(encodedImage) { 
    document.getElementById('data').value = encodedImage;
});