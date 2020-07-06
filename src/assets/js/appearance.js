/* align */
$('[data-theme-align-target]').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    var target = $(this).attr('data-theme-align-target');
    $(target).removeClass(function (index, className) {
        return (className.match(/(^|\s)theme-align-\S+/g) || []).join(' ');
    }).addClass($(this).attr('data-theme-align'));
});
/* / align */

/* v-align */
$('[data-theme-v-align-target]').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    var target = $(this).attr('data-theme-v-align-target');
    $(target).removeClass(function (index, className) {
        return (className.match(/(^|\s)theme-v-align-\S+/g) || []).join(' ');
    }).addClass($(this).attr('data-theme-v-align'));
});
/* / v-align */


/* Theme color settings */
$('[appearance-data-theme-target]').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    var target = $(this).attr('appearance-data-theme-target');
    $(target).removeClass(function (index, className) {
        return (className.match(/(^|\s)appearance-theme-ctrl-\S+/g) || []).join(' ');
    }).addClass($(this).attr('appearance-data-theme-ctrl')); 
});
/* / Theme color settings */
