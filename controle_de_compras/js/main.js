const list = [];

function getTotal (list){
    let total = 0
    for (let key in list) {
        total += list[key].amount * list[key].value;
    }
    document.getElementById('totalValue').innerHTML = formatValue(total);
}

function setList (list){
    let table = '<thead><tr><td> Description </td><td> Amount </td><td> Value </td><td> Action </td></tr></thead><tbody>';
    for (let key in list) {
        table += '<tr><td>' + formatDesc(list[key].desc) + '</td><td>' + formatAmount(list[key].amount)  + '</td><td>' + formatValue(list[key].value) + '</td><td><button class="btn btn-info" onclick="setUpdateData('+key+')">Edit</button>  |  <button class="btn btn-danger" onclick="deleteData('+key+')">Delete</button>  </td></tr>';
    }
    table += '</tbody>';
    document.getElementById('listTable').innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

function formatDesc (desc){
    return desc.charAt(0).toUpperCase() + desc.slice(1);
}

function formatValue (value){
    let str = parseFloat(value).toFixed(2) + '';
    str = str.replace('.', ',');
    str = "$ " + str;
    return str;
}
function formatAmount (amount){
    return parseInt(amount);
}

function addData(){
    if(!validation()){
        return;
    }
    const desc = document.getElementById('desc').value;
    const amount = document.getElementById('amount').value;
    const value = document.getElementById('value').value;

    list.unshift({
        "desc": desc,
        "amount": amount,
        "value": value
    })
    setList(list);
    resetForm();
}

function setUpdateData(id){
    let obj = list[id];
    document.getElementById('desc').value = obj.desc;
    document.getElementById('amount').value = obj.amount;
    document.getElementById('value').value = obj.value;
    document.getElementById('btnUpdate').style.display = 'block';
    document.getElementById('btnAdd').style.display = 'none';

    document.getElementById("inputIDUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">';
}

function resetForm(){
    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('value').value = '';
    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById('btnAdd').style.display = 'block';
    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById('erro').style.display = 'none';
}

function updateData (){
    const id = document.getElementById('idUpdate').value;
    document.getElementById('desc').value;
    document.getElementById('amount').value;
    document.getElementById('value').value;
    list[id] = {
        "desc": document.getElementById('desc').value,
        "amount": document.getElementById('amount').value,
        "value": document.getElementById('value').value
    }
    resetForm();
    setList(list);
}

function deleteData(id){
    if(confirm("Are you sure you want to delete this item?")){
        list.splice(id, 1);
        setList(list);
    }
}

function validation(){
    let desc = document.getElementById('desc');
    let amount = document.getElementById('amount');
    let value = document.getElementById('value');

    let error = ""
    if(desc.value == ''){
        error += '<p class=text-danger>Description is required!</p>';
    }
    if (amount.value == ''){
        error += '<p class=text-danger>Amount is required!</p>';
    } else if (isNaN(amount.value)){
        error += '<p class=text-danger>Amount must be a number!</p>';
    }
    if (value.value == ''){
        error += '<p class=text-danger>Value is required!</p>';
    } else if(isNaN(value.value)){
        error += '<p class=text-danger>Value must be a number!</p>';
    }

    if(error!= ""){
        document.getElementById('erro').style.display = 'block';
        document.getElementById('erro').innerHTML ="<strong class='text-danger'>Erro: </strong>" +  error;
        return false;
    }
    return true;
}
function deleteList(){
    if(confirm("Are you sure you want to delete all items?")){
        let list = [];
        setList(list);
    }
}

function saveListStorage(list){
    let jsonString = JSON.stringify(list);
    localStorage.setItem('list', jsonString);
}

function initListStorage(){
    let jsonString = localStorage.getItem('list');
    let list = [];
    if(jsonString){
        list = JSON.parse(jsonString);
        setList(list);
    } 
    setList(list);
}

initListStorage();