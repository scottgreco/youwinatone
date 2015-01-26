(function($){function debounce(func,wait,immediate){var timeout,args,context,timestamp,result;return function(){context=this;args=arguments;timestamp=new Date();var later=function(){var last=(new Date())-timestamp;if(last<wait){timeout=setTimeout(later,wait-last);}else{timeout=null;if(!immediate)result=func.apply(context,args);}};var callNow=immediate&&!timeout;if(!timeout){timeout=setTimeout(later,wait);}
if(callNow)result=func.apply(context,args);return result;};}
$.fn.scrollsnap=function(options){var settings=$.extend({'direction':'y','snaps':'*','proximity':702,'offset':0,'duration':200,'latency':100,'easing':'swing','onSnapEvent':'scrollsnap','onSnap':function($snappedElement){},'onSnapWait':5},options);var leftOrTop=settings.direction==='x'?'Left':'Top';return this.each(function(){var scrollingEl=this,$scrollingEl=$(scrollingEl);if(scrollingEl['scroll'+leftOrTop]!==undefined){$scrollingEl.css('position','relative');$scrollingEl.bind('scrollstop',{latency:settings.latency},function(e){var matchingEl=null,matchingDy=settings.proximity+1;$scrollingEl.find(settings.snaps).each(function(){var snappingEl=this,dy=Math.abs(snappingEl['offset'+leftOrTop]+settings.offset-scrollingEl['scroll'+leftOrTop]);if(dy<=settings.proximity&&dy<matchingDy){matchingEl=snappingEl;matchingDy=dy;}});if(matchingEl){var endScroll=matchingEl['offset'+leftOrTop]+settings.offset,animateProp={};animateProp['scroll'+leftOrTop]=endScroll;if($scrollingEl['scroll'+leftOrTop]()!=endScroll){$scrollingEl.animate(animateProp,settings.duration,settings.easing,debounce(function(){var $matchingEl=$(matchingEl);if(settings.onSnap){settings.onSnap($matchingEl);}
$matchingEl.trigger(settings.onSnapEvent);},settings.onSnapWait));}}});}else if(scrollingEl.defaultView){var handler=function(e){var matchingEl=null,matchingDy=settings.proximity+1;$scrollingEl.find(settings.snaps).each(function(){var snappingEl=this,$snappingEl=$(snappingEl),dy=Math.abs(($snappingEl.offset()[leftOrTop.toLowerCase()]+settings.offset)-scrollingEl.defaultView['scroll'+settings.direction.toUpperCase()]);if(dy<=settings.proximity&&dy<matchingDy){matchingEl=snappingEl;matchingDy=dy;}});if(matchingEl){var $matchingEl=$(matchingEl),endScroll=$matchingEl.offset()[leftOrTop.toLowerCase()]+settings.offset,animateProp={};animateProp['scroll'+leftOrTop]=endScroll;if($scrollingEl['scroll'+leftOrTop]()!=endScroll){$('html, body').animate(animateProp,settings.duration,settings.easing,debounce(function(){if(settings.onSnap){settings.onSnap($matchingEl);}
$matchingEl.trigger(settings.onSnapEvent)},settings.onSnapWait));}}};$scrollingEl.bind('scrollstop',{latency:settings.latency},handler);$(window).bind('resize',{latency:settings.latency},handler);}});};})(jQuery);