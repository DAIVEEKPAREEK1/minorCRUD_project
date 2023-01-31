let formObj = {};
let formArr = [];

if (localStorage.getItem("formData")) {
  formArr = JSON.parse(localStorage.getItem("formData"))
}
function editFunction(id) {
  document.querySelector("form").setAttribute("onsubmit", `editForm(event, ${id})`);
  document.querySelector("#fullName").value = formArr[id].fullName;
  document.querySelector("#contactNum").value = formArr[id].contactNum;
  document.querySelector("#relation").value = formArr[id].relation;
}

function editForm(e, id) {
  e.preventDefault();
  console.log(id)

  let str = "!@,#$%^&*():'1234567890-_+=][{}\"";

  if (e.target.fullName.value == "" || e.target.contactNum.value == "" || e.target.relation.value == "") {
    alert("fill all the fields")
  }
  else if ((e.target.fullName.value.length <= 2 || e.target.fullName.value.length >= 20) || (e.target.contactNum.value.length < 10) || (e.target.relation.value.length <= 2 || e.target.relation.value.length >= 20)) {
    alert("please fill the field appropriately pura msg dalo")
  }
  else if (str.includes(e.target.fullName.value[e.target.fullName.value.length - 1])) {
    alert("fill all the fields")
  }
  else if (isNaN(e.target.contactNum.value)) {
    alert("enter only no.")
  }
  else {
    formArr[id].fullName = e.target.fullName.value;
    formArr[id].contactNum = e.target.contactNum.value;
    formArr[id].relation = e.target.relation.value;
    localStorage.setItem("formData", JSON.stringify(formArr));
    location.reload();
  }
}

function deleteFunction(id) {
  formArr.splice(id, 1);
  localStorage.setItem("formData", JSON.stringify(formArr))
  location.reload()
}
function validateForm(e) {
  e.preventDefault();

  let str = "!@,#$%^&*():'1234567890-_+=][{}\"";

  if (e.target.fullName.value == "" || e.target.contactNum.value == "" || e.target.relation.value == "") {
    alert("fill all the fields")
  }
  else if ((e.target.fullName.value.length <= 2 || e.target.fullName.value.length >= 20) || (e.target.contactNum.value.length < 10) || (e.target.relation.value.length <= 2 || e.target.relation.value.length >= 20)) {
    alert("please fill the field appropriately pura msg dalo")
  }
  else if (str.includes(e.target.fullName.value[e.target.fullName.value.length - 1])) {
    alert("fill all the fields")
  }
  else if (isNaN(e.target.contactNum.value)) {
    alert("enter only no.")
  }
  else {
    for (let i = 0; i < e.target.elements.length - 2; i++) {
      formObj = {
        ...formObj,
        [e.target.elements[i].id]: e.target.elements[i].value
      }
      e.target.elements[i].value = "";
    }
    formArr.push(formObj);
    localStorage.setItem("formData", JSON.stringify(formArr));
    location.reload();
  }
}
console.log(formArr)
if (formArr) {
  formArr.map((val, id) => {
    let tr = document.createElement("tr");
    let snoTd = document.createElement("td");
    let snoData = document.createTextNode(id + 1);
    snoTd.appendChild(snoData)
    tr.appendChild(snoTd)

    Object.keys(val).map((value, idx) => {
      if (value != "relation") {
        let td = document.createElement("td");
        let data = document.createTextNode(Object.values(val)[idx]);
        tr.appendChild(td);
        td.appendChild(data);

      }
    })
    let td = document.createElement("td");
    let deleteButton = document.createElement("button");
    let deletText = document.createTextNode("delete");
    deleteButton.appendChild(deletText);
    deleteButton.setAttribute("onclick", `deleteFunction(${id})`)
    let editButton = document.createElement("button");
    editButton.setAttribute("onclick", `editFunction(${id})`);
    let editText = document.createTextNode("edit");
    editButton.appendChild(editText);

    tr.appendChild(td);
    td.appendChild(deleteButton);
    td.appendChild(editButton);
    let tbody = document.querySelector("tbody");
    tbody.appendChild(tr);


  })
}
