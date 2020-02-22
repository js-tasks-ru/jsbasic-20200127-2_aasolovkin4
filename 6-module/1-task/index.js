/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: 'Ilia',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *      },
 *
 * @constructor
 */
class ClearedTable {
  constructor(data) {
    this.el = document.createElement('table');

    this.el.classList.add("pure-table");

    let tHead = this.el.createTHead();
    let tHeadRow = tHead.insertRow(0);
    tHeadRow.insertCell().textContent = "Name";
    tHeadRow.insertCell().textContent = "Age";
    tHeadRow.insertCell().textContent = "Salary";
    tHeadRow.insertCell().textContent = "City";
    tHeadRow.insertCell();

    if(data) {
      let tBody = this.el.createTBody();

      for(let item of data) {
        let tBodyRow = tBody.insertRow(0);
        tBodyRow.setAttribute("data-user-id", item.id);
        tBodyRow.insertCell().textContent = item.name;
        tBodyRow.insertCell().textContent = item.age;
        tBodyRow.insertCell().textContent = item.salary;
        tBodyRow.insertCell().textContent = item.city;

        let ctrlCell = tBodyRow.insertCell();
        let delAncor = document.createElement("a");
        delAncor.href = "#delete";
        delAncor.textContent = "X";
        ctrlCell.append(delAncor);
      }
    }    

    this.el.addEventListener("click", this._tableClick.bind(this));

    this.data = data;
  }

  _tableClick(event) { 
    if (event.target.nodeName === "A" && event.target.href && event.target.href.slice(-7) === "#delete") {
      let removedRaw = event.target.closest("tr");

      if (!this.el.contains(removedRaw))
        return;

      removedRaw.remove();

      if (this.onRemoved) {
        this.onRemoved(+removedRaw.dataset.userId);
      }
    }      
  }

  /**
   * Метод который вызывается после удалении строки
   * @param {number} id - идентификатор удаляемого пользователя
   */
  onRemoved(id) {}
}

window.ClearedTable = ClearedTable;
