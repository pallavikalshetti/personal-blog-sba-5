const blogForm = document.getElementById('add-blog');
const blogformSuccessMsg = document.getElementById('formSuccessMsg');
const getBlogTitle = document.getElementById("inputBlogTitle");
const usrBlogContent = document.getElementById("inputBlogContent");
const inputBlogTitleError = document.getElementById("inputBlogTitleError");
const usrBlogContentError = document.getElementById("usrBlogContentError");
const formErrorMsg = document.getElementById('formErrorMsg')
const formEditSuccessMsg = document.getElementById('formEditSuccessMsg');
const formEditErrorMsg = document.getElementById('formEditErrorMsg')

displaySubmittedBlogs(); //Display all the stored blogs

getBlogTitle.addEventListener('input', (event) => {
  //alert("Test");
  if (getBlogTitle.validity.valueMissing) {
      getBlogTitle.setCustomValidity('Title is required');
  }else if(getBlogTitle.validity.tooShort) {
      getBlogTitle.setCustomValidity('Title should be 2-10 characters');
  } else {
      getBlogTitle.setCustomValidity('');
  }
  inputBlogTitleError.textContent = getBlogTitle.validationMessage;
});

usrBlogContent.addEventListener('input', (event) => {
  //alert("Test");
  if (usrBlogContent.validity.valueMissing) {
        usrBlogContent.setCustomValidity('Content is required');
  } else {
        usrBlogContent.setCustomValidity('');
  }
  usrBlogContentError.textContent = usrBlogContent.validationMessage;
});

blogForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const getBlogTitleValue = getBlogTitle.value;
    const usrBlogContentValue = usrBlogContent.value;
    //alert(JSON.parse(localStorage.getItem('blogsFromStorage')));
    const blogList = JSON.parse(localStorage.getItem('blogsFromStorage')) || [];
    blogList.push({
        usrBlogTitle: getBlogTitleValue,
        usrBlogContent: usrBlogContentValue,
    })
    blogformSuccessMsg.textContent = "Your blog added successfully!";
    localStorage.setItem('blogsFromStorage', JSON.stringify(blogList));
    displaySubmittedBlogs();
});

function displaySubmittedBlogs() {
    const resultBlogList = document.getElementById("displayBlogList");
    resultBlogList.innerHTML = "";
    const blogList = JSON.parse(localStorage.getItem('blogsFromStorage'));
    for (let i = 0; i < blogList.length; i++) {
        const createNewRow = document.createElement("tr");
        for (let key of ["usrBlogTitle", "usrBlogContent"]) {
            const createCol = document.createElement("td");
            createCol.textContent = blogList[i][key];
            createNewRow.appendChild(createCol);
        } 
        const createActionCol = document.createElement("td");
        createActionCol.innerHTML = `
            <button id="rm-btn" onclick="removeBlogItem(${i})">Remove</button>
            <button id="up-btn" onclick="updateDisplayBlogItem(${i})">update</button>
        `;
        createNewRow.appendChild(createActionCol);
        resultBlogList.appendChild(createNewRow);
    }
}

// Function to remove an item
function removeBlogItem(blogID) {
    const blogList = JSON.parse(localStorage.getItem('blogsFromStorage'));
    blogList.splice(blogID, 1);
    localStorage.setItem('blogsFromStorage', JSON.stringify(blogList));
    displaySubmittedBlogs();
}

function updateDisplayBlogItem(blogID) {
    const addBlogSection = document.getElementById("addblog-section");
    addBlogSection.style.display = "none";
    const editBlogSection = document.getElementById("editblog-section");
    editBlogSection.style.display = "block";
    const blogList = JSON.parse(localStorage.getItem('blogsFromStorage'));
    const blogItem = blogList[blogID];
    //alert(blogItem);
    document.getElementById("inputBlogTitleEdit").value = blogItem.usrBlogTitle;
    document.getElementById("inputBlogContentEdit").value = blogItem.usrBlogContent;
    document.getElementById("editBlogId").textContent = blogID;
}

function editBlogItemDetails(){
    event.preventDefault();
    const getBlogId = document.getElementById("editBlogId").textContent;
    const getEditBlogTitle = document.getElementById("inputBlogTitleEdit").value;
    const getEditBlogContent = document.getElementById("inputBlogContentEdit").value;
    const blogList = JSON.parse(localStorage.getItem('blogsFromStorage'));
    blogList.splice(getBlogId, 1);
    blogList.push({
        usrBlogTitle: getEditBlogTitle,
        usrBlogContent: getEditBlogContent,
    })
    formEditSuccessMsg.textContent = "Your blog updated successfully!";
    localStorage.setItem('blogsFromStorage', JSON.stringify(blogList));
    displaySubmittedBlogs();
}
