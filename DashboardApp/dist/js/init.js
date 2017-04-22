'use strict'

$(function() {
    $('#side-menu').metisMenu();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });


    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    var element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent();

    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent();
        } else {
            break;
        }
    }
});

$('#uploadFile').on('click', function(){
 
    let selectedFile = $('#datafile')[0].files[0];
    let fileName = selectedFile.name.split(".")[0];
    $('#cityName').empty();
    $('#cityName').append(fileName);

    let DataFrame = dfjs.DataFrame;
    let dataFrame;
    DataFrame.fromCSV(selectedFile).then(
        df => {
            dataFrame = df;
            //dataFrame.show();
            let constructTable = (dataFrame) => {
                /*Make table columns name ready*/
                let constructTable = "";
                constructTable += `<thead><tr>`;
                for(let k in dataFrame.listColumns()) 
                    constructTable += `<th>${dataFrame.listColumns()[k]}</th>`;
                constructTable += `</tr></thead>`;

                //console.log('Total rows:', dataFrame.count());

                let dataFrameJSON = dataFrame.toDict();
                //console.log(dataFrameJSON);
                    /*Make table row data ready*/
                constructTable += `<tbody>`;
                for(let i=0; i<dataFrame.count(); i++){
                    constructTable += `<tr>`;                
                    $.each(dataFrameJSON, (k, v) => {
                        constructTable += `<td>${v[i]}</td>`;
                    });
                    constructTable += `</tr>`;    
                }            
                constructTable += `</tbody>`;
                $('#dataTable').empty();
                $('#dataTable').append(constructTable);
                /* ---Table generation done ----*/
            }
            //dataFrame.show();
            constructTable(dataFrame); // Initial DataLoad
            
            /*Make columns filtering ready*/
            let checkboxForColumnsHTML = "";
            for(let k in dataFrame.listColumns()){
                if(dataFrame.listColumns()[k] === 'Date' || dataFrame.listColumns()[k] === 'hour'){

                }else
                    checkboxForColumnsHTML += `<label class="checkbox-inline"><input type="checkbox" value=${dataFrame.listColumns()[k]}><strong>${dataFrame.listColumns()[k]}</strong></label>`;
            }
            
            $('#checkboxForColumns').empty();
            $('#checkboxForColumns').append(checkboxForColumnsHTML);

            $( "#addFilterBtn" ).on("click", function( event ) {
                let n = $( "#checkboxForColumns input:checked" ).length;
                //console.log(n);
                let selectedChkBoxDataFilter = [];
                selectedChkBoxDataFilter.push("date");
                selectedChkBoxDataFilter.push("city");
                $.each($("#checkboxForColumns input:checked"), function(){        
                    selectedChkBoxDataFilter.push($(this).val());
                });

                //console.log("Selected Data Filters are: " + selectedChkBoxDataFilter.join(", "));
                let filterObject = {};

                //dataFrame.show();
                //console.log(dataFrame.listColumns());
                //console.log("Selected Data Filters are: " + selectedChkBoxDataFilter.join(", "));
                //console.log("Selected Data Filters are: " + selectedChkBoxDataFilter);

                let filteredDf = dataFrame.select(...selectedChkBoxDataFilter);
                //console.log(filteredDf.listColumns());
                constructTable(filteredDf);
                let charty = new LineChart("lineCanvas",filteredDf.filter(row => row.get("city") === "Chicago"));
                charty.showGraph();

                let barChart = new BarChart("minBarCanvas","temperature","min",filteredDf);
                barChart.showGraph();
            });

            $( "#seeItBtn" ).on("click", function( event ) {
            
            });

        });
});
