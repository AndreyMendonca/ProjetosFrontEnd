let areas = {
    a: null,
    b: null,
    c: null
}

document.querySelectorAll('.item').forEach(item=>{
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend',dragEnd)
})

document.querySelectorAll('.area').forEach(area =>{
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);


function dragStart(e){
    e.currentTarget.classList.add('dragging')
}

function dragEnd(e){
    e.currentTarget.classList.remove('dragging')
}

// funcao de passar por cima da area que pode soltar
function dragOver(e){
    //validar se tem algum item ja no local
    if(e.currentTarget.querySelector('.item') === null){
        e.preventDefault();
        e.currentTarget.classList.add('hover')
    }
}

//funcao que diz quando saiu da area que pode solta
function dragLeave(e){
    e.currentTarget.classList.remove('hover')
}

//funcao onde solta realmente o elemento
function drop(e){
    e.currentTarget.classList.remove('hover')
    //validar se tem algum item ja no local
    if(e.currentTarget.querySelector('.item') === null){
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem)
        updateAreas();
    }
}


// neutra area

function dragOverNeutral(e){
    e.preventDefault();
    e.currentTarget.classList.add('hover')
}

function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover')
}

function dropNeutral(e){    
    e.currentTarget.classList.remove('hover')
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem)
    updateAreas();
}

// funcionamento

function updateAreas(){
    document.querySelectorAll('.area').forEach(area =>{
        let name = area.getAttribute('data-name')
        if(area.querySelector('.item')!== null){
            areas[name]= area.querySelector('.item').innerHTML;
        }else{
            areas[name] = null
        }
    });
    if(areas.a === '1' && areas.b === '2' && areas.c === '3'){
        document.querySelector('.areas').classList.add('correct');
    }else{
        document.querySelector('.areas').classList.remove('correct')
    }
}