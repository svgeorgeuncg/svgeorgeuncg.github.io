document.querySelectorAll('.restaurant-button').forEach(button => {
    button.addEventListener('click', function() {
        const restaurantId = this.getAttribute('data-restaurant');

        // Hide all restaurant images
        document.querySelectorAll('.restaurant-images').forEach(images => {
            images.style.display = 'none';
        });

        // Show selected restaurant images
        document.getElementById(restaurantId).style.display = 'flex';

        // Reset all images
        document.querySelectorAll('.restaurant-images img').forEach(img => {
            img.classList.remove('active');
            document.querySelectorAll('.dish-description').forEach(desc => {
                desc.style.display = 'none';
            });
        });
    });
});

document.querySelectorAll('.restaurant-images img').forEach(img => {
    img.addEventListener('click', function() {
        // Reset all images
        document.querySelectorAll('.restaurant-images img').forEach(i => {
            i.classList.remove('active');
        });

        // Add active class to clicked image
        this.classList.add('active');

        // Hide all descriptions
        document.querySelectorAll('.dish-description').forEach(desc => {
            desc.style.display = 'none';
        });

        // Show corresponding description
        const description = this.getAttribute('data-description');
        document.getElementById(description).style.display = 'block';
    });
});
