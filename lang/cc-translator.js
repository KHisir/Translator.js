"use strict";

/**
 * Object for localization. It uses empty span-tags with the 'data-ml' attribute
 * and fill these with the localized content. The value of 'data-ml' is used as
 * key for the localized string... second change
 */
var lang = {};

var languages = {
  DE: "de",
  EN: "en",
};

/**
 * current visible language.
 */
lang.current;

/**
 * Change the language of all pages to the given language.
 *
 * @author Kalender Hisir
 * @param language {String} new language as two-character-code
 */
lang.change = function (language) {
  var tagList = ["html","base","head","style","title","address","article","footer","header","h1","h2","h3","h4","h5","h6","hgroup","nav","section","dd","div","dl","dt","figcaption","figure","hr","li","main","ol","p","pre","ul","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","rtc","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","area","audio","map","track","video","embed","object","param","source","canvas","noscript","script","del","ins","caption","col","colgroup","table","tbody","td","tfoot","th","thead","tr","button","datalist","fieldset","form","input","keygen","label","legend","meter","optgroup","option","output","progress","select","details","dialog","menu","menuitem","summary","content","element","shadow","template","acronym","applet","basefont","big","blink","center","dir","frame","frameset","isindex","listing","noembed","plaintext","spacer","strike","tt","xmp"]

  for (let i = 0; i < tagList.length; i++) {
    document.querySelectorAll(tagList[i] + "[data-ml]").forEach((elem) => {
      elem.innerText =
        lang[language][elem.getAttribute("data-ml").toLowerCase()];
    });
  }

  document.querySelectorAll("input[data-ml]").forEach((elem) => {
    elem.setAttribute(
      "placeholder",
      lang[language][elem.getAttribute("data-ml").toLowerCase()]
    );
  });

  this.current = language;
};

/**
 * get the localized String of the given key for the current used language. The
 * key is NOT case-sensitive.
 *
 * @author Kalender Hisir
 * @param key i18n-key of the String.
 * @returns localized String.
 */
lang.getText = function (key) {
  if (lang.current === undefined) {
    identifyBrowserLanguage();
  }

  if (typeof key !== "string") {
    console.log(
      "ERROR: lang.getText need a 'string' and not a '" +
        typeof key +
        "' as parameter!"
    );
    return "";
  }
  return lang[this.current][key.toLowerCase()];
};

/**
 * Load localized content by using the device-default language or using the
 * app-default language if it's not available.
 *
 * @author Kalender Hisir
 */
 document.addEventListener("DOMContentLoaded", function() { 
   // console.log("DEBUG: fill all multilanguage tags with localized content");
   var ln = navigator.language;
   if (ln) {
     ln = ln.substr(0, 2);
   } else {
     ln = "";
   }
   if (typeof lang[ln] == "undefined") {
     ln = languages.EN; // default language
   }
   lang.change(ln);
 });
