const submitButton = document.getElementById('submit-button')

submitButton.addEventListener('click', (e) => {
    const formData = new FormData()

    const splitSize = document.getElementById('split-size').value
    const file = document.getElementById('split-file').files[0]

    formData.append('file', file)
    formData.append('splitSize', splitSize)

    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (xhr.status === 200) { // When data is received successfully
                const downloadUrl = xhr.response
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = downloadUrl;
                a.download = "filename";
                a.click();
            }
        }
    };
    
    const url = '/split'
    xhr.open("POST", url, true);
    xhr.send(formData);

    e.preventDefault()
})