const main = document.getElementById('main');
const allUsers = document.getElementById('all-users');
const userInfo = document.getElementById('user-info');

let allNames = []


let allUserData = []

const contentUsers = document.getElementById('content-users')

const allUsersCheck = document.getElementById('select-all-users')
const deleteAllButton = document.getElementById('delete-all-users')

let allUsersButton = Array.from(document.querySelectorAll('.content__users .button'))
let allUsersChecks = Array.from(document.querySelectorAll('.content__users .content__checkbox'))

const topBarTitle = document.getElementById('top-bar__title')


const addUserButton = document.getElementById('add-user');
const editUserButton = document.getElementById('update-user');

const searchText = document.getElementById('search-text')


//Caputar campos del Firmulario
const userName = document.getElementById('user-info-name')
const userSurname = document.getElementById('user-info-surname')
const userEmail = document.getElementById('user-info-email')

let newUser = true

const showUserInfo = ()=>{
    allUsers.classList.add('all-users--hide')
    userInfo.classList.add('user-info--show')
}

const hiddeUserInfo = ()=>{
    allUsers.classList.remove('all-users--hide')
    userInfo.classList.remove('user-info--show')
}
const selectUser = (id) =>{
    const element = document.getElementById(id).firstChild;

    allUsersButton = Array.from(document.querySelectorAll('.content__users .button'))
    allUsersChecks = Array.from(document.querySelectorAll('.content__users .content__checkbox'))
    console.log(element);
    if(element.checked){
        allUsersChecks.map(check => check.checked = false)
        element.checked = true
        console.log("Entró");
        allUsersButton.map(button => button.classList.add('button--hide')) //Oculta los Botones
        Array.from(element.parentElement.querySelectorAll('.button')).map(button => button.classList.remove('button--hide'))
    }else{
        allUsersButton.map(button => button.classList.remove('button--hide'))
        console.log("No Entró");
    }
    console.log("HEHE");
}

const selectAlllUsers = () =>{
    allUsersButton = Array.from(document.querySelectorAll('.content__users .button'))
    allUsersChecks = Array.from(document.querySelectorAll('.content__users .content__checkbox'))

    if(allUsersCheck.checked){
        allUsersChecks.map(check => check.checked =true)
        allUsersButton.map(button =>button.classList.add('button--hide'))
        deleteAllButton.classList.remove('button--hide')
        console.log("Hola1");
    }else{
        allUsersChecks.map(check => check.checked =false)
        allUsersButton.map(button =>button.classList.remove('button--hide'))
        deleteAllButton.classList.add('button--hide')
        console.log("hola2");
    }
}
const add_user = ()=>{
    topBarTitle.textContent = 'New User'
    addUserButton.classList.remove('button--hide');
    editUserButton.classList.add('button--hide');
}
const save_user = (id)=>{
    topBarTitle.textContent = 'Edit User'
    addUserButton.classList.add('button--hide');
    editUserButton.classList.remove('button--hide');

    const user = getUserId(id)

    userName.value = user.name
    userSurname.value = user.surname
    userEmail.value = user.email

    editUserButton.dataset.id = user.id
}
//Conseguir ID
const getUserId = (id) =>{
    id = id.substring(id.lastIndexOf('-')+1)
    return allUserData.filter(user => user.id == id)[0]
}
const getAllUsers = ()=>{
    const path = ('php/read-all.php')

    fetch(path)
        .then(response => (response.ok) ? Promise.resolve(response) : Promise.reject(new Error("Fail To Load")))
        .then(response => response.json())
        .then(data =>{
            allUserData = data
            console.log(allUserData)
            const fragment = document.createDocumentFragment()
            for (const user of data) {
                fragment.appendChild(createUserRow(user))
            }
            contentUsers.innerHTML = '' //Se borran los datos
            contentUsers.appendChild(fragment)

            allNames = Array.from(document.querySelectorAll('[data-name]'))
            console.log(allNames)
        })
    .catch((error) => console.log(`Error : ${error.message}`))
}
const createUserRow = (user) =>{
    const fragment = document.createDocumentFragment();

    let userRow = document.createElement('DIV')
    userRow.classList.add('content__user')
    userRow.id = `id-${user.id}`


    let userCheck = document.createElement('INPUT')
    userCheck.setAttribute('type','checkbox')
    userCheck.setAttribute('class','content__checkbox')
    userRow.appendChild(userCheck)


    let userName = document.createElement('P')
    userName.dataset.name = user.name.toLowerCase()
    userName.classList.add('content__text')
    userName.textContent = user.name

    userRow.appendChild(userName)



    let userSurname = document.createElement('P')
    userSurname.classList.add('content__text')
    userSurname.textContent = user.surname

    userRow.appendChild(userSurname)


    let userEmail = document.createElement('P')
    userEmail.classList.add('content__text','content__text--email')
    userEmail.textContent = user.email

    userRow.appendChild(userEmail)


    let buttonEdit = document.createElement('A')
    buttonEdit.classList.add('content__link','button','button--edit')
    buttonEdit.textContent = 'Edit'
    buttonEdit.id = `edit-user-${user.id}`

    let buttonIcon = document.createElement('I')
    buttonIcon.classList.add('fas','fa-pen')

    buttonEdit.appendChild(buttonIcon)

    userRow.appendChild(buttonEdit)


    let buttonDelete = document.createElement('A')
    buttonDelete.classList.add('content__link','button','button--delete')
    buttonDelete.textContent = 'Delete'
    buttonDelete.id = `delete-user-${user.id}`

    buttonIcon = document.createElement('I')
    buttonIcon.classList.add('fas','fa-trash')

    buttonDelete.appendChild(buttonIcon)

    userRow.appendChild(buttonDelete)


    fragment.appendChild(userRow)

    return fragment

}
const insertUser = ()=>{
    console.log("Añadir");
    const path = ('php/insert.php')

    const formData = new FormData()
    formData.append('name',userName.value.toLowerCase());
    formData.append('surname',userSurname.value.toLowerCase())
    formData.append('email',userEmail.value.toLowerCase())

    fetch(path,{
        method: 'POST',
        body: formData
    })
        .then(response => (response.ok) ? Promise.resolve(response) : Promise.reject(new Error("Fail To Load")))
        .then(response => response.text())
        .then(data =>{
            if(data === 'OK'){
                //Resetear Formulario
                resetForm()
                getAllUsers()
                hiddeUserInfo()
            }
        })
    .catch((error) => console.log(`Error : ${error.message}`))
}
const updateUser = () =>{
    console.log("Actualizar");
    const path = ('php/update.php')

    const formData = new FormData()
    formData.append('id',editUserButton.dataset.id)
    formData.append('name',userName.value.toLowerCase());
    formData.append('surname',userSurname.value.toLowerCase())
    formData.append('email',userEmail.value.toLowerCase())

    fetch(path,{
        method: 'POST',
        body: formData
    })
        .then(response => (response.ok) ? Promise.resolve(response) : Promise.reject(new Error("Fail To Load")))
        .then(response => response.text())
        .then(data =>{
            if(data === 'OK'){
                //Resetear Formulario
                resetForm()
                getAllUsers()
                hiddeUserInfo()
            }
        })
    .catch((error) => console.log(`Error : ${error.message}`))
}
const deleteUser = (id) =>{
    console.log("Actualizar");
    const path = ('php/delete.php')

    id = getUserId(id).id;

    const formData = new FormData()
    formData.append('id',id)
    fetch(path,{
        method: 'POST',
        body: formData
    })
        .then(response => (response.ok) ? Promise.resolve(response) : Promise.reject(new Error("Fail To Load")))
        .then(response => response.text())
        .then(data =>{
            if(data === 'OK'){
                location.href = 'http://localhost/Crud/public'
            }
        })
    .catch((error) => console.log(`Error : ${error.message}`))
}
const resetForm = () =>{
    userName.value = '';
    userSurname.value = ''
    userName.value = ''
}
main.addEventListener('click',(e)=>{
    // console.log(e.target);
    if(e.target.classList.contains('top-bar__user-info') || e.target.classList.contains('fa-plus')){
        newUser = true
        add_user();
        showUserInfo()
    }else if(e.target.classList.contains('button--cancel')){
        hiddeUserInfo()
    }else if(e.target.parentElement.classList.contains('content__user')){
        console.log("HEHE");
        selectUser(e.target.parentElement.id)
        console.log(e.target.parentElement.id)
    }else if(e.target.id === 'select-all-users'){
        selectAlllUsers()
        console.log(e.target.id);
    }else if(e.target.id.indexOf('edit-user') != -1){
        newUser = false
        save_user(e.target.id)
        showUserInfo()
    }else if(e.target.id == 'add-user'){
        insertUser();
    }else if(e.target.id == 'update-user'){
        updateUser();
    }else if(e.target.id.indexOf('delete-user')!=-1){
        deleteUser(e.target.id)
    }
})

//let allNames = Array.from(document.querySelectorAll('[data-name]'))
//console.log(allNames)

searchText.addEventListener('keyup',(e)=>{
    let value = searchText.value.toLowerCase()

    if(value == ''){
        for (const name of allNames) {
            name.parentElement.style.display = 'grid'
            console.log(name.parentElement);
        }
    }
    for (const name of allNames) {
        if(name.dataset.name.indexOf(value) == -1){
            name.parentElement.style.display = 'none'
        }else{
            name.parentElement.style.display = 'grid'
        }
    }
})

getAllUsers();
