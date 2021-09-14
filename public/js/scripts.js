"use strict";function _createForOfIteratorHelper(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){l=!0,a=e},f:function(){try{s||null==n.return||n.return()}finally{if(l)throw a}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var main=document.getElementById("main"),allUsers=document.getElementById("all-users"),userInfo=document.getElementById("user-info"),allNames=[],allUserData=[],contentUsers=document.getElementById("content-users"),allUsersCheck=document.getElementById("select-all-users"),deleteAllButton=document.getElementById("delete-all-users"),allUsersButton=Array.from(document.querySelectorAll(".content__users .button")),allUsersChecks=Array.from(document.querySelectorAll(".content__users .content__checkbox")),topBarTitle=document.getElementById("top-bar__title"),addUserButton=document.getElementById("add-user"),editUserButton=document.getElementById("update-user"),searchText=document.getElementById("search-text"),userName=document.getElementById("user-info-name"),userSurname=document.getElementById("user-info-surname"),userEmail=document.getElementById("user-info-email"),newUser=!0,showUserInfo=function(){allUsers.classList.add("all-users--hide"),userInfo.classList.add("user-info--show")},hiddeUserInfo=function(){allUsers.classList.remove("all-users--hide"),userInfo.classList.remove("user-info--show")},selectUser=function(e){var t=document.getElementById(e).firstChild;allUsersButton=Array.from(document.querySelectorAll(".content__users .button")),allUsersChecks=Array.from(document.querySelectorAll(".content__users .content__checkbox")),console.log(t),t.checked?(allUsersChecks.map(function(e){return e.checked=!1}),t.checked=!0,console.log("Entró"),allUsersButton.map(function(e){return e.classList.add("button--hide")}),Array.from(t.parentElement.querySelectorAll(".button")).map(function(e){return e.classList.remove("button--hide")})):(allUsersButton.map(function(e){return e.classList.remove("button--hide")}),console.log("No Entró")),console.log("HEHE")},selectAlllUsers=function(){allUsersButton=Array.from(document.querySelectorAll(".content__users .button")),allUsersChecks=Array.from(document.querySelectorAll(".content__users .content__checkbox")),allUsersCheck.checked?(allUsersChecks.map(function(e){return e.checked=!0}),allUsersButton.map(function(e){return e.classList.add("button--hide")}),deleteAllButton.classList.remove("button--hide"),console.log("Hola1")):(allUsersChecks.map(function(e){return e.checked=!1}),allUsersButton.map(function(e){return e.classList.remove("button--hide")}),deleteAllButton.classList.add("button--hide"),console.log("hola2"))},add_user=function(){topBarTitle.textContent="New User",addUserButton.classList.remove("button--hide"),editUserButton.classList.add("button--hide")},save_user=function(e){topBarTitle.textContent="Edit User",addUserButton.classList.add("button--hide"),editUserButton.classList.remove("button--hide");var t=getUserId(e);userName.value=t.name,userSurname.value=t.surname,userEmail.value=t.email,editUserButton.dataset.id=t.id},getUserId=function(t){return t=t.substring(t.lastIndexOf("-")+1),allUserData.filter(function(e){return e.id==t})[0]},getAllUsers=function(){fetch("php/read-all.php").then(function(e){return e.ok?Promise.resolve(e):Promise.reject(new Error("Fail To Load"))}).then(function(e){return e.json()}).then(function(e){allUserData=e,console.log(allUserData);var t,n=document.createDocumentFragment(),r=_createForOfIteratorHelper(e);try{for(r.s();!(t=r.n()).done;){var o=t.value;n.appendChild(createUserRow(o))}}catch(e){r.e(e)}finally{r.f()}contentUsers.innerHTML="",contentUsers.appendChild(n),allNames=Array.from(document.querySelectorAll("[data-name]")),console.log(allNames)}).catch(function(e){return console.log("Error : ".concat(e.message))})},createUserRow=function(e){var t=document.createDocumentFragment(),n=document.createElement("DIV");n.classList.add("content__user"),n.id="id-".concat(e.id);var r=document.createElement("INPUT");r.setAttribute("type","checkbox"),r.setAttribute("class","content__checkbox"),n.appendChild(r);var o=document.createElement("P");o.dataset.name=e.name.toLowerCase(),o.classList.add("content__text"),o.textContent=e.name,n.appendChild(o);var a=document.createElement("P");a.classList.add("content__text"),a.textContent=e.surname,n.appendChild(a);var s=document.createElement("P");s.classList.add("content__text","content__text--email"),s.textContent=e.email,n.appendChild(s);var l=document.createElement("A");l.classList.add("content__link","button","button--edit"),l.textContent="Edit",l.id="edit-user-".concat(e.id);var c=document.createElement("I");c.classList.add("fas","fa-pen"),l.appendChild(c),n.appendChild(l);var u=document.createElement("A");return u.classList.add("content__link","button","button--delete"),u.textContent="Delete",u.id="delete-user-".concat(e.id),(c=document.createElement("I")).classList.add("fas","fa-trash"),u.appendChild(c),n.appendChild(u),t.appendChild(n),t},insertUser=function(){console.log("Añadir");var e=new FormData;e.append("name",userName.value.toLowerCase()),e.append("surname",userSurname.value.toLowerCase()),e.append("email",userEmail.value.toLowerCase()),fetch("php/insert.php",{method:"POST",body:e}).then(function(e){return e.ok?Promise.resolve(e):Promise.reject(new Error("Fail To Load"))}).then(function(e){return e.text()}).then(function(e){"OK"===e&&(resetForm(),getAllUsers(),hiddeUserInfo())}).catch(function(e){return console.log("Error : ".concat(e.message))})},updateUser=function(){console.log("Actualizar");var e=new FormData;e.append("id",editUserButton.dataset.id),e.append("name",userName.value.toLowerCase()),e.append("surname",userSurname.value.toLowerCase()),e.append("email",userEmail.value.toLowerCase()),fetch("php/update.php",{method:"POST",body:e}).then(function(e){return e.ok?Promise.resolve(e):Promise.reject(new Error("Fail To Load"))}).then(function(e){return e.text()}).then(function(e){"OK"===e&&(resetForm(),getAllUsers(),hiddeUserInfo())}).catch(function(e){return console.log("Error : ".concat(e.message))})},deleteUser=function(e){console.log("Actualizar");e=getUserId(e).id;var t=new FormData;t.append("id",e),fetch("php/delete.php",{method:"POST",body:t}).then(function(e){return e.ok?Promise.resolve(e):Promise.reject(new Error("Fail To Load"))}).then(function(e){return e.text()}).then(function(e){"OK"===e&&(location.href="http://localhost/Crud/public")}).catch(function(e){return console.log("Error : ".concat(e.message))})},resetForm=function(){userName.value="",userSurname.value="",userName.value=""};main.addEventListener("click",function(e){e.target.classList.contains("top-bar__user-info")||e.target.classList.contains("fa-plus")?(newUser=!0,add_user(),showUserInfo()):e.target.classList.contains("button--cancel")?hiddeUserInfo():e.target.parentElement.classList.contains("content__user")?(console.log("HEHE"),selectUser(e.target.parentElement.id),console.log(e.target.parentElement.id)):"select-all-users"===e.target.id?(selectAlllUsers(),console.log(e.target.id)):-1!=e.target.id.indexOf("edit-user")?(newUser=!1,save_user(e.target.id),showUserInfo()):"add-user"==e.target.id?insertUser():"update-user"==e.target.id?updateUser():-1!=e.target.id.indexOf("delete-user")&&deleteUser(e.target.id)}),searchText.addEventListener("keyup",function(e){var t=searchText.value.toLowerCase();if(""==t){var n,r=_createForOfIteratorHelper(allNames);try{for(r.s();!(n=r.n()).done;){var o=n.value;o.parentElement.style.display="grid",console.log(o.parentElement)}}catch(e){r.e(e)}finally{r.f()}}var a,s=_createForOfIteratorHelper(allNames);try{for(s.s();!(a=s.n()).done;){var l=a.value;-1==l.dataset.name.indexOf(t)?l.parentElement.style.display="none":l.parentElement.style.display="grid"}}catch(e){s.e(e)}finally{s.f()}}),getAllUsers();