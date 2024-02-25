// Purpose: To render the partners.json data to the page and filter the data based on the type of partnership.


function changeText() {
    document.getElementById("main-text").innerHTML = "Partnerships are now available!";
}

fetch('/partners')
    .then(response => response.json())
    .then(data => {
        const partnerListElement = document.getElementById('partner-list');
        const typeFilterElement = document.getElementById('type-filter');

        function renderPartners(partners) {
            partnerListElement.innerHTML = partners.map(partner => createPartnerCard(partner)).join('');
        }

        function createPartnerCard(partner) {
            return `
                <div class="partner-card">
                    <h2>${partner.name}</h2>
                    <p class="partner-type">${capitalizeFirstLetter(partner.type)}</p>
                    <p class="partner-location">${partner.location}</p>
                    <p class="partner-description">${partner.description}</p>
                    <p class="partner-contact">Contact: ${partner.contact}</p>
                    <button class="apply-button">Enroll</button>
                </div>
            `;
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function filterPartners() {
            const typeFilter = typeFilterElement.value;
            const filteredPartners = (typeFilter === 'all') ? data.partners : data.partners.filter(partner => partner.type === typeFilter);
            renderPartners(filteredPartners);
        }

        renderPartners(data.partners);

        typeFilterElement.addEventListener('change', filterPartners);

        document.querySelectorAll('.apply-button').forEach(button => {
            button.addEventListener('click', () => {
                alert('Here is the partnership application form.');
            });
        });
    }); 

    document.addEventListener("DOMContentLoaded", function() {
        // Check if user is admin and show/hide "Add Info" tab and section accordingly
        const userStatus = localStorage.getItem('status');
        if (userStatus === 'Admin') {
            document.getElementById('add-info-tab').style.display = 'block';
            document.getElementById('add-info-section').style.display = 'block';
        }
    });
    
    // Add functionality to the "Add Info" tab link
    document.getElementById('add-info-link').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
   
        document.getElementById('add-info-section').style.display = 'block';
        // Hide other sections if necessary
    });


// Add event listener to the form for submitting partner data
    document.getElementById('add-partner-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const partnerData = {
        name: document.getElementById('partner-name').value,
        type: document.getElementById('partner-type').value,
        location: document.getElementById('partner-location').value,
        description: document.getElementById('partner-description').value,
        contact: document.getElementById('partner-contact').value
    };

    // Send form data to server-side endpoint
    fetch('/add-partner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(partnerData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add partner');
        }
        return response.json();
    })
    .then(data => {
        console.log('Partner added successfully:', data);
        // Optionally, update the UI to reflect the newly added partner
    })
    .catch(error => {
        console.error('Error adding partner:', error);
        // Optionally, display an error message to the user
    });
});
