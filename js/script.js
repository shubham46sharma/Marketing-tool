function handleFile(e) {
    //Get the files from Upload control
    var files = e.target.files;
    var i, f;
   

    //Loop through files

    for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
            var data = e.target.result;

            var result;
            var workbook = XLSX.read(data, { type: 'binary' });

            var sheet_name_list = workbook.SheetNames;
            sheet_name_list.forEach(function (y) { /* iterate through sheets */
                //Convert the cell value to Json
                var json = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                if (json.length > 0) {
                    result = json;
                }
            });
            
            //Get the first column first cell value
            for (i = 0; i < result.length; i++) {

                var x =
                
                    '<div class="col-md-4 mt-4 mb-4" id="card-block">' +
                    ' <div class="card" >' +
                    ' <div class="card-header">' + result[i]['Full Name'] + '</div>' +
                   
                    ' <div class="card-block">' +
                    
                    '<h4 class="card-title mt-3">NPI: ' + result[i]['NPI'] + '</h4>' +
                    '<h6 class="card-text mt-3"> ' + result[i]['Practice'] + '</h6>' +
                    ' </div>' +
                    '</div>' +
                    ' </div>';

                    $('#open-session').append(x);                
                $('.overlay_file_chooser').hide(500);
            }
        };
        reader.readAsArrayBuffer(f);
    }
}


function makeTable(array) {
    var table = document.createElement('table');
    for (var i = 0; i < array.length; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < array[i].length; j++) {
            var cell = document.createElement('td');
            cell.textContent = array[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}

$(document).ready(function () {
    $('#files').change(handleFile);

    // $( "#AHP, #NHNP, #PBACO" ).sortable({
    //     connectWith: "#open-session"
    // })
    $('#open-session').sortable({
        group: 'list',
        animation: 250,
        cursor: "grabbing",
        connectWith: [ "#AHP, #NHNP, #PBACO"]
        //dropOnEmpty: false

        
    });
    $('#AHP').sortable({
        group: 'ahp',
        animation: 250,
        cursor: "grabbing",
        connectWith: [ "#open-session, #NHNP, #PBACO"],
        //dropOnEmpty: false

        
    });
    $('#NHNP').sortable({
        group: 'nhnp',
        animation: 250,
        connectWith: [ "#open-session, #ahp, #PBACO"],
        //dropOnEmpty: false,
        cursor: "grabbing"
        
        
    });
    $('#PBACO').sortable({
        group: 'pbaco',
        animation: 250,
        connectWith: [ "#open-session, #NHNP, #ahp"],
        //dropOnEmpty: false,
        cursor: "grabbing"

        
    });
   

});


// List 2

//Change event to dropdownlist

