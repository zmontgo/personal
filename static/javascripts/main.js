"use strict";

const main = document.getElementById("main");
const scrolled = document.getElementById("scrolled");

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.body.classList.remove("scrolled")
    } else {
      document.body.classList.add("scrolled")
    }
  })
}
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0
}

const scollObserver = new IntersectionObserver(callback, options)
scollObserver.observe(scrolled)

document.body.onload = setTimeout(function() {
  if (window.pageYOffset >= 10) {
    document.body.className="scrolled";
  } else {
    document.body.className = "";
  }
} ,800);

function addClass(A){document.documentElement.classList.add(A)}var avif=new Image;function check_webp_feature(a){var e=new Image;e.onload=function(){var A=0<e.width&&0<e.height;a(A)},e.onerror=function(){a(!1)},e.src="data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=="}avif.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",avif.onload=function(){addClass("avif")},avif.onerror=function(){check_webp_feature(function(A){return addClass(A?"webp":"fallback")})};