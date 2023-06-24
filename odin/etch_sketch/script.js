// selection body container
const select_body = document.querySelector('body');

// creates container where the 16x16 grid will be held
const grid = document.createElement('div');

// creates a class for the grid div created above
grid.classList.add('grid');

// add the div element
select_body.appendChild(grid);


// listens for button press
const clicked = document.getElementById('change_button');

clicked.addEventListener('click', user_grid);

// calls function to create initial grid of 16 x 16
rowsColumns(16);

// changes the grid to user desired grid size
function user_grid()
{
  let user = 0;

  do
  {
    user = prompt("what grid size do you want?"); 

    if (user >= 101 | user <= 0)
      alert("can't be less than 1 or greater than 100");

  } while (user >= 101 | user <= 0);
  
  const select_rows = document.querySelectorAll('.rows');
  
  for (let i = 0; i < select_rows.length; i++)
    select_rows[i].remove(); 
  
  rowsColumns(user);
}

// creates rows and columns
function rowsColumns(grid_amount)
{
  for (let i = 0; i < grid_amount; i++)
  {
    const select_grid = document.querySelector('.grid');
    const rows = document.createElement('div');
    rows.classList.add('rows');
    select_grid.appendChild(rows);
  }

  const select_rows = document.querySelectorAll('.rows');

  for (let i = 0; i < grid_amount; i++)
  {
    for (let j = 0; j < grid_amount; j++)
    {
      const columns = document.createElement('div');
      columns.classList.add("columns");
      select_rows[j].appendChild(columns);
    }
  }

  // creates event listeners here
  const select_columns = document.querySelectorAll('.columns');

  for (let i = 0; i < select_columns.length; i++)
    select_columns[i].setAttribute('id', i);

  for (let i = 0; i < select_columns.length; i++)
   select_columns[i].addEventListener('mouseover', mouseOver);
}

// changes color when mouse over
function mouseOver()
{
  document.getElementById(this.id).setAttribute('class', 'columns_colored')
}
