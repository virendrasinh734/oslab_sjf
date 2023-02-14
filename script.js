// reffrence to first table
let table1 = document.getElementById("table1");
// reffrence to the second table
let table2 = document.getElementById("table2");
//current data array
let data = [0,0,0];


//raumdueeter
const t1=document.querySelector('#som');


//------------------------------------------------------------------
function addrow(){
    //loading the current data(user input) into current data array
    data[0] = document.getElementById("PID").value;
    data[1] = document.getElementById("AT").value;
    data[2] = document.getElementById("BT").value;
    const tr=document.createElement('tr');
    const td1=document.createElement('td');
    const td2=document.createElement('td');
    const td3=document.createElement('td');
    td1.textContent=data[0];
    td2.textContent=data[1];
    td3.textContent=data[2];
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    t1.appendChild(tr);

    //creating a new row
    // var row = table1.insertRow();
    // //loop to insert cells
    // for(var i=0;i<3;i++){
    //     //creating and adding cell
    //     var cell = row.insertCell(i);
    //     //giving data to cell
    //     cell.innerHTML = data[i];
    // }
}
//------------------------------------------------------------------