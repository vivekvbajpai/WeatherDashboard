'use strict'
class Dashboard {
	constructor () {
        
    }
}

var dataFrame = dfjs.DataFrame;
var filteredDf = dfjs.DataFrame;

/*EVENT HANDLERS IN DASHBOARD **/
$('#uploadFile').on('click', function(){

	let selectedFile = Util.getFilenNameAfterUploadClick("datafile");
	let DataFrame = dfjs.DataFrame;
	DataFrame.fromCSV(selectedFile)
		.then(
		    df => {
	            let dataFrameObj = new DataFrameWrapper(df);
			    dataFrame = dataFrameObj.getDataFrame();
			    console.log(dataFrame);
			    Util.setDateRangeForDataFilter(dataFrame, "dateRangeFilterDivId", "startDate", "endDate");
			    Util.constructTable(dataFrame, "dataTable"); // Initial DataLoad
			    Util.getCheckBoxFromDataFrame(dataFrame, "checkboxForColumns");
		   }
		);    
});

var selectedChkBoxDataFilter = [];

$( "#addFilterBtn" ).on("click", function( event ) {
    let n = $( "#checkboxForColumns input:checked" ).length;
    //console.log(n);
    selectedChkBoxDataFilter = [];
    selectedChkBoxDataFilter.push("date");
    selectedChkBoxDataFilter.push("city");
    $.each($("#checkboxForColumns input:checked"), function(){        
        selectedChkBoxDataFilter.push($(this).val());
    });
    
    filteredDf = dataFrame.select(...selectedChkBoxDataFilter);
    Util.constructTable(filteredDf, "dataTable");
    $('#checkboxForCities').show();
    $('#dateRangeFilterDiv').show();

});

$( "#seeItBtn" ).on("click", function( event ) {

    filteredDf = filteredDf
        .filter(row => 
            (Util.dateConv(row.get('date')) >= Util.dateConv($('#startDate').val())) 
        && (Util.dateConv(row.get('date')) <= Util.dateConv($('#endDate').val())) 
    );

    let citychkBoxDataFilter = [];
    $.each($("#checkboxForCities input:checked"), function(){        
        citychkBoxDataFilter.push($(this).val());
    });

    filteredDf = filteredDf
        .filter(row => $.inArray(row.get('city'),citychkBoxDataFilter) >= 0
    );

    Util.constructTable(filteredDf, "dataTable");

    //create a BarChartFactory
        let barChartFactory = new BarChartFactory();

    $.each($("#checkboxForCharts input:checked"), function(){        
        let checkedChart = $(this).val();
        
        if(checkedChart === "bar"){

            $("#canvasDivBar").empty();
            
            selectedChkBoxDataFilter.forEach(function(dataSelected) {
                
                if(dataSelected === "date" || dataSelected === "city"){

                }else{

                    console.log("DataSelected",dataSelected);
                

                    let htmlHeadingForEachColumn = `<div class="huge">${dataSelected}</div>`
                    $("#canvasDivBar").append(htmlHeadingForEachColumn)
                    
                    let htmlMinBarCanvas = '<div class="col-lg-4">'  
                                        + '<canvas id="minBarCanvas'+dataSelected+'" ></canvas>' 
                                    + '</div>';
                    $("#canvasDivBar").append(htmlMinBarCanvas)

                    let minBarChart = barChartFactory.getBarChart("min","minBarCanvas"+dataSelected, dataSelected, filteredDf);
					minBarChart.showGraph();

                    let htmlMaxBarCanvas = '<div class="col-lg-4">'  
                                        + '<canvas id="maxBarCanvas'+dataSelected+'" ></canvas>' 
                                    + '</div>';

                    $("#canvasDivBar").append(htmlMaxBarCanvas)
                    let maxBarChart = barChartFactory.getBarChart("max","maxBarCanvas"+dataSelected, dataSelected, filteredDf);
					maxBarChart.showGraph();
                    
                    let htmlAvgBarCanvas = '<div class="col-lg-4">'  
                                        + '<canvas id="avgBarCanvas'+dataSelected+'" ></canvas>' 
                                    + '</div>';
                    $("#canvasDivBar").append(htmlAvgBarCanvas)
                    let avgBarChart = barChartFactory.getBarChart("avg","avgBarCanvas"+dataSelected, dataSelected, filteredDf);   
					avgBarChart.showGraph();
                }

                
        
              });
                        
        }else if(checkedChart === "line"){

            let htmlLine = `<canvas id="lineCanvas"></canvas>`
            $("#canvasDivLine").empty();
            $("#canvasDivLine").append(htmlLine);
            //filteredDf.show();
            let lineChart = new LineChart("lineCanvas", filteredDf.filter(row => row.get('city') === "Chicago"));
            lineChart.showGraph();

        }else if(checkedChart === "pie"){

        }else if(checkedChart === "stack"){

        }
    });
});