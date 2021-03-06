'use strict'

class Util{

	static dateConv(dateStr) {
        let dateArray = dateStr.split("-")
        let newDate = dateArray[0]+dateArray[1]+dateArray[2]
        return newDate
	}
	static constructTable(dataFrame, tableId){
	    /*Make table columns name ready*/
	    let constructTable = "";
	    constructTable += `<thead><tr>`;
	    for(let k in dataFrame.listColumns()) 
	        constructTable += `<th>${dataFrame.listColumns()[k]}</th>`;
	    constructTable += `</tr></thead>`;

	    console.log('Total rows:', dataFrame.count());

	    let dataFrameJSON = dataFrame.toDict();
	    constructTable += `<tbody>`;
	    for(let i=0; i<dataFrame.count(); i++){
	        constructTable += `<tr>`;                
	        $.each(dataFrameJSON, (k, v) => {
	            constructTable += `<td>${v[i]}</td>`;
	        });
	        constructTable += `</tr>`;    
	    }            
	    constructTable += `</tbody>`;
	    $('[id='+tableId+']').empty();
	    $('[id='+tableId+']').append(constructTable);
	    /* ---Table generation done ----*/
	}

	/* ---This function helps user to select the dates within the available data range ----*/
	static setDateRangeForDataFilter(dataFrame, dateRangeFilterDivId, startDatePickerId, endDatePickerId){

	    let dataFrameJSONForDate = dataFrame.toDict();
	    let dateMin = dataFrameJSONForDate.date[0];
	    console.log("dateMin::>",dateMin);
	    let dateMax = dataFrameJSONForDate.date[dataFrame.count()-1];
	    console.log("dateMin::>",dateMax);
	    $('[id='+dateRangeFilterDivId+']').show();
	    $('[id='+startDatePickerId+']').attr('value', dateMin);
	    $('[id='+startDatePickerId+']').attr('min', dateMin);
	    $('[id='+startDatePickerId+']').attr('max', dateMax);
	    $('[id='+endDatePickerId+']').attr('min', dateMin);
	    $('[id='+endDatePickerId+']').attr('max', dateMax);
	    $('[id='+endDatePickerId+']').attr('value', dateMax);
	    
	}

	/* ---This function helps in getting filename after upload event ----*/
	static getFilenNameAfterUploadClick(filePickerDivId){
	    let selectedFile = $('[id='+filePickerDivId+']')[0].files[0];
	    if(selectedFile ===undefined){
	        alert("Please select a file");
	        return;
	    }
	    return selectedFile;
	}

	/* ---This function helps in getting checkbox for Column slicing ----*/
	static getCheckBoxFromDataFrame(dataFrame, checkboxForColumnsDivId) {
	    /*Make columns filtering ready*/
	    let checkboxForColumnsHTML = "";
	    for(let k in dataFrame.listColumns()){
	        if(dataFrame.listColumns()[k] === 'date' || dataFrame.listColumns()[k] === 'hour' || dataFrame.listColumns()[k] === 'city'){

	        }else
	            checkboxForColumnsHTML += `<label class="checkbox-inline"><input type="checkbox" value=${dataFrame.listColumns()[k]}><strong>${dataFrame.listColumns()[k]}</strong></label>`;
	    }
	    
	    $('[id='+checkboxForColumnsDivId+']').empty();
	    $('[id='+checkboxForColumnsDivId+']').append(checkboxForColumnsHTML);
	}

	/**
		returns a random color 
	*/
	static getRandomColor() {
	    	var letters = '0123456789ABCDEF';
	    	var color = '#';
	    	for (var i = 0; i < 6; i++ ) {
	        	color += letters[Math.floor(Math.random() * 16)];
	    	}
	    	return color;
		}
}