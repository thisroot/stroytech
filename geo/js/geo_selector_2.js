;
(function ($,window,document) {
    var defaults = {
        regionID: undefined,
        minInputChar: 1,
        bindEvent: 'keyup',
        events: {
            onGsData: function (data) {},
            onGsError: function (text) {},
            onGsCityStart: function () {},
            onGsCityData: function (data) {}
        }
    };
    function GeoSelector(element, options) {
        var widget = this;
        var callbacks = $.Callbacks();
        widget.config = $.extend({}, defaults, options);
        $(window).geoSelector.config = widget.config;
        widget.element = element;
       
            
        /*    
            
        $.each(widget.config.events, function (key, value) {
            console.log(key + '-', value);
            if (typeof value === 'function') {
                widget.element.on(key + '.gs', function (e, param) {
                    return value(e, widget.element, param);
                });
            }
        });
        
        */
       
       
       
       
        widget.init();
        
        if (widget.config.regionID !== undefined) {
            widget.getData('http://admin.evildevel.com/api/geo/city.json', 'cities', 'region=' + widget.config.regionID);
        }
        
        widget.inputContainer.on(widget.config.bindEvent+' search', function (e) {
        widget.config = $.extend({}, widget.config, defaults);
        
            widget.regionContainer.empty();
            widget.cityContainer.empty();
            
            var str = widget.inputContainer.val();
            if (str.length >= widget.config.minInputChar) {
                setTimeout(function () {
                    widget.getData('http://admin.evildevel.com/api/geo/region.json', 'regions', 'name=%' + str + '%');
                }, 600);
            }
        });
        
    };
    GeoSelector.prototype = {
        init: function () {
            this.element.addClass('gs-container');
            var selectContainer = $('<div/>').addClass('gs-select-container').appendTo(this.element);
            this.inputContainer = $('<input/>').addClass('gs-input-container').appendTo(selectContainer);
            this.regionContainer = $('<div/>').addClass('gs-region-container').appendTo(selectContainer);
            this.cityContainer = $('<div>').addClass('gs-city-container').appendTo(this.element);
        },
        getData: function (url, output, input) {
            var _this = this;
            $.ajax({
                type: 'GET',
                url: url,
                data: input,
                crossDomain: true,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            }).done(function (data) {

                var string = JSON.stringify(data);
                _this.regionContainer.empty();
             //   _this.cityContainer.empty();

                if (output === 'regions') {
                    _this.constructRegBlock(data);
                    _this.element.trigger('onGsData.gs', string);

                    $('.gs-region-item').on('click', function () {
                        _this.element.trigger('onGsCityStart.gs');
                        _this.getData('http://admin.evildevel.com/api/geo/city.json', 'cities', 'region=' + $(this).attr('data-item'));
                        _this.inputContainer.val($(this).text());
                    });
                }
                if (output === 'cities') {
                    _this.constructCityBlock(data);
                    _this.element.trigger('onGsCityData.gs', string);
                }
                $(data).empty();            
            }).fail(function (data) {
                _this.element.triggerHandler('onGsError.gs', data.status);
            });
        },
        constructRegBlock: function (regions) {
            var x, y;
            for (x = 0, y = regions.length; x < y; x++) {
                $('<div/>', {
                    text: regions[x][1],
                    class: 'gs-region-item'
                }).attr('data-item', regions[x][0]).appendTo(this.regionContainer);
            }
        },
        constructCityBlock: function (cities) {
            var x, y;
            this.cityContainer.empty();
            for (x = 0, y = cities.length; x < y; x++) {
                $('<div/>', {
                    text: cities[x][1],
                    class: 'gs-city-item'
                }).attr('data-item', cities[x][0]).appendTo(this.cityContainer);
            }                   
        }
        
    };
    $.fn.geoSelector = function (options) {

        if (arguments[0] === 'set') {
            var widget = this.first();
            defaults = $.extend(true, $(window).geoSelector.config, arguments[1]);
           
           // переназначаем обработчик событий
              if(arguments[1].bindEvent) {
               var element =  $(widget).find('input');
               var handler = jQuery._data(element[0], "events" );
               handler = handler['search'][0]['handler'];
               element.on(arguments[1].bindEvent+' search', handler);
            }
            
            // переинициализируем плагин если у нас появляется регион id
             if(arguments[1].regionID) {
                $(widget).off().empty();
                new GeoSelector(this.first(), defaults);       
                return this.first();
            }
                   
            // переопределяем обработчики колбек функций
            if (arguments[1].events) {
                $(widget).off();
                $.each(defaults.events, function (key, value) {
                    if (typeof value === 'function') {
                        widget.on(key + '.gs', function (e, param) {
                            return value(e, widget.element, param);
                        });
                    }
                });
            }
        } else if (arguments[0] === 'get') {
           
                if(arguments[1] !== undefined &&  !(arguments[1] instanceof Array)) {                  
                        return $(window)['geoSelector']['config'][arguments[1]];                    
            } else {
                return $(window).geoSelector.config;
            }
        } else {
            if (typeof options !== 'object' && options !== undefined) {
                var params = {};
                $(arguments).each(function (index, value) {
                    // получим имя n члена объекта defaults
                    var str = Object.keys(defaults)[index];
                    params[str] = value;
                    options = params;
                });
            }
            new GeoSelector(this.first(), options);
            return this.first();
        }
    };
})(jQuery);
