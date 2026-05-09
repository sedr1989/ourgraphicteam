// تأثير الكتابة المتكرر (typing effect)
const typeElem = document.getElementById('typing-text');
const phrase = "تصميم غرافيك | نحول الأفكار بلمسة إبداعية";
let i = 0;
let isDeleting = false;

function typeText() {
  if (isDeleting) {
    typeElem.innerHTML = phrase.substring(0, i - 1);
    i--;
  } else {
    typeElem.innerHTML = phrase.substring(0, i + 1);
    i++;
  }

  let typeSpeed = isDeleting ? 70 : 130;

  if (!isDeleting && i === phrase.length) {
    isDeleting = true;
    typeSpeed = 2500; // وقفة طويلة قبل المسح
  } else if (isDeleting && i === 0) {
    isDeleting = false;
    typeSpeed = 500; // وقفة قصيرة قبل إعادة الكتابة
  }

  setTimeout(typeText, typeSpeed);
}

typeText();

// دوال تحريك المعرض (gallery)
function move(id, direction) {
  const el = document.getElementById(id + '-scroll');
  if (el) {
    el.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' });
  }
}

function updateCount(id) {
  const el = document.getElementById(id + '-scroll');
  const idxSpan = document.getElementById(id + '-idx');
  if (el && idxSpan) {
    const step = Math.round(Math.abs(el.scrollLeft) / el.clientWidth);
    const totalImages = el.children.length;
    idxSpan.innerText = (step + 1) + " / " + totalImages;
  }
}

// تحديث العداد عند تحميل الصفحة
window.addEventListener('load', () => {
  const galleries = ['print', 'identity', 'logos', 'social'];
  galleries.forEach(id => {
    updateCount(id);
  });
});
/*ضفتو جديد*/
/*window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash');
        if(splash) {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
            }, 800);
        }
    }, 1000); // سيبقى ظاهراً لمدة ثانيتين ونصف
});*/
/*تعديل عليه مشان اذا علق القلب يختفي */
function hideSplash() {
    const splash = document.getElementById('splash');
    if (splash) {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            // تشغيل تأثير الكتابة وظهور الأقسام بعد اختفاء القلب
            if (typeof typeEffect === "function") typeEffect(); 
            if (typeof revealOnScroll === "function") revealOnScroll();
        }, 800);
    }
}

// الطريقة الأولى: عند اكتمال تحميل الصفحة
window.addEventListener('load', hideSplash);

// الطريقة الثانية: مؤقت احتياطي (بعد 4 ثوانٍ يختفي مهما حدث)
setTimeout(hideSplash, 2000);

/* اضافة تاثير تمرير عند السحب */
// وظيفة مراقبة التمرير لتفعيل كلاس active
function revealOnScroll() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight; // ارتفاع الشاشة
    var elementTop = reveals[i].getBoundingClientRect().top; // بعد العنصر عن الأعلى
    var elementVisible = 100; // متى يبدأ بالظهور (بكسل)

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

// تشغيل الوظيفة عند التمرير
window.addEventListener("scroll", revealOnScroll);

// تشغيلها فوراً عند تحميل الصفحة (للأقسام التي تظهر في البداية)
revealOnScroll();
/*كود جافا */
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

// فتح وإغلاق القائمة عند الضغط على الأيقونة
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // تغيير شكل الأيقونة من قضبان إلى X
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// إغلاق القائمة تلقائياً عند الضغط على أي رابط (الرئيسية، أعمالنا، إلخ)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});
