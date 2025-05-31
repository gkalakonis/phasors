function convertToRectangular() {
    var r = parseFloat(document.getElementById('polar-r').value);
    var theta = parseFloat(document.getElementById('polar-theta').value);
    
    var x = r * Math.cos(toRadians(theta));
    var y = r * Math.sin(toRadians(theta));
    createChart(x, y); 
    document.getElementById('rectangular-x').value = x.toFixed(2);
    
    document.getElementById('rectangular-y').value = y.toFixed(2);
  }
  
  function convertToPolar() {
    var x = parseFloat(document.getElementById('rectangular-x').value);
    var y = parseFloat(document.getElementById('rectangular-y').value);
    
    var r = Math.sqrt(x**2 + y**2);
    var theta = toDegrees(Math.atan2(y, x));
    
    document.getElementById('polar-r').value = r.toFixed(2);
    document.getElementById('polar-theta').value = theta.toFixed(2);
    createChart(x, y); 
  }
  
  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  
  function toDegrees(radians) {
    return radians * 180 / Math.PI;
  }
 