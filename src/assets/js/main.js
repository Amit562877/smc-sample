function performjsAction() {
    //function twit(d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (!d.getElementById(id)) {
    //     js = d.createElement(s); js.id = id; js.src = "//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
    //     }
    // }
    // twit(document, "script", "twitter-wjs");
    //twttr.widgets.load();
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
        });
    });

    /* sticky bar page navs */
    stickyBarNavs = function () {
        $this = $('.sticky-bar-page-navs');
        $this.css({ 'position': 'fixed', 'bottom': '30px', 'left': $this.offset().left, 'right': ($(window).width() - ($this.offset().left + $this.outerWidth())) });
    }

    if ($(document).find('.sticky-bar-page-navs').length > 0) {
        stickyBarNavs();
        $(window).resize(stickyBarNavs);
    }

    // Hide sticky over footer
    if ($(document).find('.footer').length > 0) {
        var hideOverFooter = $('.footer').offset().top - $(window).height();
        hidePageSticky = function () {
            if ($(this).scrollTop() >= hideOverFooter) {
                $('.sticky-bar-page-navs').css({ 'position': 'static', 'margin-top': -$('.sticky-bar-page-navs').outerHeight() });
            } else {
                $('.sticky-bar-page-navs').css('position', 'fixed');
            }
        }
        $(function () {
            hidePageSticky();
            $(window).scroll(hidePageSticky);
        });
        $(window).resize(function () {
            hideOverFooter = $('.footer').offset().top - $(window).height();
            hidePageSticky();
        });
    }
    /* / sticky bar page navs */


    /* Sticky sidebar */
    $(function () {
        if ($(document).find('.sticky-sidebar').length > 0) {
            $('.sticky-sidebar').stickySidebar({
                topSpacing: 0,
                bottomSpacing: 0,
                containerSelector: '.sticky-sidebar-wrap',
                innerWrapperSelector: '.sticky-sidebar-inner'
            });
        }
    });
    /* / Sticky sidebar */

    /*back-to-top */
    window.onscroll = function () { scrollFunction() };
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            if (document.getElementById("back-to-top"))
                document.getElementById("back-to-top").style.display = "block";
        } else {
            if (document.getElementById("back-to-top"))
                document.getElementById("back-to-top").style.display = "none";
        }
    }
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    /*back-to-top */

}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    });
});

/* sticky bar page navs */
stickyBarNavs = function () {
    $this = $('.sticky-bar-page-navs');
    $this.css({ 'position': 'fixed', 'bottom': '30px', 'left': $this.offset().left, 'right': ($(window).width() - ($this.offset().left + $this.outerWidth())) });
}

if ($(document).find('.sticky-bar-page-navs').length > 0) {
    stickyBarNavs();
    $(window).resize(stickyBarNavs);
}

// Hide sticky over footer
if ($(document).find('.footer').length > 0) {
    var hideOverFooter = $('.footer').offset().top - $(window).height();
    hidePageSticky = function () {
        if ($(this).scrollTop() >= hideOverFooter) {
            $('.sticky-bar-page-navs').css({ 'position': 'static', 'margin-top': -$('.sticky-bar-page-navs').outerHeight() });
        } else {
            $('.sticky-bar-page-navs').css('position', 'fixed');
        }
    }
    $(function () {
        hidePageSticky();
        $(window).scroll(hidePageSticky);
    });
    $(window).resize(function () {
        hideOverFooter = $('.footer').offset().top - $(window).height();
        hidePageSticky();
    });
}
/* / sticky bar page navs */


/* Sticky sidebar */
$(function () {
    if ($(document).find('.sticky-sidebar').length > 0) {
        $('.sticky-sidebar').stickySidebar({
            topSpacing: 0,
            bottomSpacing: 0,
            containerSelector: '.sticky-sidebar-wrap',
            innerWrapperSelector: '.sticky-sidebar-inner'
        });
    }
});
/* / Sticky sidebar */

/*back-to-top */
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        if (document.getElementById("back-to-top"))
            document.getElementById("back-to-top").style.display = "block";
    } else {
        if (document.getElementById("back-to-top"))
            document.getElementById("back-to-top").style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
/*back-to-top */


function showDatetimepicker() {
    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

}

function getCanvas() {
    html2canvas($("#mainimg0"), {
        onrendered: function (canvas) {
            var imgData = canvas.toDataURL(
                'image/png');
            var doc = new jsPDF('p', 'mm');
            doc.addImage(imgData, 'PNG', 10, 10);
            doc.save('sample-file.pdf');
        }
    });
    // html2canvas(document.querySelector('#mainimg0')).then(canvas => {
    //     document.body.appendChild(canvas);
    // });
}

window.takeScreenShot = function () {
    html2canvas(document.getElementById("mainimg0"), {
        onrendered: function (canvas) {
            document.body.appendChild(canvas);
        },
        width: 320,
        height: 220
    });
}

function setScreen() {
    $('.card .card-ctrl-collapse').unbind('click');
    $('.card .card-ctrl-collapse-req').unbind('click');
    $('.card .card-ctrl-fullscreen').unbind('click');
    setTimeout(() => {
        $('.card .card-ctrl-collapse').click(function () {
            $(this).toggleClass('collapsed').closest('.card').find('.card-body').slideToggle(300);
        });
        $('.card .card-ctrl-collapse-req').click(function () {
            $(this).closest('.card').find('.card-ctrl-collapse').click();
        });
        $('.card.card-collapsed .card-ctrl-collapse').click();
        $('.card .card-ctrl-fullscreen').click(function () {
            $(this).siblings('.card-ctrl-collapse.collapsed').click();
            $(this).closest('.card').toggleClass('card-fullscreen');
        });
    }, 1000);
}