document.addEventListener('DOMContentLoaded', function() {
  // Get all paragraph elements
  const paragraphs = document.querySelectorAll('p');
  
  // Loop through each paragraph and add event listener
  paragraphs.forEach(function(paragraph) {
      paragraph.addEventListener('click', function() {
          // Change text color of the clicked paragraph
          this.style.color = getRandomColor();
      });
  });
});

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
