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

    filteredDf = filteredDf
        .filter(row => 
            (Util.dateConv(row.get('date')) >= Util.dateConv($('#startDate').val())) 
        && (Util.dateConv(row.get('date')) <= Util.dateConv($('#endDate').val())) 
        );
        //filteredDf.count();
    console.log("hello-->",filteredDf.count());
    Util.constructTable(filteredDf, "dataTable");

});

$( "#seeItBtn" ).on("click", function( event ) {

    $.each($("#checkboxForCharts input:checked"), function(){        
        let checkedChart = $(this).val();
        
        if(checkedChart === "bar"){

            $("#canvasDivBar").empty();
            
            selectedChkBoxDataFilter.forEach(function(dataSelected) {
                
                if(dataSelected === "date" || dataSelected === "city"){

                }else{

                    console.log("DataSelected",dataSelected);
                    let htmlMinBarCanvas = '<div class="col-lg-4">'  
                                        + '<canvas id="minBarCanvas'+dataSelected+'" ></canvas>' 
                                    + '</div>';
                    $("#canvasDivBar").append(htmlMinBarCanvas)

                    let minBarChart = new MinBarChart("minBarCanvas"+dataSelected, dataSelected, filteredDf)


                    let htmlMaxBarCanvas = '<div class="col-lg-4">'  
                                        + '<canvas id="maxBarCanvas'+dataSelected+'" ></canvas>' 
                                    + '</div>';

                    $("#canvasDivBar").append(htmlMaxBarCanvas)
                    let maxBarChart = new MaxBarChart("maxBarCanvas"+dataSelected, dataSelected, filteredDf)

                    
                    let htmlAvgBarCanvas = '<div class="col-lg-4">'  
                                        + '<canvas id="avgBarCanvas'+dataSelected+'" ></canvas>' 
                                    + '</div>';
                    $("#canvasDivBar").append(htmlAvgBarCanvas)
                    let avgBarChart = new AvgBarChart("avgBarCanvas"+dataSelected, dataSelected, filteredDf)    
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