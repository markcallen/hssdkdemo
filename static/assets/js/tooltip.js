var initTooltips = function () {
    var self = this;
    var $tooltip = $('#tooltip');
    var $jsTooltip = $("body ._jsTooltip");
    var $jsFocusTooltip = $("body ._jsFocusTooltip");
    var moveTooltipOffScreen = function () {
        $tooltip.css("top", "-300px");
    };

    //attach tooltips
    $jsTooltip.on("mouseenter", function (e) {
        var $anchor = $(this);
        $anchor.off('mouseup').on('mouseup', moveTooltipOffScreen);

        attachToolTip($anchor, $tooltip);
    });
    $jsTooltip.on("mouseleave", moveTooltipOffScreen);

    $jsFocusTooltip.on("focus", function (e) {
        var $anchor = $(this);
        attachToolTip($anchor, $tooltip);
    });
    $jsFocusTooltip.on("blur", moveTooltipOffScreen);
    $tooltip.on("mouseenter", moveTooltipOffScreen);

    moveTooltipOffScreen();
};

var attachToolTip = function ($anchor, $tooltip) {

    if (!$anchor.data('title')) {
        var title = $anchor.attr('title');
        if (typeof title === 'undefined') {
            title = $anchor.parent().attr('title');
            $anchor.parent().removeAttr('title');
        }
        $anchor.data('title', title);
        $anchor.removeAttr('title');
    }
    var offset = $anchor.offset();
    var top = offset.top; //$anchor.height();
    var left = offset.left + ($anchor.outerWidth(true) / 2);	// mid point

    $tooltip.empty().html($anchor.data('title') + '<span class="icon-13 tip"></span>');
    var tooltipHalfWidth = $tooltip.outerWidth(true) / 2;
    var windowWidth = $(window).width();

    if (left < tooltipHalfWidth) {
        $tooltip.find('.tip').css({'left': ( Math.max(8, left)) + 'px'});
        left = 0;
    } else if (left > windowWidth - tooltipHalfWidth) {
        $tooltip.find('.tip').css({'left': ( Math.min(2 * tooltipHalfWidth - 8, left - windowWidth + 2 * tooltipHalfWidth )) + 'px'});
        left = windowWidth - 2 * tooltipHalfWidth;
    } else {
        left -= tooltipHalfWidth;
    }

    var finaltop = top - $tooltip.outerHeight(true);
    var classPosition = "top";
    if (finaltop < 0) {
        finaltop = top + $anchor.height();
        classPosition = "bottom";
    }

    $tooltip.css({
        "top": finaltop + "px",
        "left": left + "px"
    });
    $tooltip.removeClass("top bottom").addClass(classPosition);
    $tooltip.show();
};

initTooltips();