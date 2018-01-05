// JavaScript Document

//document.write("hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");

//document.getElementById("discardButton").onclick = function() {alert('Verwijderd');};

window.onload = function (){
	// Knoppen
	var quickAddBtn = document.getElementById("quickAdd");
	var btnPOP = document.getElementById('addPOP');
	var POP = document.querySelector(".POP");
	var addBtn = document.getElementById("Add");
	var cancelBtn = document.getElementById("Cancel");
	var quickAddFormDiv = document.querySelector('.quickaddForm');
	
	var contactlistBtn = document.getElementById("contactlist");
	//var editEntry = document.getElementByClass(".edit");
	
	//var entry = document.querySelector(".addbook");
	
	// Velden 
	var fullname = document.getElementById("fullname");
	var phone = document.getElementById("phone");
	var address = document.getElementById("address");
	var city = document.getElementById("city");
	var email  = document.getElementById("email");
	
	// Display adresboek
	var addBookDiv = document.querySelector(".addbook");
	
	// Create Storage Array
	var addressBook = [];
	
	// Eventlisteners
	quickAddBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "block";
		addBookDiv.style.display = "none";
		POP.style.display = "none";
		Cancel.style.display = "inline-block";
	});
		
	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});
	
	addBtn.addEventListener("click", addToBook);
	
	addBookDiv.addEventListener("click", remEntry);
	
	// Pop pagina
	btnPOP.addEventListener("click", showPOP);
	
	// Contactlist pagina
	contactlistBtn.addEventListener("click", function(){
		addBookDiv.style.display = "block";
		POP.style.display = "none";
		quickAddFormDiv.style.display = "none";
	});
	
	//edit knop
	addBookDiv.addEventListener("click", editEntry);
	
/*
//Dropdown delay
	var delay=1000, setTimeoutConst;
	$('.docHeader2').on('mouseover', function() {
			setTimeoutConst = setTimeout(function(){
				pPop.style.display = "inline-block";
			}, delay);
		}, function(){
				clearTimeout(setTimeoutConst);
		}
	);
*/


	
//Functions
	
	function showPOP(){
		quickAddFormDiv.style.display = "none";
		addBookDiv.style.display = "none";
		POP.style.display = "block";
		/*btnPOP.addEventListener("click", function()
		 {
			POP.style.display = "none";
		});
		*/
	}
	
	function formArray(fullname, phone, address, city, email){
		this.fullname = fullname;
		this.phone = phone;
		this.address = address;
		this.city = city;
		this.email = email;
	}
	
	function addToBook(){
		var isNull = fullname.value!='' && phone.value!='' && address.value!='' && city.value!='' && email.value!='';
		if(isNull){
			//add content form to array and localstorage
			var obj = new formArray(fullname.value, phone.value, address.value, city.value, email.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			// Verberg na voltooien
			quickAddFormDiv.style.display = "none";
			// Clear formulier
			clearForm();
			// laat info zien bij opslaan
			showAddressBook();
			clearForm();
		}
		else{
			alert("Niet alle velden zijn ingevuld");
		}
	}
	
	function clearForm(){
		var form = document.querySelectorAll(".formFields");
		for (var x in form){
			form[x].value = '';
		}
	}
	
	function showAddressBook(){
		// check key 'addbook' in localstorage or else create
		if (localStorage['addbook'] === undefined){
			localStorage['addbook'] = "[]";
		}
		else {
			addressBook = JSON.parse(localStorage['addbook']);
			addBookDiv.innerHTML = '';
			for (var n in addressBook){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
					str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
					str += '<div class="city"><p>' + addressBook[n].city + '</p></div>';
					str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					str += '<div class="edit"><a href="#" class="editBtn" edit-id="' + n +'">Edit</a></div>';
					str += '<div class="del"><a href="#" class="delbtn" data-id="' + n +'">Delete</a></div>';
					str += '</div>';
					addBookDiv.innerHTML += str;
			}
		}
	}
	
	function remEntry(e){
		if(e.target.classList.contains("delbtn")){
			var remNum = e.target.getAttribute("data-id");
			addressBook.splice(remNum, 1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}
		function editEntry(e){
		if(e.target.classList.contains("editBtn")){
			var editID = e.target.getAttribute("edit-id");
			localStorage['addressBook'] = JSON.stringify(addressBook);
			document.getElementById("fullname").value = addressBook[e.target.getAttribute("edit-id")].fullname;
			document.getElementById("phone").value = addressBook[e.target.getAttribute("edit-id")].phone;
			document.getElementById("address").value = addressBook[e.target.getAttribute("edit-id")].address;
			document.getElementById("city").value = addressBook[e.target.getAttribute("edit-id")].city;
			document.getElementById("email").value = addressBook[e.target.getAttribute("edit-id")].email;

			addressBook.splice(editID,1);
			quickAddFormDiv.style.display = "block";
			Cancel.style.display = "none";
		}
	}
};