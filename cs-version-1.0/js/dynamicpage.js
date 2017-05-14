$(function () {

    if (Modernizr.history) {
        var newHash = "",
                $mainContent = $("#content"),
                $pageWrap = $("#page-wrap"),
                baseHeight = 0,
                $el;

        $pageWrap.height($pageWrap.height());
        baseHeight = $pageWrap.height() - $mainContent.height();

        $("nav").delegate("a", "click", function () {
            _link = $(this).attr("href");
            history.pushState(null, null, _link);
            loadContent(_link);
            return false;
        });

        function loadContent(href) {
            $mainContent
                    .find("#guts")
                    .fadeOut(200, function () {
                        $mainContent.hide().load(href + " #guts", function () {
                            $('#mybook').booklet({
                                width: 920,
                                height: 500,
                                closed: true,
                                autoCenter: true,
                                easing: null,
                                pagePadding: 20,
                                speed: 250
                            });
                            
                            console.log("test");
                            
                            $mainContent.fadeIn(200, function () {
                                $pageWrap.animate({
                                    height: baseHeight + $mainContent.height() + "px"
                                });
                            });
                            $("nav a").removeClass("current");
                            console.log("URL:" + href);
                            $("nav a[href='" + href + "']").addClass("current");
                        });
                    });
        }
        ;

    }

    $(window).bind('popstate', function () {
        _link = location.pathname.replace(/^.*[\\\/]/, '');
        loadContent(_link);
    });
});
