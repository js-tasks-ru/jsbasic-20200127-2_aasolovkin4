/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    table.querySelectorAll("tbody > tr").forEach(function(row) {
        let statusCell = row.cells[3];

        if(statusCell.dataset.available === 'true') {
            row.classList.add("available");
        } else if(statusCell.dataset.available === "false") {
            row.classList.add("unavailable");
        } if (!statusCell.dataset.available) {
            row.setAttribute("hidden", true);
        }

        let genderCell = row.cells[2];
        let gender = genderCell.firstChild.data;

        if(gender === "m") {
            row.classList.add("male");
        } else if(gender === "f") {
            row.classList.add("female");
        }

        let ageCell = row.cells[1];
        let age = +ageCell.firstChild.data;

        if (age < 18) {
            row.style.cssText = "text-decoration: line-through;";
        }
    });
}
