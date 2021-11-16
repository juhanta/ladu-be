$(document).ready(function(){

    // defaults = { digitsAfterDecimal: 0, scaler: 1, thousandsSep: ".", decimalSep: ",", prefix: "", suffix: "" };
    
    function getFormat(short) {
        if (short == '%') {
            return $.pivotUtilities.numberFormat({ digitsAfterDecimal: 2, scaler: 100, thousandsSep: ".", decimalSep: ",", prefix: "", suffix: "%" });
        }
        if (short == '%%') {
            return $.pivotUtilities.numberFormat({ digitsAfterDecimal: 2, scaler: 1, thousandsSep: ".", decimalSep: ",", prefix: "", suffix: "%" });
        }
        if (short == '$') {
            return $.pivotUtilities.numberFormat({digitsAfterDecimal: 0, scaler: 1, thousandsSep: ".", decimalSep: ",", prefix:'$', suffix: ""});
        }
        if (short == '#') {
            return $.pivotUtilities.numberFormat({digitsAfterDecimal: 0, scaler: 1, thousandsSep: ".", decimalSep: ",", prefix: "", suffix: ""});
        }
        if (short == '$M') {
            return $.pivotUtilities.numberFormat({digitsAfterDecimal: 2, scaler: 1000, thousandsSep: ".", decimalSep: ",", prefix: '$', suffix: ""});
        }
        return $.pivotUtilities.numberFormat();
    }

    var tpl = $.pivotUtilities.aggregatorTemplates;

    var derivers = $.pivotUtilities.derivers;
    var renderers = $.extend($.pivotUtilities.renderers,
        // $.pivotUtilities.plotly_renderers);
        $.pivotUtilities.c3_renderers,
$.pivotUtilities.export_renderers);

    $.getJSON("dsSales.php", function(mps) {
        $("#output").pivotUI(mps, {
            renderers: renderers,
            cols: ["FiscalYear", "FiscalPeriod"], 
            rows: ["Country"],
						 exclusions: { Country: ['2i_FIN', '3i_NOR'] },
            rendererName: "Table",
            aggregators: {
                "LineSum":      function() { return tpl.sum(getFormat('#'))(["LineSum"]) },
									"Qty":      function() { return tpl.sum(getFormat('#'))(["TQty"]) },
            },
            
        },false, "en");
				
		window.pivotSave = function(){ 
			console.log("clicksave");
			var config = $("#output").data("pivotUIOptions");
			var config_copy = JSON.parse(JSON.stringify(config));
			console.log(config_copy);
			//delete some values which will not serialize to JSON
			//delete config_copy["aggregators"];
			delete config_copy["renderers"];
			console.log(config_copy);
			$.cookie("pivotConfig", JSON.stringify(config_copy),{expires: 20*365});
			};

        window.pivotSave2 = function(){ 
                console.log("clicksave");
                var config = $("#output").data("pivotUIOptions");
                var config_copy = JSON.parse(JSON.stringify(config));
                console.log(config_copy);
                //delete some values which will not serialize to JSON
                //delete config_copy["aggregators"];
                delete config_copy["renderers"];
                console.log(config_copy);
                $.cookie("pivotConfig2", JSON.stringify(config_copy),{expires: 20*365});
                };
		
        window.pivotSave3 = function(){ 
			console.log("clicksave");
			var config = $("#output").data("pivotUIOptions");
			var config_copy = JSON.parse(JSON.stringify(config));
			console.log(config_copy);
			//delete some values which will not serialize to JSON
			//delete config_copy["aggregators"];
			delete config_copy["renderers"];
			console.log(config_copy);
			$.cookie("pivotConfig3", JSON.stringify(config_copy),{expires: 20*365});
			};

		window.pivotRestore = function(){ 
				console.log("ClickREstore");
				configObject = JSON.parse($.cookie("pivotConfig")); 
				configObject.aggregators = { "LineSum": function() { return tpl.sum(getFormat('#'))(["LineSum"]) }, "Qty": function() { return tpl.sum(getFormat('#'))(["TQty"]) }} 
				$("#output").pivotUI(mps, configObject, true); 

		};

        window.pivotRestore2 = function(){ 
            console.log("ClickREstore");
            configObject = JSON.parse($.cookie("pivotConfig")); 
            configObject.aggregators = { "LineSum": function() { return tpl.sum(getFormat('#'))(["LineSum"]) }, "Qty": function() { return tpl.sum(getFormat('#'))(["TQty"]) }} 
            $("#output").pivotUI(mps, configObject, true); 

    };
        window.pivotRestore3 = function(){ 
            console.log("ClickREstore");
            configObject = JSON.parse($.cookie("pivotConfig")); 
            configObject.aggregators = { "LineSum": function() { return tpl.sum(getFormat('#'))(["LineSum"]) }, "Qty": function() { return tpl.sum(getFormat('#'))(["TQty"]) }} 
            $("#output").pivotUI(mps, configObject, true); 

};
        	
    });

});



function exportTableToExcel(tableID, filename = 'test'){
var downloadLink;
var dataType = 'application/vnd.ms-excel';
var tableSelect = document.getElementById(tableID);
var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

filename = filename?filename+'.xls':'excel_data.xls';
downloadLink = document.createElement("a");

document.body.appendChild(downloadLink);

if(navigator.msSaveOrOpenBlob){
var blob = new Blob(['\ufeff', tableHTML], {
  type: dataType
});
navigator.msSaveOrOpenBlob( blob, filename);
}else{

downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

downloadLink.download = filename;

downloadLink.click();
}
}

