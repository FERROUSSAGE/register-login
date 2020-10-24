'use strict';

let username = document.getElementById('username'),
    btnRegister = document.getElementById('register'),
    btnLogin = document.getElementById('login'),
    usersList = document.getElementById('list');


let usersData = [],
    date = new Date(),
    arrayMontsRU = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    arrayMontsEN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


    
const saveData = function(firsname, lastName, login, password, regData){
    let data = [firsname, lastName, login, password, regData];
 
    localStorage.setItem(data, JSON.stringify(data));
}
 
const getData = function(){

    for(let i = 0; i < localStorage.length; i++){
 
        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
 
        let newUser = {
            'firstname': data[0],
            'lastName': data[1],
            'login': data[2],
            'password': data[3],
            'regData': data[4]
        };
 
        usersData.push(newUser);
    }
}

const search = function(login, password){
    for(let i = 0; i < localStorage.length; i++){
 
        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        
        if(data[2] === login && data[3] === password){
            return {
                'firstname':data[0],
                'bool': true
            };
        }
    }
    return {
        'firstname': "Аноним",
        'bool': false
    };
}

const render = function(){

    usersList.textContent = '';

    usersData.forEach(function(item, i){
        let user = document.createElement('li');

        user.innerHTML = `<span>Имя: ${item.firstname}, ` + 
            `фамилия: ${item.lastName}, ` + 
            `зарегистрирован: ${item.regData} ` +
        `</span>` + 
        `<button id="delete" class="delete">X</button>`;
    
        usersList.append(user);

        let btnDelete = user.querySelector('.delete');

        btnDelete.addEventListener('click', function(){
            usersData.splice(i, 1);
            localStorage.removeItem(localStorage.key(i));
            username.textContent = "Аноним";
            render();
        });
    });

}

btnRegister.addEventListener('click', function(){

    let array,
        login,
        password,
        month = '',
        dateArray;
    
    do{
        array = prompt("Введите имя и фамилию").split(' ');
        console.log(array);
    } while(array.length > 2 || array[1] === undefined);

    login = prompt("Введите логин");
    password = prompt("Введите пароль");

    dateArray = date.toString().split(' ').slice(0, 5);
    
        for(let i = 0; i < arrayMontsRU.length; i++){
            
            if(dateArray[1] === arrayMontsEN[i]){
                month = arrayMontsRU[i];
            }
        }
    let regData = `${dateArray[2]} ${month} ${dateArray[3]} г. ${dateArray[4]}`;
    usersData.push({
        'firstname': array[0],
        'lastName': array[1],
        'login': login,
        'password': password,
        'regData': regData
    });

    saveData(array[0], array[1], login, password, regData);
    render();
});

btnLogin.addEventListener('click', function(){
    let login = '',
        password = '';

        login = prompt("Введите логин");
        password = prompt("Введите пароль");

        let user = search(login, password);

        if(user.bool){
            username.textContent = user.firstname;
        } else{
            alert("Пользователь не найден!");
            username.textContent = user.firstname;    
        }
});

getData();
render();

