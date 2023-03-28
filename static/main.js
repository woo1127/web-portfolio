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

    const image = uploadImage.files[0]
    console.log(image)

    const reader = new FileReader()
    const formData = new FormData()

    formData.append('file', image)
    
    for (const key of formData.keys())
        console.log(key)
    
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(msg => {
        console.log(msg.imgpath)
        imageEffect()
    })
    
    function imageEffect() {
        reader.addEventListener('load', () => {
            imageWrapper.style.backgroundImage = `url(${reader.result})`
        })
        reader.readAsDataURL(image)
    
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
