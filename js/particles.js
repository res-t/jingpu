

function launchParticlesJS(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > canvas');


  pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      color: '#fff',
      shape: 'circle',
      opacity: 1,
      size: 2.5,
      size_random: true,
      nb: 200,
      line_linked: {
        enable_auto: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1,
        condensed_mode: {
          enable: true,
          rotateX: 65000,
          rotateY: 65000
        }
      },
      anim: {
        enable: true,
          speed: 1
      },
      array: []
    },
    interactivity: {
      enable: true,
      mouse: {
        distance: 100
      },
      detect_on: 'canvas',
      mode: 'grab',
      line_linked: {
        opacity: 1
      },
      events: {
        onclick: {
          enable: true,
          mode: 'push',
          nb: 4
        }
      }
    },
    retina_detect: false,
    fn: {
      vendors:{
        interactivity: {}
      }
    }
  };

  if(params){
    if(params.particles){
      var paramsForParticles = params.particles;
      if(paramsForParticles.color) pJS.particles.color = paramsForParticles.color;
      if(paramsForParticles.shape) pJS.particles.shape = paramsForParticles.shape;
      if(paramsForParticles.opacity) pJS.particles.opacity = paramsForParticles.opacity;
      if(paramsForParticles.size) pJS.particles.size = paramsForParticles.size;
      if(paramsForParticles.size_random == false) pJS.particles.size_random = paramsForParticles.size_random;
      if(paramsForParticles.nb) pJS.particles.nb = paramsForParticles.nb;
      if(paramsForParticles.line_linked){
        var paramsForLineLinked = paramsForParticles.line_linked;
        if(paramsForLineLinked.enable_auto == false) pJS.particles.line_linked.enable_auto = paramsForLineLinked.enable_auto;
        if(paramsForLineLinked.distance) pJS.particles.line_linked.distance = paramsForLineLinked.distance;
        if(paramsForLineLinked.color) pJS.particles.line_linked.color = paramsForLineLinked.color;
        if(paramsForLineLinked.opacity) pJS.particles.line_linked.opacity = paramsForLineLinked.opacity;
        if(paramsForLineLinked.width) pJS.particles.line_linked.width = paramsForLineLinked.width;
        if(paramsForLineLinked.condensed_mode){
          var paramsForCondensedMode = paramsForLineLinked.condensed_mode;
          if(paramsForCondensedMode.enable == false) pJS.particles.line_linked.condensed_mode.enable = paramsForCondensedMode.enable;
          if(paramsForCondensedMode.rotateX) pJS.particles.line_linked.condensed_mode.rotateX = paramsForCondensedMode.rotateX;
          if(paramsForCondensedMode.rotateY) pJS.particles.line_linked.condensed_mode.rotateY = paramsForCondensedMode.rotateY;
        }
      }
      if(paramsForParticles.anim){
        var paramsForAnim = paramsForParticles.anim;
        if(paramsForAnim.enable == false) pJS.particles.anim.enable = paramsForAnim.enable;
        if(paramsForAnim.speed) pJS.particles.anim.speed = paramsForAnim.speed;
      }
    }
    if(params.interactivity){
      var paramsForInteractivity = params.interactivity;
      if(paramsForInteractivity.enable == false) pJS.interactivity.enable = paramsForInteractivity.enable;
      if(paramsForInteractivity.mouse){
        if(paramsForInteractivity.mouse.distance) pJS.interactivity.mouse.distance = paramsForInteractivity.mouse.distance;
      }
      if(paramsForInteractivity.detect_on) pJS.interactivity.detect_on = paramsForInteractivity.detect_on;
      if(paramsForInteractivity.mode) pJS.interactivity.mode = paramsForInteractivity.mode;
      if(paramsForInteractivity.line_linked){
        if(paramsForInteractivity.line_linked.opacity) pJS.interactivity.line_linked.opacity = paramsForInteractivity.line_linked.opacity;
      }
      if(paramsForInteractivity.events){
        var paramsForEvents = paramsForInteractivity.events;
        if(paramsForEvents.onclick){
          var paramsForOnclick = paramsForEvents.onclick;
          if(paramsForOnclick.enable == false) pJS.interactivity.events.onclick.enable = false;
          if(paramsForOnclick.mode != 'push') pJS.interactivity.events.onclick.mode = paramsForOnclick.mode;
          if(paramsForOnclick.nb) pJS.interactivity.events.onclick.nb = paramsForOnclick.nb;
        }
      }
    }
    pJS.retina_detect = params.retina_detect;
  }


  pJS.particles.color_rgb = hexToRgb(pJS.particles.color);
  pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);


  if(pJS.retina_detect && window.devicePixelRatio > 1){
    pJS.retina = true;
  
    pJS.canvas.pxratio = window.devicePixelRatio
    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;
    pJS.particles.anim.speed = pJS.particles.anim.speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.particles.line_linked.distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width = pJS.particles.line_linked.width * pJS.canvas.pxratio;
    pJS.interactivity.mouse.distance = pJS.interactivity.mouse.distance * pJS.canvas.pxratio;
  }




  pJS.fn.canvasInit = function(){
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function(){
    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    window.onresize = function(){
      if(pJS){
        pJS.canvas.w = pJS.canvas.el.offsetWidth;
        pJS.canvas.h = pJS.canvas.el.offsetHeight;


        if(pJS.retina){
          pJS.canvas.w *= pJS.canvas.pxratio;
          pJS.canvas.h *= pJS.canvas.pxratio;
        }

        pJS.canvas.el.width = pJS.canvas.w;
        pJS.canvas.el.height = pJS.canvas.h;


        pJS.fn.canvasPaint();
        if(!pJS.particles.anim.enable){
          pJS.fn.particlesRemove();
          pJS.fn.canvasRemove();
          launchParticles();
        }
      }
    }
  };

  pJS.fn.canvasPaint = function(){
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasRemove = function(){
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  }




  pJS.fn.particle = function(color, opacity, position){


    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;


    this.radius = (pJS.particles.size_random ? Math.random() : 1) * pJS.particles.size;
    if (pJS.retina) this.radius *= pJS.canvas.pxratio;


    this.color = color;


    this.opacity = opacity;


    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();


    this.draw = function(){
      pJS.canvas.ctx.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.opacity+')';
      pJS.canvas.ctx.beginPath();

      switch(pJS.particles.shape){
        case 'circle':
          pJS.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        break;

        case 'edge':
          pJS.canvas.ctx.rect(this.x, this.y, this.radius*2, this.radius*2);
        break;

        case 'triangle':
          pJS.canvas.ctx.moveTo(this.x,this.y-this.radius);
          pJS.canvas.ctx.lineTo(this.x+this.radius,this.y+this.radius);
          pJS.canvas.ctx.lineTo(this.x-this.radius,this.y+this.radius);
          pJS.canvas.ctx.closePath();
        break;
      }

      pJS.canvas.ctx.fill();
    }

  };

  pJS.fn.particlesCreate = function(){
    for(var i = 0; i < pJS.particles.nb; i++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color_rgb, pJS.particles.opacity));
    }
  };

  pJS.fn.particlesAnimate = function(){
    for(var i = 0; i < pJS.particles.array.length; i++){
     
      var p = pJS.particles.array[i];

     
      p.x += p.vx * (pJS.particles.anim.speed/2);
      p.y += p.vy * (pJS.particles.anim.speed/2);

      
      if(p.x - p.radius > pJS.canvas.w) p.x = p.radius;
      else if(p.x + p.radius < 0) p.x = pJS.canvas.w + p.radius;
      if(p.y - p.radius > pJS.canvas.h) p.y = p.radius;
      else if(p.y + p.radius < 0) p.y = pJS.canvas.h + p.radius;

      
      for(var j = i + 1; j < pJS.particles.array.length; j++){
        var p2 = pJS.particles.array[j];

        
        if(pJS.particles.line_linked.enable_auto){
          pJS.fn.vendors.distanceParticles(p,p2);
        }

        
        if(pJS.interactivity.enable){

          
          switch(pJS.interactivity.mode){
            case 'grab':
              pJS.fn.vendors.interactivity.grabParticles(p,p2);
            break;
          }

        }


      }
    }
  };

  pJS.fn.particlesDraw = function(){
    
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

    
    pJS.fn.particlesAnimate();

    
    for(var i = 0; i < pJS.particles.array.length; i++){
      var p = pJS.particles.array[i];
      p.draw('rgba('+p.color.r+','+p.color.g+','+p.color.b+','+p.opacity+')');
    }

  };

  pJS.fn.particlesRemove = function(){
    pJS.particles.array = [];
  };




  pJS.fn.vendors.distanceParticles = function(p1, p2){

    var dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx*dx + dy*dy);


    if(dist <= pJS.particles.line_linked.distance) {


      var color_line = pJS.particles.line_linked.color_rgb_line;
      pJS.canvas.ctx.beginPath();
      pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+ (pJS.particles.line_linked.opacity-dist/pJS.particles.line_linked.distance) +')';
      pJS.canvas.ctx.moveTo(p1.x, p1.y);
      pJS.canvas.ctx.lineTo(p2.x, p2.y);
      pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
      pJS.canvas.ctx.stroke();
      pJS.canvas.ctx.closePath();


      if(pJS.particles.line_linked.condensed_mode.enable){
        var dx = p1.x - p2.x,
            dy = p1.y - p2.y,
            ax = dx/(pJS.particles.line_linked.condensed_mode.rotateX*1000),
            ay = dy/(pJS.particles.line_linked.condensed_mode.rotateY*1000);
        p2.vx += ax;
        p2.vy += ay;
      }

    }
  };

  pJS.fn.vendors.interactivity.listeners = function(){


    if(pJS.interactivity.detect_on == 'window'){
      var detect_el = window;
    }else{
      var detect_el = pJS.canvas.el;
    }


    detect_el.onmousemove = function(e){

      if(detect_el == window){
        var pos_x = e.clientX,
            pos_y = e.clientY;
      }
      else{
        var pos_x = e.offsetX||e.clientX,
            pos_y = e.offsetY||e.clientY;
      }

      if(pJS){

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if(pJS.retina){
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';
      }

    };


    detect_el.onmouseleave = function(e){

      if(pJS){
        pJS.interactivity.mouse.pos_x = 0;
        pJS.interactivity.mouse.pos_y = 0;
        pJS.interactivity.status = 'mouseleave';
      }

    };


    if(pJS.interactivity.events.onclick.enable){
      switch(pJS.interactivity.events.onclick.mode){
        case 'push':
          detect_el.onclick = function(e){
            if(pJS){
              for(var i = 0; i < pJS.interactivity.events.onclick.nb; i++){
                pJS.particles.array.push(
                  new pJS.fn.particle(
                    pJS.particles.color_rgb,
                    pJS.particles.opacity,
                    {
                      'x': pJS.interactivity.mouse.pos_x,
                      'y': pJS.interactivity.mouse.pos_y
                    }
                  )
                )
              }
            }
          }
        break;

        case 'remove':
          detect_el.onclick = function(e){
            pJS.particles.array.splice(0, pJS.interactivity.events.onclick.nb);
          }
        break;
      }
    }
  };


  pJS.fn.vendors.interactivity.grabParticles = function(p1, p2){
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    var dx_mouse = p1.x - pJS.interactivity.mouse.pos_x,
        dy_mouse = p1.y - pJS.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

   
    if(dist <= pJS.particles.line_linked.distance && dist_mouse <= pJS.interactivity.mouse.distance && pJS.interactivity.status == 'mousemove'){

      var color_line = pJS.particles.line_linked.color_rgb_line;
      pJS.canvas.ctx.beginPath();
      pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+ (pJS.interactivity.line_linked.opacity-dist_mouse/pJS.interactivity.mouse.distance) +')';
      pJS.canvas.ctx.moveTo(p1.x, p1.y);
      pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
      pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
      pJS.canvas.ctx.stroke();
      pJS.canvas.ctx.closePath();
    }
  };

  pJS.fn.vendors.destroy = function(){
    cancelAnimationFrame(pJS.fn.requestAnimFrame);
    canvas_el.remove();
    delete pJS;
  };




  function launchParticles(){
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.particlesDraw();
  };


  function launchAnimation(){
    pJS.fn.particlesDraw();
    pJS.fn.requestAnimFrame = requestAnimFrame(launchAnimation);
  };


  launchParticles();

  if(pJS.particles.anim.enable){
    launchAnimation();
  }

  if(pJS.interactivity.enable){
    pJS.fn.vendors.interactivity.listeners();
  }


};


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();

function hexToRgb(hex){

  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};




window.particlesJS = function(tag_id, params){

  
  if(typeof(tag_id) != 'string'){
    params = tag_id;
    tag_id = 'particles-js';
  }


  if(!tag_id){
    tag_id = 'particles-js';
  }


  var canvas_el = document.createElement('canvas');


  canvas_el.style.width = "100%";
  canvas_el.style.height = "300%";


  var canvas = document.getElementById(tag_id).appendChild(canvas_el);


  if(canvas != null){
    launchParticlesJS(tag_id, params);
  }

};