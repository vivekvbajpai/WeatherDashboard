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
            let dataFrameJSON = dataFrame.toDict();
            console.log(dataFrameJSON);

            /*Make table columns name ready*/
            let constructTable = "";
            constructTable += `<thead><tr>`;
            for(let k in dataFrame.listColumns()) 
                constructTable += `<th>${dataFrame.listColumns()[k]}</th>`;
            constructTable += `</tr></thead>`;

            // Now, our DataFrame is 'clean' with. Let's go to a quick analysis.
            console.log('Total rows:', dataFrame.count());
            //console.log('Survivors:', cleanDF.filter({survived: 'yes'}).count()); // We have 499 survivors.
            //console.log('Died:', cleanDF.filter(row => row.get('survived') === 'no').count()); // and 817 died passengers.


            /*Make table row data ready*/
            constructTable += `<tbody>`;
            for(let i=0; i<dataFrameJSON.year.length; i++){
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

            /*Make columns filtering ready*/
            let checkboxForColumnsHTML = "";
            for(let k in dataFrameJSON){
                checkboxForColumnsHTML += `<label class="checkbox-inline"><input type="checkbox" value=${k}><strong>${k}</strong></label>`;
            }
            
            $('#checkboxForColumns').empty();
            $('#checkboxForColumns').append(checkboxForColumnsHTML);

            // Attach a directly bound event handler
            //$( "#checkboxForColumns input[type=checkbox]" ).on("click", function( event ) {
                //event.preventDefault();
                //console.log( $( this ).val() );
            //});
            
            $( "#seeItBtn" ).on("click", function( event ) {
                let n = $( "#checkboxForColumns input:checked" ).length;
                console.log(n);
                let selectedChkBoxDataFilter = [];
                $.each($("#checkboxForColumns input:checked"), function(){            
                    selectedChkBoxDataFilter.push($(this).val());
                });
                console.log("Selected Data Filters are: " + selectedChkBoxDataFilter.join(", "));

                let filterObject = {};
                let filteredDf = dataFrame.select(selectedChkBoxDataFilter);
                console.log(filteredDf.show());

            });

        });
});
