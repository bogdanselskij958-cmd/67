const img=document.querySelector('img')
const div=document.querySelector('div')
const bnl=document.querySelector('button')
bnl.addEventListener('click',()=>{
    img.classList.toggle('visible')
    div.innerText=parseInt(div.innerText)+1
})
