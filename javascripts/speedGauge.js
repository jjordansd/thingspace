window.speedometerGauge=0;
freeboard.addStyle('.speedgauge-widget-wrapper', "color:#0000000;width:75%;	height:240px;margin-left:35px");

(function() {    
    var speedometerGaugeWidget = function (settings) {
        var self = this;
        var currentSettings = settings;
        var thisgaugeID = "speedgauge-" + window.speedometerGauge++;
        var titleElement = $('<h2 class="section-title"></h2>');
        var speedgaugeElement = $('<div class="speedgauge-widget-wrapper" id="' + thisgaugeID + '"></div>');
        var gaugeChart = null;
        
        this.render = function(element) {
            
            $(element).append(titleElement).append(speedgaugeElement);
            gaugeChart = AmCharts.makeChart( thisgaugeID, {
                "type": "gauge",
                "theme": "dark",
                "fontSize": 9,
                "path": "http://www.amcharts.com/lib/3/",
                  "axes": [ {
                    "axisThickness": 1,
                    "axisAlpha": 0.2,
                    "tickAlpha": 0.2,
                    "valueInterval": 1,
                    "bands": [ {
                      "color": "#84b761",
                      "innerRadius": "98%",
                      "endValue": 0.02,
                      "startValue": 0
                    }, {
                      "color": "#fdd400",
                      "innerRadius": "98%",
                      "endValue": 0.07,
                      "startValue": 0.03
                    }, {
                      "color": "#cc4748",
                      "endValue": 0.5,
                      "innerRadius": "98%",
                      "startValue": 0.08
                    } ],
                    "bottomText": "0 points",
                    "bottomTextYOffset": -20,
                    "endValue": 0.5
                  } ],
                    "arrows": [ {
                        "innerRadius": "3%",			
                        "radius": "95%",
        			    "startWidth": 5
        		    } ],
                  "export": {
                    "enabled": true
                  }
            });
            freeboard.showLoadingIndicator(true);
            setTimeout(function(){
                freeboard.showLoadingIndicator(false);
                speedgaugeElement.find("a").css("display","none");
                titleElement.html("a");
            },10000);
            
        }
        this.getHeight = function () {
            return 5;
        }
        this.onSettingsChanged = function(newSettings)
        {
            currentSettings = newSettings;
            titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));

        }
        this.onCalculatedValueChanged = function(settingName, newValue)
		{
		    if (gaugeChart) {
		        if ( gaugeChart.arrows ) {
                    if ( gaugeChart.arrows[ 0 ] ) {
                        if ( gaugeChart.arrows[ 0 ].setValue ) {
                            gaugeChart.arrows[ 0 ].setValue( newValue );
                            gaugeChart.axes[ 0 ].setBottomText( newValue + " MPH" );
                        }
                    }
                }
		    }
        }
        this.onDispose = function() 
        {
        
        }

        
    };
        
        
    freeboard.loadWidgetPlugin({
        type_name: "speedgauge",
        display_name: "SpeedometerGauge",
        "external_scripts" : [
            "https://www.amcharts.com/lib/3/amcharts.js",
            "https://www.amcharts.com/lib/3/gauge.js",
            "https://www.amcharts.com/lib/3/themes/dark.js"
        ],
        settings: [
            {
                name: "title",
                display_name: "Title",
                type: "text"
            },
            {
                name: "value",
                display_name: "Value",
                type: "calculated"
            }        
        ],
        newInstance: function(settings, newInstanceCallback) {
            newInstanceCallback(new speedometerGaugeWidget(settings));
        }
    
    });
}());