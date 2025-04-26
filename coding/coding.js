function changeExt(fileName, newExt) {
  var pos = fileName.includes(".") ? fileName.lastIndexOf(".") : fileName.length
  var fileRoot = fileName.substr(0, pos)
  var output = `${fileRoot}.${newExt}`
  return output
}

const initSlider = () => {
    const imageList = document.querySelector(".wrapper .image-list");
    const slideButtons = document.querySelectorAll(".wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // gif on hover
    const itm = document.querySelector(".wrapper .image-list .image-item");

    itm.addEventListener('click', function() {
        itm.src = changeExt(itm.src, 'gif');
        });



    itm.addEventListener('mouseout', function() {
        itm.src = changeExt(itm.src, 'png');
        });

    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });



    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

