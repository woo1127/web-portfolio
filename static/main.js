const uploadImage = document.getElementById('upload-image')
const imageWrapper = document.querySelector('.upload__image-wrapper')
const uploadContent = document.getElementById('upload__content')
const chooseFileBtn = document.getElementById('upload-file')
const uploadResult = document.getElementById('upload__result')
const predictBtn = document.getElementById('predict')


uploadImage.addEventListener('change', () => {
    uploadContent.style.display = 'none'
    uploadResult.textContent = ''
    imageWrapper.style.backgroundImage = 'url(./static/image/loading.gif)'

    let formData = new FormData
    formData.append('file', uploadImage.files[0])

    // send img to the `/upload` endpoint
    fetch(`${window.origin}/upload`, {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(msg => {console.log(msg.imgpath); performImageEffect()})

    function performImageEffect() {
        const reader = new FileReader()
    
        reader.addEventListener('load', () => {
            const uploadedImage = reader.result

            imageWrapper.style.backgroundImage = `url(${uploadedImage})`
        })
        reader.readAsDataURL(uploadImage.files[0])

        chooseFileBtn.style.display = 'none'
        predictBtn.style.display = 'block'
    }
})


predictBtn.addEventListener('click', () => {
    // fetch class predicted from the `/class` endpoint
    fetch('/class')
        .then(res => res.json())
        .then(data => {uploadResult.textContent = data.result})

    predictBtn.style.display = 'none'
    chooseFileBtn.style.display = 'block'
})
