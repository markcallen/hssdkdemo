$(document).ready(function () {
    hsp.init({
      useTheme: true
    });

    var $step1 = $('._step1');
    var $step2 = $('._step2');

    var $items1 = $('._items1');
    var $items2 = $('._items2');

    var $navFolder = $('._folder');
    var $navTag = $('._tag');

    var $btnLogin = $('._btn-login');

    var $overlay = $('._overlay');
    var $overlayImg = $('._overlay img');

    var $overlayWhite = $('._overlay-white');
    var $properties = $('._properties');

    var $overlayWhite2 = $('._overlay-white2');
    var $settingsContainer = $('._settings-container');

    var $contentList = $('._content-list');
    var $checkbox = $('._checkbox');

    var $btnList = $('._btn-list');
    var $btnTiles = $('._btn-tiles');
    var $btnClose = $('._btn-close');

    var $selectAll = $('._select-all');
    var $selectAllContainer = $('._select-all-container');

    var $selectedText = $('._selected-text');
    var $hightableSvgs = $('._svg-container #fa-star').parent().parent();
    var $propertiesSvgs = $('.content ._svg-container #fa-info-circle').parent().parent();
    var $attachCompose = $('.content ._svg-container #hs-attach').parent().parent();
    var $settingsSvg = $('.header #fa-cog').parent().parent();

    var setAllCheckboxes = function (checked) {
        $checkbox.filter(':visible').each(function() {
            var $elem = $(this);
            var originalProp = $elem.prop('checked');
            if (originalProp !== checked) {
                $elem.trigger('change').prop('checked', checked);
            }
        })
    };

    var updateSelectedCount = function () {
        var selectedCount = $('._checkbox:checked').filter(':visible').length;

        if (selectedCount === 0) {
            $selectedText.text('No items selected');
            $selectAllContainer.hide();
            $contentList.removeClass('x-checkbox');
        } else {
            $contentList.addClass('x-checkbox');
            $selectedText.text( selectedCount + ' Selected');
            $selectAllContainer.show();
        }
    };

    var memberInfo = {};
    hsp.getMemberInfo(function(info){
      memberInfo = info;
    });

    openFolder = function () {
        $('._items1').toggleClass('hidden');
        $('._items2').toggleClass('hidden');
        $navFolder.toggleClass('hidden');
        updateSelectedCount()
    };


    showOverlay = function (img) {
        if (img) {
            $overlayImg.attr('src', img);
            $overlay.show();
        } else {
            openFolder();
        }
    };

    resetView = function () {
        $items1.toggleClass('hidden');
        $items2.toggleClass('hidden');
        $navFolder.toggleClass('hidden');
        updateSelectedCount();
    };

    resetView2 = function () {
        $navTag.hide();
        $('._item').show();
        updateSelectedCount();
    };

    showTag = function (tag) {
        $navTag.find('._tag-text').html(tag);
        $('._item').not('.' + tag).hide();
        $('._item.' + tag).show();
        $navTag.show();
        updateSelectedCount();
        hideProperties();
    };

    var showProperties = function (img, name, tags) {
        console.log(tags);
        $overlayWhite.show();
        if (img === undefined || img === '') {
            $properties.find('._image').parent().hide();
            $properties.find('._tags').hide();
            $properties.find('._category').hide();
            $properties.find('._attach').hide();
            $properties.find('._thumbnail').show();
        } else {
            $properties.find('._image').parent().show();
            $properties.find('._tags').show();
            $properties.find('._category').show();
            $properties.find('._attach').show();
            $properties.find('._thumbnail').hide();
            $properties.find('._image').attr('src', img);
        }
        $properties.find('._tags').html(tags);
        $properties.find('._name').text(name);
        $properties.show("slide", { direction: "right" }, 400, function () {
            if ($properties.find('.-content')[0].scrollHeight > $(window).height()) {
                $properties.addClass('x-sticky');
            } else {
                $properties.removeClass('x-sticky');
            }

        });
    };

    var hideProperties = function () {
        $overlayWhite.hide();
        $properties.hide("slide", { direction: "right" }, 400);
    };

    var showSettings = function () {
        $overlayWhite2.show();
    };

    var hideSettings = function () {
        $overlayWhite2.hide();
    };

    $btnLogin.on('click', function () {
        $step1.hide();
        $step2.show();
    });

    $selectAll.on('change', function () {
        setAllCheckboxes($(this).prop('checked'));
    });



    $checkbox.on('change', function () {
        var $checkboxContainer = $(this).parent();
        $checkboxContainer.toggleClass('x-selected');
        setTimeout(updateSelectedCount, 100);
    });

    $btnList.on('click', function () {
        $contentList.addClass('x-list');
        $contentList.removeClass('x-tiles');
        $('._content-list.x-list ._item.folder').off('click.list');
        $('._content-list.x-list ._item.folder').on('click.list', openFolder);
    });

    $btnTiles.on('click', function () {
        $('._content-list.x-list ._item.folder').off('click.list');
        $contentList.removeClass('x-list');
        $contentList.addClass('x-tiles');
    });

    $hightableSvgs.on('click', function () {
        $(this).parent().toggleClass('x-highlighted');
    });

    $propertiesSvgs.on('click', function () {
        var $currentItem = $(this).closest('._item');
        var imgSrc = $currentItem.find('.-img').data('img');
        var name = $currentItem.find('._name').text();
        var tags = $currentItem.find('._tags').html();
        showProperties(imgSrc, name, tags);
    });

    $attachCompose.on('click', function() {
      var $currentItem = $(this).closest('._item');
      var imgSrc = $currentItem.find('.-img').data('img');
      var name = $currentItem.find('._name').text();
      var timeStamp = Math.floor(Date.now() / 1000);
      var url = publicHostname + '/' + imgSrc;
      var token = sha512('' + memberInfo.userId + timeStamp + url + hsSecret);
      hsp.attachFileToMessage ({
        url: url,
        name: name,
        extension: imgSrc.split('.').pop(),
        timestamp: timeStamp,
        token: token
      });
    });

    $btnClose.on('click', function () {
        $overlay.hide();
    });

    $overlay.on('click', function () {
       $overlay.hide();
    });

    $overlayImg.on('click', function (e){
        e.stopPropagation();
    });

    $overlayWhite.on('click', hideProperties);

    $properties.find('.-header svg').on('click', hideProperties);

    $settingsSvg.on('click', showSettings);
    $overlayWhite2.on('click', hideSettings);
    $settingsContainer.on('click', function (e) {
        e.stopPropagation();
    });
    $settingsContainer.find('._close').on('click', hideSettings);



    $('.rc-DropDown button').on('click', function (e) {
        $(this).parent().children('.rc-SimpleMenu').toggleClass('hidden');
        e.stopPropagation();
    });

    $('body').on('click', function () {
        $('.rc-DropDown .rc-SimpleMenu').addClass('hidden');
    });

    $('._searchInput').on('click', function (e) {
        $('.rc-DropDown.search .rc-SimpleMenu').removeClass('hidden');
        e.stopPropagation();
    });

});
