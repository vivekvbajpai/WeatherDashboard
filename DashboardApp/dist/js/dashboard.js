'use strict'
class Dashboard {
	constructor () {
        
    }
}

var dataFrame = dfjs.DataFrame;

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

$( "#addFilterBtn" ).on("click", function( event ) {
    let n = $( "#checkboxForColumns input:checked" ).length;
    //console.log(n);
    let selectedChkBoxDataFilter = [];
    selectedChkBoxDataFilter.push("date");
    $.each($("#checkboxForColumns input:checked"), function(){        
        selectedChkBoxDataFilter.push($(this).val());
    });
    
    let filteredDf = dataFrame.select(...selectedChkBoxDataFilter);
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
    
});