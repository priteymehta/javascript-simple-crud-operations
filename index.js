// #region  ----- GLOBAL DECLARATION --------

const _baseURL = `https://jsonplaceholder.typicode.com/`; //set base URL
var _tableBody; // store tableBody content

// #endregion  ----- GLOBAL DECLARATION --------

// handle API call
const _getPostDetails = new Promise((resolve, reject) => {
  fetch(_baseURL + `posts`).then((res) => {
    // check if response object is not null/undefined
    if (res && res.status) {
      let resStatus = res.status; // get response status here

      // handle different response code status scenirio
      switch (resStatus) {
        case 200:
          resolve(res);
          break;
        case 401:
          throw Error(`Unauthorized Request`);
        default:
          throw Error(`Invalid Request`);
      }
    } else {
      // throw an error or display the error message on toaster.
      throw Error('Invalid Request');
    }
  });
});

// #region  ----- CRUD OPERATIONS --------

// get all posts
_getPostDetails
  .then((apiResponse) => apiResponse.json())
  .then((data) => {
    intializeTable(); // clear table content before binding to avoid data overwritten issue
    data.forEach(preparePostsTableView); // bind table data
  });

// edit post
function editPost(postId) {
  console.log(`post id to be edited => `, postId);
}

// delete post
function deletePost(postId) {
  console.log(`post id to be deleted => `, postId);
}
// #endregion  ----- CRUD OPERATIONS --------

// #region  ----- TABLE MODIFCATION --------
function intializeTable() {
  _tableBody = document.getElementById('postsTable');
  _tableBody.innerHTML = '';
}

function preparePostsTableView(item) {
  let tr = document.createElement('tr');

  let idRow = document.createElement('td');
  idRow.appendChild(document.createTextNode(item.id));
  tr.appendChild(idRow);

  let titleRow = document.createElement('td');
  titleRow.appendChild(document.createTextNode(item.title));
  tr.appendChild(titleRow);

  let actionRow = document.createElement('td');
  actionRow.appendChild(
    createButtonElement(`edit`, `btn btn-info`, editPost, item.id)
  );
  actionRow.appendChild(
    createButtonElement(`delete`, `btn btn-danger`, deletePost, item.id)
  );
  tr.appendChild(actionRow);

  _tableBody.appendChild(tr);
}

// #endregion  ----- TABLE MODIFCATION --------

// #region  ----- GENERAL METHODS --------
function createButtonElement(
  buttonText,
  cssClassName,
  buttonClickFuction,
  funcArgument
) {
  let buttonElement = document.createElement('button');
  buttonElement.innerHTML = buttonText;
  buttonElement.className = cssClassName;
  buttonElement.addEventListener('click', () => {
    buttonClickFuction(funcArgument);
  });
  return buttonElement;
}

// #endregion  ----- GENERAL METHODS --------
