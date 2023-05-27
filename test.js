//teste de fct
//drag and drop thing

const container = document.querySelector(".re-order");
const items = document.querySelectorAll(".draggable");

let dragItem = null;

for (let i = 0; i < items.length; i++) {
  const item = items[i];

  item.addEventListener("dragstart", function () {
    dragItem = item;
    setTimeout(function () {
      item.style.display = "none";
      item.classList.add("dragging");
    }, 0);
  });

  item.addEventListener("dragend", function () {
    setTimeout(function () {
      dragItem.style.display = "block";
      dragItem = null;
    }, 0);
  });

  container.addEventListener("dragover", function (e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
    return draggableElements.reduce(
      function (closest, child) {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
