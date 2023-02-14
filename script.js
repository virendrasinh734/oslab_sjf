// reffrence to first table
let table1 = document.getElementById("table1");
// reffrence to the second table
let table2 = document.getElementById("table2");
//current data array
let data = [0,0,0];
let entries=0;

//raumdueeter
//creating an identifier for table 1 body
const t1=document.querySelector('#som');

//------------------------------------------------------------------
function addrow(){
    //loading the current data(user input) into current data array
    data[0] = document.getElementById("PID").value;
    data[1] = document.getElementById("AT").value;
    data[2] = document.getElementById("BT").value;

    //creating table row in the html page using the below code
    const tr=document.createElement('tr');
    const td1=document.createElement('td');
    const td2=document.createElement('td');
    const td3=document.createElement('td');
    //putting the data collected from user into this table
    td1.textContent=data[0];
    td2.textContent=data[1];
    td3.textContent=data[2];
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    //appending the row into the table body
    t1.appendChild(tr);

    //extra code
    //creating a new row
    // var row = table1.insertRow();
    // //loop to insert cells
    // for(var i=0;i<3;i++){
    //     //creating and adding cell
    //     var cell = row.insertCell(i);
    //     //giving data to cell
    //     cell.innerHTML = data[i];
    // }
    entries+=1;
}
//------------------------------------------------------------------
function data_extractor(){
    let inputarr=[]
    for(let i=1;i<=entries;i++){
        let a1=parseInt(document.getElementById("table1").rows[i].cells[0].innerHTML);
        let a2=parseInt(document.getElementById("table1").rows[i].cells[1].innerHTML);
        let a3=parseInt(document.getElementById("table1").rows[i].cells[2].innerHTML);
        let arr=[a1,a2,a3];
        inputarr.push(arr);
    }
    console.log("This is the input array");
    console.log(inputarr);
    calculate_compT(inputarr);
}

//this function would do the scheduling and get the completion time stored in an array which would be returned
function scheduler(input){
    let processQueue=[];//complete input
    let readyQueue=[];
    let no_of_processes=4;
    let time=0;
    while(no_of_processes>0){
        let in_r=0;
        let c=0;
        for(let i=0;i<input.length;i++){
            if(time>=input[i][1] && !(readyQueue.includes(input[i]))){
                readyQueue.push(input[i]);
                in_r+=1;
            }
        }
        if(in_r>0)
        {
            let min=1000;
            for(let j=0;j<readyQueue.length;j++){
                if(readyQueue[j][2]<min && readyQueue[j].length==3){
                    min=readyQueue[j][2];
                }
            }
            for(let j=0;j<readyQueue.length;j++){
                if(readyQueue[j][2]==min){
                    time+=readyQueue[j][2];
                    readyQueue[j].push(time);
                    c=1;
                    break;
                }
        }
        }
        if(c==0){
            time+=1;
        }   
        no_of_processes--;
    }

    let ret=readyQueue;
    console.log("output");
    console.log(readyQueue);
    return ret;    
}