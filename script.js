// reffrence to first table
let table1 = document.getElementById("table1");
// reffrence to the second table
let table2 = document.getElementById("table2");
//current data array
let data = [0,0,0];
let entries=0;

//raumdueeter
//creating an identifier for table 1 body
const t1=document.querySelector('#table1');
let pid=[];
//------------------------------------------------------------------
function addrow(){
    

    //loading the current data(user input) into current data array
    data[0] = document.getElementById("PID").value;
    data[1] = document.getElementById("AT").value;
    data[2] = document.getElementById("BT").value;
    if(data[0]==""|| data[1]=="" || data[2]==""){
        alert("No field can empty");
        return;
    }
    console.log(data[0]);
    if(data[1]<0){
        alert("Arrival time cannot be negative");
        return;
    }
    if(data[2]<0){
        alert("Burst time cannot be negative");
        return;
    }
    if((pid.includes(data[0]))){
        alert("Process id must be unique");
        return;
    }
    document.getElementById("tablebuttons").style.scale="100%";
    table1.style.scale="100%";
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
    pid.push(data[0]);
}

function resettable(){
    for(let k=0;k<entries;k++){
        document.getElementById("table1").deleteRow(1);
        
    }
    document.getElementById("tablebuttons").style.transform="scaleY(0%)";
    table1.style.transform="scaleY(0%)";
    pid=[];
    completed=[];
    entries=0;
}
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
    scheduler(inputarr);
}
let time=0;
let completed=[];
//this function would do the scheduling and get the completion time stored in an array which would be returned
function scheduler(input){
    let processQueue=[];//complete input
    let readyQueue=[];
    let no_of_processes=entries;
    
    
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
                    let temp=readyQueue[j];
                    temp.push(time);
                    temp.push((time-temp[1]));
                    temp.push((temp[4]-temp[2]));
                    completed.push(temp);
                    readyQueue.splice(j,1);
                    in_r--;
                    no_of_processes--;
                    // readyQueue[j].push(time);
                    c=1;
                    break;
                }
        }
        }
        if(c==0){
            time+=1;
        }   
        
    }

    let ret=readyQueue;
    console.log("output");
    console.log(completed);
    filltable(completed);
    return ret;    
}

function addroww(dt){
    //creating a new row
    var row = table1.insertRow();
    //loop to insert cells
    for(var i=0;i<6;i++){
        //creating and adding cell
        var cell = row.insertCell();
        //giving data to cell
        cell.innerHTML = dt[i];
    }
}
//------------------------------------------------------------------
// let dt = [[1,2,3],[4,5,6]]
function filltable(){
    for(let i=0;i<completed.length;i++){
        document.getElementById("table1").deleteRow(1);
    }
    for(let i=0;i<completed.length;i++){
        addroww(completed[i]);
    }
    create();
}
///
let box = document.getElementById("chart"); //refferne to the outer box
let divarray =[]; //array of all the div(smaller boxes) which will be added to the outer box
let i = -1;//index of the smaller boxes(divarray)
let dataa=[];
// for(let w=0;w<completed.length;w++){
//     dataa.push(completed[2]);
// }
let timer=0;//timer to print current time at the corner

let text; //append the current time to the smaler boxes
let col = ["red","#b30047"]; //random color cboose
//calling create function
function create(){
    for(let j=0;j<completed.length;j++){
        createDiv(); //creating smaller boxes equalent to the no. of elements in the burst time array
    }
    resizeDiv();//resizeing them
}
function createDiv(){
    let totaltime = time-1;
    i=i+1; //inc divarray index
    divarray[i]=document.createElement("div"); //create smaller box and add to divarray
    box.appendChild(divarray[i]); //appending to the main box
    text = document.createElement("span"); //creating text
    // timer = timer+ completed[i][2]; //setting the current time
    text.textContent = "P"+completed[i][0]+"("+(completed[i][3]-completed[i][2])+" - "+completed[i][3]+")";
    text.style.paddingTop = "50px"; //padding in order to put them at bottom of box
    divarray[i].appendChild(text); //appending to the smaller box
    divarray[i].style.display="flex"; //usng flex to automatically move the text
    divarray[i].style.justifyContent="center"; //moving the text to the right most corner
    divarray[i].style.backgroundColor = col[i%2]; //setting color
    divarray[i].style.border = "0.2px solid white"; //setting border
}
function resizeDiv(){
    let totaltime = time-1;
    for(let j=0;j<divarray.length;j++){
        divarray[j].style.width = ((completed[j][2]/totaltime)*100)+"%";
        console.log(totaltime);
        console.log(((completed[j][2]/totaltime)*100)+"%"); //setting width
    }
}
