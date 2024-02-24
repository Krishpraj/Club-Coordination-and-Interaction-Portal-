// Purpose: To render the partners.json data to the page and filter the data based on the type of partnership.
function changeText() {
    document.getElementById("main-text").innerHTML = "Partnerships are now available!";
}

fetch('partners.json')
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
