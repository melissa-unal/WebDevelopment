"use strict";

function f() {
  var elem = document.getElementById("toggle_body_background");
  document.body.className = document.body.className == "light" ? "dark" : "light";
  localStorage.setItem("theme", document.body.className);
  elem.className = elem.className == "far fa-moon" ? "far fa-sun" : "far fa-moon";
  localStorage.setItem("button", elem.className);
}

function checkTheme() {
  var localStorageTheme = localStorage.getItem("theme");

  if (localStorageTheme != null && localStorageTheme == "dark") {
    document.body.className = localStorageTheme;
  }

  if (localStorageTheme != null && localStorageTheme == "light") {
    document.body.className = localStorageTheme;
  }
}

function checkButton() {
  var elem = document.getElementById("toggle_body_background");
  var localStorageButton = localStorage.getItem("button");

  if (localStorageButton != null) {
    elem.className = localStorageButton;
  }
}

window.addEventListener("load", function () {
  checkTheme();
  checkButton();
  var linksMenu = document.querySelectorAll("ul.menu a");
  var location = window.location.pathname;
  location = location == "/" ? "/index.html" : location;
  var lochash = window.location.hash;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = linksMenu[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var link = _step.value;
      link.style.backgroundColor = "black";

      if (link.href.endsWith(location)) {
        link.style.backgroundColor = "grey";
      }

      link.addEventListener("click", function () {
        var chMenu = document.getElementById("ch-menu");
        chMenu.checked = false;
        var chSubmenu = document.getElementsByClassName("ch-submenu");
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = chSubmenu[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var chs = _step3.value;
            chs.checked = false;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var linkuriInterne = document.querySelectorAll("a[href*='#']");
  console.log(linkuriInterne.length);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = linkuriInterne[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var lnk = _step2.value;
      var paghref = lnk.href.substring(lnk.href.lastIndexOf("/"), lnk.href.lastIndexOf("#"));
      var locationhref = window.location.href;
      var paglocation = locationhref.substring(locationhref.lastIndexOf("/"), locationhref.lastIndexOf("#"));
      if (paglocation == paghref) lnk.addEventListener("click", clickLink);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var idIntervalPlimbare = -1;

  function clickLink(ev) {
    ev.preventDefault();
    clearInterval(idIntervalPlimbare);
    var ch;
    var lnk = ev.currentTarget;
    var coordScroll;
    var poz = lnk.href.indexOf("#");
    var idElemScroll = lnk.href.substring(poz + 1);

    if (idElemScroll == "") {
      coordScroll = 0;
    } else {
      coordScroll = getOffsetTop(document.getElementById(idElemScroll));
    }

    var distanta = coordScroll - document.documentElement.scrollTop;
    console.log(distanta);
    pas = distanta < 0 ? -20 : 20;
    idIntervalPlimbare = setInterval(plimba, 10, pas, coordScroll, lnk.href.substring(lnk.href.lastIndexOf("#") + 1));
  }

  function getOffsetTop(elem) {
    var rez = elem.offsetTop;

    while (elem.offsetParent && elem.offsetParent != document.body) {
      elem = elem.offsetParent;
      rez += elem.offsetTop;
    }

    return rez;
  }

  function plimba(pas, coordScroll, href) {
    scrollVechi = document.documentElement.scrollTop;
    document.documentElement.scrollTop += pas;

    if (pas > 0 && coordScroll <= document.documentElement.scrollTop || pas < 0 && coordScroll >= document.documentElement.scrollTop || scrollVechi == document.documentElement.scrollTop) {
      clearInterval(idIntervalPlimbare);
      window.location.hash = href;
    }
  }
});