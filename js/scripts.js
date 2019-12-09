/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests
 * script.js */


const gallery = document.getElementById('gallery');

//--------------------------------------
// Fetch Functions
//--------------------------------------

fetch('https://randomuser.me/api/?results=12&nat=us')
	.then(response => response.json())
	.then(data => generateUserData(data.results))
	
//--------------------------------------
// Helper Functions
//--------------------------------------

function generateUserData(data){

// Get the 12 random users and append them to the parend div gallery
	users = data.map( user => 
		`<div class="card">
		 	<div class="card-img-container">
		 		<img class="card-img" src='${user.picture.large}' alt='profile picture'>
		 	</div>		
			<div class="card-info-container">
		 		<h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
		 		<p class="card-text">${user.email}</p>
		 		<p class="card-text cap">${user.location.city}, ${user.location.state}</p>
		 	</div>
		</div>
	`).join('');

	gallery.innerHTML = users;

	const cards = gallery.querySelectorAll('.card');  // global scope for use throughout

   	// Load our data properties for the modal window. 
   	// Loop through divs of cards and identify the name element in each card div
	// On click we compare the cards name with the name in our data array of object names. 
	// When there is a match build the modal data

	data.map(user => {
		
		cards.forEach( card => { 

			const staff = card.children[1].children[0].innerText;
			const name = `${user.name.first} ${user.name.last}`;

				card.addEventListener('click', function(){	 		
				 	//start if statement
					if (staff == name){		 				 		
					 	const modalHTML = 
					 	`<div class="modal-container">
		            		<div class="modal">
		    					<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
		                	<div class="modal-info-container">
		              	  		<img class="modal-img" src='${user.picture.large}' alt="profile picture">
		                		<h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
		                		<p class="modal-text">${user.email}</p>
		               			<p class="modal-text cap">${user.location.city}</p>
		                 	<hr>
		                		<p class="modal-text">${user.phone}</p>
		                		<p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.state}  ${user.location.postcode}</p>
		                		<p class="modal-text">Birthday: ` + formatDate(user.dob.date) + `</p>
		            		</div>
		       			</div>		       			
		       			`;

		       		// Append modal html elements to document
		       			gallery.insertAdjacentHTML('afterend', modalHTML);

				   	// Close the modal window	
		     			const closeBtn = document.querySelector('button');
		     			const modal = document.querySelector('.modal-container');
				
								closeBtn.addEventListener('click', function(){
				    				modal.style.display = 'none';
				    			});

					} // end if 
					
				}) // End click event
				
		});	// End ForEach Loop	 

	});	// End map method 
   
  			// add search field	
			const search = document.querySelector('.search-container');
			const searchHTML = 
				`<form action="#" method="get">
	                <input type="search" id="search-input" class="search-input" placeholder="Search...">
	                <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
	            </form>`;

	    	search.innerHTML = searchHTML;   
	    	
	    	// end append search fields
	 		
		 		cards.forEach(card => {

		 			const searchSubmit = document.getElementById('search-submit');

			    	searchSubmit.addEventListener('click', function(){	
						const searchVal = document.getElementById('search-input').value;
			    		const findstaff = card.children[1].children[0].innerText;

			    		const employee = findstaff.toLowerCase();
			    		const inputVal = searchVal.toLowerCase();	
    		
				    		if(inputVal == ""){
		   						gallery.innerHTML = users;
		   					}
		   					else if(employee.includes(inputVal) && inputVal.length > 2){
		   						gallery.innerHTML = "";
		   						gallery.append(card);
		   					}   					
			    	});
	   			
	   				

	   			})
	


}
	
// Function to format Birthday		
function formatDate(date){
		let bday = new Date(date);
		let month = bday.getMonth()+1; 
		let day = bday.getDate();
		let year = bday.getFullYear();

			if(month < 10){
				month = '0'+ month;	}
			if(day < 10){ 
				day = '0' + day; }

			return month+"/"+day+"/"+year;
}		