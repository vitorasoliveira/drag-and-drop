/*

  #1. get the draggable elements
  #2. get the container. with html you need to know where you can drag and drop elements.
  #3. set the event listeners.
  #4. move elements inside the container and drop it in another containers.
  #5. let's determine the order of our elements based on where our mouse position is.

*/

// #1. getting the draggables
const draggables = document.querySelectorAll('.draggable');

// #2. getting the container
const conatiners = document.querySelectorAll('.container');


// #3. setting event listeners. loop over each of our draggables and set event listerner. As soon as you click and drag it fires. It'll only fire again when you let go of the clicked elements and click again.
draggables.forEach(draggable => {
  // drag starts
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  })
  // drag starts
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

// #4. looping through our containers to determine how our drag works
conatiners.forEach(container => {
  // it'll run everytime we move our mouse
  container.addEventListener('dragover', e => {
    // dropping inside a element is disabled by default. this enables dropping.
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    // we need to determine the elements position
    const draggable = document.querySelector('.dragging')
    if(afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

// #5. the order of elements.
// this will determine our mouse position when we are draging our element. it's going to return eachever element our position is directly after
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  // loops through the element list of draggable elements. determines which element is directly after our mouse cursor based on the y position
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    console.log(offset)
    if(offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element
}







