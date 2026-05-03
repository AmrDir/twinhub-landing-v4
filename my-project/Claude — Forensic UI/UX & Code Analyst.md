
📋 تقرير التحليل الجنائي التصميمي
موقع TwinHub Media & AI Center — localhost:5173
تاريخ التحليل: 29 أبريل 2026 | المحلل: Claude (Forensic UI/UX Analyst)

🔴 بطاقة العمل — ملخص الأخطاء الحرجة

🟥 BUG #1 — صورة معطوبة تُستخدم لعرض فيديو (خطأ منطقي)
الموقع: #gallery → Featured Slider
الملف: /gallery/work3.mp4
الوصف: تم استخدام ملف .mp4 كـ <img src> بدلاً من <video> أو <source>. هذا يجعل العنصر يُعرض فارغاً وأسود تماماً بدون أي محتوى مرئي.
الكود الخاطئ: <img src="/gallery/work3.mp4" alt="Featured" />
الحل: استبدله بـ <video src="/gallery/work3.mp4" autoplay muted loop /> أو استخدم صورة thumbnail بديلة.

🟥 BUG #2 — 14 صورة مكسورة (404 Not Found)
التوزيع حسب القسم:
القسمالملفات المعطوبة#gallery (Featured Slider)/gallery/work0.jpg, /gallery/work3.mp4, /gallery/work6.jpg, /gallery/work11.jpg#gallery (Grid Items)/gallery/work0.jpg, /gallery/work6.jpg, /gallery/work11.jpg#clients (Carousel)/backgrounds/clients/10.jpg, /backgrounds/clients/12-76816d4.jpg, /backgrounds/clients/logo.png (تتكرر مرتين)#about (Background)/backgrounds/clients/about-bg.png
النتيجة المرئية: مستطيلات سوداء فارغة في الـ Featured Slider، وفراغات في الـ Clients Carousel، وفقدان صورة الخلفية في قسم About.

🟥 BUG #3 — ضعف Contrast شديد في قسم About
الموقع: #about — عناوين h2 و h3
المشكلة: الـ About section تحتوي على bg-white + صورة خلفية مكسورة + overlay bg-black بـ opacity: 0.94. هذا يجعل الخلفية الفعلية ≈ rgb(15, 15, 15) (شبه سوداء).
في نفس الوقت، العناوين تحمل class text-gray-900 = rgb(17, 24, 39) (رمادي داكن جداً).
النتائج المقيسة:

luminance النص: 24
luminance الخلفية: 15
نسبة التباين الفعلية: 1.54 : 1
متطلب WCAG AA: 4.5 : 1
الحكم: ❌ فشل كامل في معيار إمكانية الوصول

العناصر المتأثرة: "About TwinHub" و "What We Do" كعناوين رئيسية.
الحل: تغيير text-gray-900 إلى text-white لجميع العناوين داخل #about، أو تقليل opacity الـ overlay إلى 0.6-0.7.

🟧 BUG #4 — Inheritance خاطئ للـ color: black على الـ <ul> elements
الموقع: #services, #products
المشكلة: عناصر <ul> ترث لون النص من html و body وهو rgb(0, 0, 0). رغم أن <li> الفعلية تأخذ لوناً صريحاً (text-gray-400)، إلا أن الـ CSS specificity يمكن أن يسبب تعارضاً في حالات معينة.
الحل: إضافة text-white أو text-gray-400 مباشرة على عناصر <ul> لمنع الـ inheritance غير المقصود.

🟧 BUG #5 — Custom Scrollbar يظهر فوق المحتوى (مشكلة تصميمية)
الموقع: عموم الصفحة (right edge)
المشكلة: الـ Custom Scrollbar الأحمر بعرض 8px يظهر دائماً مرئياً حتى على الصفحات الداكنة، ويسبب تضييقاً في المحتوى.
css::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-thumb { background: rgb(220, 38, 38); }
الملاحظة: هذا مقصود فنياً كجزء من هوية العلامة التجارية، لكن يجب التأكد من عدم تغطيته على عناصر مهمة.

🟨 BUG #6 — CSS مُضمَّن داخل JSX Component (ممارسة برمجية سيئة)
الموقع: #clients component
المشكلة: وجود <style> tag مُدمج مباشرة داخل مكوّن React بدلاً من استخدام Tailwind أو CSS module.
css/*داخل JSX مباشرة - BAD PRACTICE*/
@keyframes infinite-scroll { ... }
.animate-infinite-scroll { animation: infinite-scroll 40s linear infinite; }
المشاكل الناجمة:

يُعيد إنشاء قاعدة CSS في كل render
لا يُستفاد من Tailwind's JIT
يصعب الصيانة والتعديل

الحل: نقل هذه الـ keyframes إلى ملف globals.css أو tailwind.config.js كـ custom animation.

🟨 BUG #7 — زر الـ Hamburger Menu بدون aria-label
الموقع: Header — Mobile Menu Button
المشكلة: زر القائمة للشاشات الصغيرة (Hamburger) ليس له aria-label، مما يجعله غير قابل للوصول لمستخدمي قارئات الشاشة.
html<!-- قبل الإصلاح -->
<button class="p-2 rounded-md ..."> <svg>...</svg> </button>

<!-- بعد الإصلاح -->
<button class="p-2 rounded-md ..." aria-label="Toggle Navigation Menu">

🟨 BUG #8 — "Start Your Project" زر Hero بدون aria-label وبخلفية شفافة
الموقع: #hero — ثاني زر CTA
المشكلة: الزر يستخدم class btn-secondary مع background: transparent وبدون aria-label. على خلفية الـ Hero الداكنة يبدو جيداً، لكن على خلفيات أخرى سيكون مشكلة.

🟨 BUG #9 — "20+" stat مفقود كـ <h2> أو heading
الموقع: #about — إحصائيات "20+ Years of Art"
المشكلة: الـ DOM يُظهر أن "20+" مُدمج كـ <generic> (div عادي) بدلاً من <h3> مثل الإحصائيات الأخرى (150+, 100+, 99%). هذا يكسر التسلسل الهرمي للـ heading.

🟩 ملاحظات إيجابية (ما يعمل جيداً)

الـ Hero video يعمل بشكل ممتاز من /backgrounds/hero/hero-bg.mp4
الـ typing animation (WE CREATE) يعمل ويغيّر النص بشكل صحيح
الـ Services cards لها ألوان نص صحيحة (white/gray-300)
الـ Contact Form بنيته صحيحة مع hidden form-name
الـ Footer معلوماته كاملة وصحيحة
WhatsApp floating button يعمل مع aria-label صحيح
الـ Language button يحمل aria-label="Change Language" ✅

📊 جدول الأولويات
# البطاقةالخطورةالقسمالتأثير1فيديو كـ <img>🔴 حرجGalleryمستطيل أسود كامل214 صورة 404🔴 حرجGallery/Clients/Aboutفراغات سوداء3Contrast فاشل في About🔴 حرجAboutنص غير مقروء4CSS color inheritance🟠 عاليServices/Productsخطر إظهار نص أسود5Inline CSS في JSX🟡 متوسطClientsصيانة صعبة6aria-label مفقود🟡 متوسطHeaderAccessibility7Stat "20+" heading🟢 منخفضAboutSEO/A11y

🛠️ الإجراءات العاجلة المطلوبة
أولاً (فوري): رفع الملفات المفقودة — /gallery/work0.jpg, /gallery/work6.jpg, /gallery/work11.jpg, /backgrounds/clients/about-bg.png, /backgrounds/clients/10.jpg, /backgrounds/clients/logo.png
ثانياً (هذا الأسبوع): إصلاح work3.mp4 → استبدال <img> بـ <video>, وإصلاح ألوان About section
ثالثاً (قريباً): نقل CSS الـ animation خارج JSX، وإضافة ARIA labels

المحلل: Claude — Forensic UI/UX & Code Analyst
الموقع المفحوص: <http://localhost:5173> — TwinHub Media & AI Center
إجمالي الأخطاء المكتشفة: 9 مشاكل (3 حرجة، 3 عالية، 3 متوسطة/منخفضة)
