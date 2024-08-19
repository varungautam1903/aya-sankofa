// $(document).ready(function () {
//   /* Navigation burger onclick side navigation show */
//   $(".burger-container").on("click", function () {
//     $(".main-navigation").toggle("slow");

//     if ($("#myBtn").hasClass("change")) {
//       // $("body").addClass("stop-scroll");
//     } else {
//       $("body").removeClass("stop-scroll");
//     }
//   });
// });

$(document).ready(function () {
  let lang = localStorage.getItem("lang");
  if (lang != null) {
    changeLanguage(lang);
  } else {
    changeLanguage(document.documentElement.lang);
  }
});

var counta = 0;
$(window).scroll(function (e) {
  /* Onscroll number counter */
  var statisticNumbers = $(".single-count");
  if (statisticNumbers.length) {
    var oTop = statisticNumbers.offset().top - window.innerHeight;
    if (counta == 0 && $(window).scrollTop() > oTop) {
      $(".count").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },

          {
            duration: 2000,
            easing: "swing",
            step: function () {
              $this.text("£" + Math.floor(this.countNum));
            },
            complete: function () {
              $this.text("£" + this.countNum);
            },
          }
        );
      });
      counta = 1;
    }
  }
});

// Function to change language
async function changeLanguage(lang) {
  // setLanguagePreference(lang);
  localStorage.setItem("lang", lang);

  const langData = await returnJsonData(
    `https://aya-sankofa.netlify.app/lang/${lang}.json`
  );
  updateContent(langData);
}

// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = langData[key];
  });
}

// This mthod will return the JSON
const returnJsonData = async (url) => {
  const jsonData = await jsonFileReader(url);
  return JSON.parse(jsonData);
};

// Method which actually read json using XMLHttpRequest and promise
const jsonFileReader = async (path) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", path, true);
    request.responseType = "blob";
    request.onload = () => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (err) => reject(err);
      reader.readAsText(request.response);
    };

    request.send();
  });
};
