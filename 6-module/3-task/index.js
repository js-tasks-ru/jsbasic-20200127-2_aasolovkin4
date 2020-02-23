'use strict';

class Menu {
  template = `
  <ul class="list-group sidebar">
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cameraphotos">Camera &amp; Photo</a>
      <ul class="dropdown-menu">   
        
       <li data-id="cameraphotos_accessories" class="dropdown-item"><a>Accessories</a></li>
    
      </ul>
    </li>
  
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cinema">Home Cinema, TV &amp; Video</a>
      <ul class="dropdown-menu">   
        
       <li data-id="cinema_audio" class="dropdown-item"><a>Audio</a></li>
    
       <li data-id="cinema_video" class="dropdown-item"><a>Video</a></li>
    
      </ul>
    </li>
  </ul>
  `;

  constructor(element) {
    this.el = element;

    this.el.insertAdjacentHTML("beforeEnd", this.template);
    
    this.el.addEventListener("click", this._menuClick.bind(this));

    this.el.querySelectorAll(".list-group-item").forEach((item) => {
      item.addEventListener("pointerenter", this._menuItemPointerEnter.bind(this));
    });

    this.el.querySelectorAll(".list-group-item").forEach((item) => {
      item.addEventListener("pointerleave", this._menuItemPointerLeave.bind(this));
    });
  }

  _menuClick(event) {
    let menuItemAncor = event.target.closest("a");

    if (!menuItemAncor || !this.el.contains(menuItemAncor)) return;

    let menuItem = menuItemAncor.closest(".dropdown-item[data-id]");

    if (!menuItem || !this.el.contains(menuItem)) return;

    menuItem.dispatchEvent(new CustomEvent("select", {
      bubbles: true,
      detail: { id: menuItem.dataset.id }
    }));
  }

  _menuItemPointerEnter(event) {
    event.target.querySelector(".dropdown-menu").classList.add("show");

    let backdrop = document.body.querySelector(".backdrop");
    if (backdrop) {
      backdrop.classList.add("show");
    }
  }

  _menuItemPointerLeave(event) {
    event.target.querySelector(".dropdown-menu").classList.remove("show");

    let backdrop = document.body.querySelector(".backdrop");
    if (backdrop) {
      backdrop.classList.remove("show");
    }
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Menu = Menu;