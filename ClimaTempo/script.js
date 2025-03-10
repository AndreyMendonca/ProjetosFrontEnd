document.querySelector('.busca').addEventListener('submit',async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if(input !== ''){
        showWarning('Carregando...')
        let urlLogLat = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(input)}&limit=1&appid=b92b2bbc3f191a1322e6ac524eacbb33`


        let logLat = await fetch(urlLogLat);
        let jsonLogLat = await logLat.json();

        console.log(jsonLogLat);

        try{
            let lat = jsonLogLat[0].lat;
            let lon = jsonLogLat[0].lon;
            let urlBuscaClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b92b2bbc3f191a1322e6ac524eacbb33&units=metric&lang=pt_br`

            let response = await fetch(urlBuscaClima);
            let json = await response.json();
            console.log(json)
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
                
            });
        }catch(error){
            alert("Distino não localizado")
            showWarning("Faça uma nova busca")
            document.querySelector('#searchInput').value = ''
        }
    }
})

function showInfo(json){
    showWarning('')
    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML =  `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`
}

function showWarning(msg){
    document.querySelector('.resultado').style.display = 'none';
    document.querySelector('.aviso').innerHTML = msg;
}