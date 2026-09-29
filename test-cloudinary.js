// استيراد مكتبة cloudinary (تأكد من تثبيتها أولاً)
const cloudinary = require('cloudinary').v2;

// ضع قيمك الخاصة هنا مباشرة للتجربة الفعالة
cloudinary.config({

  cloud_name: 'cjjr5a65',//
  api_key: "",
  api_secret: "",
});


console.log("⏳ جاري الاتصال بـ Cloudinary واختبار البيانات...");

// محاولة رفع صورة اختبارية من الإنترنت مباشرة للتأكد من الصلاحيات
cloudinary.uploader.upload("https://wikimedia.org", {
  folder: "test_hiro"
})
.then((result) => {
  console.log("✅ تم الاتصال بنجاح! البيانات صحيحة 100%");
  console.log("🔗 رابط الصورة المرفوعة بنجاح:", result.secure_url);
})
.catch((error) => {
  console.error("❌ فشل الاتصال! هناك خطأ في القيم الممررة:");
  console.error(error.message);
});
