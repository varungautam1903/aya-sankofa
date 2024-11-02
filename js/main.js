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
  setTimeout(function () {
    $(".page-loader").fadeOut("slow");
  }, 1200);


  let lang = localStorage.getItem("lang");
  if (lang != null) {
    changeLanguage(lang);
  } else {
    changeLanguage(document.documentElement.lang);
  }
});

new WOW({
  boxClass: 'wow',      // animated element css class (default is wow)
  animateClass: 'animate__animated', // default animation class
  offset: 2,          // distance to start the animation (0 = immediate)
  mobile: true,       // trigger animations on mobile devices
  live: true        // act on asynchronously loaded content
}).init();

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
  // const langData = loadJson();

  const langData = await returnJsonData(
    `https://aya-sankofa.netlify.app/lang/${lang}.json`
  );
  updateContent(langData);
}

// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.innerHTML = langData[key];
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

function loadJson() {
  return {
    welcome: "Welcome to",
    aya: "Aya",
    sankofa: "Sankofa",
    therapy: "Therapy",
    question: "What does « Aya Sankofa » mean?",
    answer1:
      "Originally from Ghana, in Akan: Aya represents endurance, independence and perseverance. Sankofa represents the wisdom of learning from the past to build for the future, I believe that through perseverance you can gain wisdom by learning from your past, enabling you to heal and to build the future that you want.",
    answer2:
      "You are the author of your own story, and my intention is to assist you in creating it.",
    aboutName1: "M",
    aboutName2: "yrielle",
    aboutDesc:
      "I am a counsellor and Integrative Psychotherapist in training offering counselling in Birmingham (UK) or online.",
    aboutMe: "About me",
    aboutMeDesc:
      "<span>W</span>e live in a multicultural society that enables us to be in contact with a variety of cultures enriching our lives perspectives. However, the benefits can also initiate challenges. <br> Coming from a Caribbean heritage and as a first-generation French born, who is now living in Britain, sometimes I find myself saying that I am from nowhere and everywhere at the same time. Juggling between different cultures and multiple languages can lead to difficulties in understanding our identity and finding a sense of belonging. My unique firsthand perspective allows me to understand various aspects of diversity and appreciate what the real experience of belonging to several dimensions of diversity can be like. <br> My area of interest is intergenerational trauma, within families or communities, in which effects of trauma are passed down between generations. Counselling then, offers support to understand what drives their behaviors and negative cycles. As Dr. Gabor Maté says:",
    aboutMeDesc2:
      "“Trauma is the invisible force that shapes our lives. It shapes the way we live, the way we love and the way we make sense of the world. It is the root of our deepest wounds.”",
    work: "How I Work",
    work1:
      "<i>Integratively</i>, using different therapeutic models to explore your past and present to help you move forward and support you to achieve your goals.",
    work2:
      "<i>Relationally</i>, we will work together to build a therapeutic alliance to unmask and remove the labels given by family and friends. Sometimes our closest relationships fail to give us what we need, and I believe that building a positive relationship in therapy can aid personal growth and healing.",
    work3:
      "<i>Equitably</i>, in my work I see people from all walks of life. Regardless of where they are situated in their adulthood stage of life, offering a caring, accepting and uncritical space.",
    work4:
      "<i>Weekly</i> consistency is fundamental in the development of the therapeutic relationship and increases the benefits of therapy.",
    experience: "My Experiences",
    experience1:
      "I have an understanding of the challenges face by individuals engaging into therapy, ranging from supporting people who desire to have a better understanding of themselves to exploring the things that drive their behaviors or negative cycles.",
    experience2:
      "I have principally worked with people who have experienced sexual and physical abuse, domestic violence, and childhood traumas. I have also supported people struggling to understand their gender identity",
    online: "Online counselling",
    facetoface: "Face-To-Face",
    counselling:
      "<i>Face to Face in Kings Norton, Birmingham</i> <br> I offer a limited number of slots at a reduced rate for those who are in most need of more affordable therapy. Please get in touch with me for further details. <br> Please note that I only have online availability at the moment.<br> Session lasts 50 minutes",
    "therapy-sankofa": "THERAPY AT AYA SANKOFA",
    "therapy-info":
      "Within my practice, I use 3 major traditions as a therapist; Gestalt, Psychodynamic and Cognitive Behavioral therapy (CBT).",
    "therapy-title1": "Gestalt therapy",
    "therapy-desc1":
      "Gestalt helps you gain a better understanding of how your emotional and physical needs are connected. You will learn the awareness of how the present moment leads to an understanding of behaviors and feelings. Overall, it helps you to be more confident and aware of yourself.",
    "therapy-title2": "Psychodynamic therapy",
    "therapy-desc2":
      "Psychodynamic helps you understand how your past, and in particular how your childhood, influences your current way of being. It also helps us to analyse the defence mechanism you are using to avoid painful feelings and experiences.",
    about_us: "Learn more about us...",
    "therapy-title3": "CBT",
    "therapy-desc3":
      "CBT offers a useful toolkit and practical ways of coping with the world.",
    motivation: "AYA SANKOFA MOTIVATIONS AND VALUES",
    "motivation-title1": "Acceptance and Inclusivity",
    "motivation-desc1":
      "“Society has a tendency to issue labels that sometimes can lead to rejection and inadequacy. Therefore, it is very important at Aya Sankofa to provide all clients a space full of acceptance, where they can be their True self. ”",
    "motivation-title2": "Patience and Diligence",
    "motivation-desc2":
      "“Some experiences of life can be difficult to talk about, and sometimes an individual can feel pressured to speak quickly (too quickly sometimes). Aya Sankofa aims to be patient and let you unravel your story at your own pace by carefully and persistently working with you.”",
    "motivation-title3": "Personal narrative",
    "motivation-desc3":
      "“So many times, in life, people add their personal lived experiences into our own stories. Hence why, with Aya Sankofa, when working with clients the intent is to have them tell their stories, see the world through their eyes and a glimpse into their lives.”",
    "motivation-title4": "Individual Growth and Development",
    "motivation-desc4":
      "“The individual growth and development of our clients is paramount, therefore, if our clients goals no longer align with our way of practicing, you will be recommended or referred to other service to better serve your needs.”",
    started: "GET STARTED",
    started1:
      "Get in touch to set up your free 15-minute consultation call. This call will allow you to ask any questions you may have.",
    started2:
      "First session after consultation, we will go into depth about your therapeutic goals. Gaining a better understanding of the problems you're having and how I can adequately help or support you.",
    started3: "Commit to agreed sessions.",
    benefits: "What are the benefits of online therapy?",
    "benefits-title1": "Accessibility",
    "benefits-desc1":
      "Compared to traditional face-to-face counselling, online therapy is significantly more accessible. For people who face disease, or disabilities, it can be a lifeline. It's also a great backup plan in case something unforeseen occurs.",
    "benefits-title2": "Flexibility",
    "benefits-desc2":
      "You can take part in online therapy from almost anywhere. All you need is a confidential space and access to the Internet.",
    "benefits-title3": "Confidentiality",
    "benefits-desc3":
      "Given that mental health is receiving a lot more attention, some people are still ashamed to ask for support. The thought of being seen entering a counsellor office or of others finding out that you are receiving counselling can be eliminated with online therapy.",
    "benefits-title4": "There is no commute",
    "benefits-desc4":
      "Since you don't have to travel far to see your counsellor, you can save lots of time and money. You won't have to worry about parking, traffic, or public transports schedules, which will make you more at ease and able to participate in therapy.",
    footer_text: "© 2023 All rights reserved.",
  };
}
