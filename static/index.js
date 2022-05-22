const submitButton = document.getElementById('submit-button')

submitButton.addEventListener('click', (e) => {
    const formData = new FormData()

    const splitSize = document.getElementById('split-size').value
    const file = document.getElementById('split-file').files[0]

    formData.append('file', file)
    formData.append('splitSize', splitSize)

    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {
        showLoading()
        hideError()
        if (xhr.readyState == 4) {
            try{
                const response = xhr.response
                if (xhr.status === 200) { // When data is received successfully
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = response;
                    a.download = "filename";
                    a.click();
                }
                else{
                    showError(response)
                }
            }
            catch(error){
                showError(error.message)
            }

            hideLoading()
        }
    };
    
    const url = '/split'
    xhr.open("POST", url, true);
    xhr.send(formData);

    e.preventDefault()
})

function showLoading(){
    document.getElementById('loading-wrapper').style.display = 'flex'
}

function hideLoading(){
    document.getElementById('loading-wrapper').style.display = 'none'
}

function showError(errorMessage){
    const errorMessageDiv = document.getElementById('error-message')
    errorMessageDiv.innerText = errorMessage
    errorMessageDiv.style.display = 'block'
}

function hideError(){
    document.getElementById('error-message').style.display = 'none'
}
