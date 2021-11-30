// import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import '../node_modules/@laylazi/bootstrap-rtl-scss/scss/bootstrap-rtl.scss';
import './css/style.css';
import './scss/style.scss';
import 'jquery/dist/jquery.min';
import $ from 'jquery';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.min';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js'

$(function () {
  $('body').tooltip({ selector: '[data-toggle=tooltip]', placement: 'bottom' });

  $('.add-to-cart-btn').click(function () {
    alert('أضيف المنتج الي عربة الشراء');
  });

  $('#copyright').prepend(
    `جميع الحقوق محفوظة للمتجر سنة ${new Date().getFullYear()}`
  );

  $('.product-option input[type="radio"]').change(function () {
    $(this).parents('.product-option').siblings().removeClass('active');
    $(this).parents('.product-option').addClass('active');
  });

  $('[data-product-quantity]').change(function () {
    //اجلب الكمية الجديدة
    var newQuantity = $(this).val();

    //ابحث عن السطر الذي يحتوي علي معلومات هذا المنتج
    var parent = $(this).parents('[data-product-info]');

    //اجلب سعر القطعة الواحدة من معلومات المنتج
    var pricePerUnit = parent.attr('data-product-price');

    //السعر الاجمالي للمنتج هو سعر القطعة مضروبا بعددها
    var totalPriceForProduct = newQuantity * pricePerUnit;

    //عين السعر الجديد ضمن خلية السعر الاجمالي للمنتج في هذا السطر
    parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

    // حدث السعر الاجمالي لكل المنتجات
    calculateTotalPrice();
  });

  $('[data-remove-from-cart]').click(function () {
    $(this).parents('[data-product-info]').remove();
    calculateTotalPrice();
  });

  function calculateTotalPrice() {
    //أنشئ متغيرا جديدا لحفظ السعر الاجمالي
    var totalPriceForAllProducts = 0;

    //لكل سطر يمثل معلومات المنتج في الصفحة
    $('[data-product-info]').each(function () {
      // اجلب سعر القطعة الواحدة من الخاصية الموافقة
      var pricePerUnit = $(this).attr('data-product-price');

      // اجلب كمية المنتج من حقل اختيار الكمية
      var quantity = $(this).find('[data-product-quantity]').val();

      var totalPriceForProduct = pricePerUnit * quantity;

      // اضف السعر الاجمالي لهذا المنتج الي السعر الاجمالي لكل المنتجات, واحفظ القسمة في المتغير نفسه
      totalPriceForAllProducts =
        totalPriceForAllProducts + totalPriceForProduct;
    });

    //اضافة السعر الاجمالي لكل المنتجات في الصفحة
    $('#total-price-for-all-products').text(totalPriceForAllProducts);
  }

  var citiesByCountry = {
    sa: ['جدة', 'الرياض'],
    eg: ['القاهرة', 'الأسكندرية'],
    sy: ['حماه', 'دمشق', 'حلب'],
    jo: ['عمان', 'الزرقاء'],
    pa: ['القدس', 'رام الله'],
  };

  //عندما يتغير البلد
  $('#form-checkout select[name="country"]').change(function () {
    //اجلب رمز البلد
    var country = $(this).val();
    //اجلب مدن هذه الدولة من المصفوفة
    var cities = citiesByCountry[country];
    //فرغ قائمة المدن
    $('#form-checkout select[name="city"]').empty();
    //اضافة خيار اختر مدينة
    $('#form-checkout select[name="city"]').append(
      '<option value="" disabled selected>اختر المدينة</option>'
    );
    //أضف المدن الي قائمة المدن
    cities.forEach(function (city) {
      var newOption = $('<option></option>');
      newOption.text(city);
      newOption.val(city);
      $('#form-checkout select[name="city"]').append(newOption);
    });
  });

  //عندما تتغير طريقة الدفع
  $('#form-checkout input[name="payment_method"]').change(function () {
    //اجلب القيمة المختارة حاليا
    var paymentMethod = $(this).val();

    /* هذا الكود يمكن حذفة وسيتم تنفيذ الفكرة بدون أي مشكلة */
    if (paymentMethod === 'on_delivary') {
      $('#creditCardInfo input').prop('disabled', true);
    } else {
      $('#creditCardInfo input').prop('disabled', false);
    }
    /* هذا الكود يمكن حذفة وسيتم تنفيذ الفكرة بدون أي مشكلة */

    $('#creditCardInfo input').toggle();
  });

  //مكون البحث حسب السعر
  $('#price-range').slider({
    range: true,
    min: 50,
    max: 1000,
    step: 50,
    values: [250, 800],
    slide: function (event, ui) {
      $('#price-min').text(ui.values[0]);
      $('#price-max').text(ui.values[1]);
    },
  });

});
