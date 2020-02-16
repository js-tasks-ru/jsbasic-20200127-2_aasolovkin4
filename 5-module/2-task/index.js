/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
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
function SortableTable(items) {
  /**
   * @property {Element} - обязательно свойство, которое ссылается на элемент <table>
   */
  this.el = document.createElement('table');

  let thaed = this.el.createTHead();

  let captionRow = thaed.insertRow();

  let nameCell = captionRow.insertCell();
  nameCell.textContent = "Name";
  
  let ageCell = captionRow.insertCell();
  ageCell.textContent = "Age";
  
  let salaryCell = captionRow.insertCell();
  salaryCell.textContent = "Salary";
  
  let cityCell = captionRow.insertCell();
  cityCell.textContent = "City";
  
  for(let item of items) {
    let tbody = this.el.createTBody();
    let dataRow = tbody.insertRow();

    let nameDataCell = dataRow.insertCell();
    nameDataCell.textContent = item.name;
    
    let ageDataCell = dataRow.insertCell();
    ageDataCell.textContent = item.age;
    
    let salaryDataCell = dataRow.insertCell();
    salaryDataCell.textContent = item.salary;
    
    let cityDataCell = dataRow.insertCell();
    cityDataCell.textContent = item.city;
  }

  /**
   * Метод выполняет сортировку таблицы
   * @param {number} column - номер колонки, по которой
   * нужно выполнить сортировку (отсчет начинается от 0)
   * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
   */
  this.sort = (column, desc = false) => {
    Array.from(this.el.querySelectorAll("tbody > tr"))
    .sort((a, b) => {
      let aValue = a.cells[column].firstChild.data;
      let bValue = b.cells[column].firstChild.data;

      if (column === 1 || column === 2){
        return (+aValue - +bValue)*(desc ? -1 : 1);
      } else {
        return (aValue > bValue ? 1 : -1)*(desc ? -1 : 1);
      }
    }).forEach((item) => {
      this.el.tBodies[0].appendChild(item);
    });
  };
}
