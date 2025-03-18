let validar = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = false;

        let inputs = form.querySelectorAll('input');

        validar.clearErrors();

        for( let i in inputs){
            let input = inputs[i]
            let check = validar.checkInput(input);
            if(check !== true){
                send = false;
                validar.showError(input, check)
            }
        }

        if(send){
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|');
            for(let r in rules){
                let rDetails = rules[r].split('=');
                switch(rDetails[0]){
                    case 'required':
                        console.log('campo obrigatorio')
                        if(input.value == ''){
                            return 'Campo obrigatório'
                        }
                        break;
                    case 'min':
                        console.log('min')
                        if(input.value.length < rDetails[1]){
                            return 'precisa ter mais caracter'
                        }
                        break
                }
            }
        }

        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000'

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling)

    },
    clearErrors:()=>{

        let errorElements = document.querySelectorAll('.error');
        for(let e of errorElements){
            e.remove();
        }
    }
}

let form = document.querySelector('.validador')

form.addEventListener('submit', validar.handleSubmit)