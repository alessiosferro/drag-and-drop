const fill = document.querySelector('.fill');
const emptyBoxes = document.querySelectorAll('.empty');

FillCallbacks = {
  /**
   * The callback that gets called when the user drags
   * the element. Attaches the class hold and the class
   * invisible after a delay to prevent the box to
   * instantly disappear.
   */
  dragStart() {
    this.className += ' hold';

    document.body.style.cursor = 'grabbing';

    setTimeout(() => this.className = 'invisible');
  },

  /**
   * The callback that gets called when the drag
   * of the element ends. Resets the class to "fill".
   */
  dragEnd() {
    document.body.style.cursor = 'grab';

    this.className = 'fill';
  }
}

EmptyBoxCallbacks = {

  /**
   * By default, data/elements cannot be dropped in other 
   * elements. To allow a drop, we must prevent the default 
   * handling of the element. This is done by calling the 
   * event.preventDefault() method for the ondragover event.
   * @param {*} event The event associated with the callback.
   */
  dragOver(event) {
    event.preventDefault();
  },

  dragEnter(event) {
    // same reason as above
    event.preventDefault();

    this.className += ' hovered';
    this.className += ' enter';
  },

  dragLeave() {
    this.className = 'empty';
  },

  /**
   * appends the entire fill div element to the
   * element where the dragged one is dropped.
   */
  dragDrop() {
    this.className = 'empty';

    this.appendChild(fill);
  }
}

fill.addEventListener('dragstart', FillCallbacks.dragStart);
fill.addEventListener('dragend', FillCallbacks.dragEnd);

addBoxListeners();

/**
 * Adds the dragover, dragenter, dragleave and drop
 * event listeners to every element with the class "empty".
 */
function addBoxListeners() {
  for (const emptyBox of emptyBoxes) {
    emptyBox.addEventListener('dragover', EmptyBoxCallbacks.dragOver);
    emptyBox.addEventListener('dragenter', EmptyBoxCallbacks.dragEnter);
    emptyBox.addEventListener('dragleave', EmptyBoxCallbacks.dragLeave);
    emptyBox.addEventListener('drop', EmptyBoxCallbacks.dragDrop);
  }
}