const list = [
    {
        "desc": "rice",
        "amount": 1,
        "value": 5.4
    },
    {
        "desc": "milk",
        "amount": 1,
        "value": 2.4
    },
    {
        "desc": "bread",
        "amount": 1,
        "value": 3.4
    }
];

function getTotal (list){
    let total = 0
    for (let key in list) {
        total += list[key].amount * list[key].value;
    }
    return total;
}

function setList (list){
    let table = '<thead><tr><td> Description </td><td> Amount </td><td> Value </td><td> Action </td></tr></thead><tbody>';
    for (let key in list) {
        table += '<tr><td>' + formatDesc(list[key].desc) + '</td><td>' + list[key].amount + '</td><td>' + formatValue(list[key].value) + '</td><td><button class="btn btn-info">Edit</button>|<button class="btn btn-danger">Delete</button>  </td></tr>';
    }
    table += '</tbody>';
    document.getElementById('listTable').innerHTML = table;
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
setList(list);
console.log(getTotal(list));