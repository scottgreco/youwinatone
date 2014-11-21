/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

(function($) {

  $.fn.unveil = function(threshold, callback) {

    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina? "data-src-retina" : "data-src",
        images = this,
        loaded;

    if(navigator.userAgent.match(/Safari/) && !navigator.userAgent.match(/Chrome/))
      attrib = "data-src";

    this.one("unveil", function() {
      var source = this.getAttribute(attrib);
      source = source || this.getAttribute("data-src");
      if (source) {
    	  var self = this;
          if (self.tagName === "IMG") {
            self.setAttribute("src", source);
          } else {
            self.style["backgroundImage"] = "url('" + source + "')";
          }
          $(self).data('loaded', true);
          if (typeof callback === "function") callback.call(self);
      }
    });

    function unveil() {
      var inview = images.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;

        var wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
      setTimeout(function(){
          images.trigger('unveil');
      }, 1000);
    }

    /*
    $w.scroll(unveil);
    $w.resize(unveil);
    */

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);