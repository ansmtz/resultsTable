const data = [
    {
        homeTeam: {
            name: 'Фулхэм',
            score: 0
        },
        awayTeam: {
            name: 'Манчестер Сити',
            score: 3
        },
        date: '13-03-2021'
    },
    {
        homeTeam: {
            name: 'Манчестер Сити',
            score: 2
        },
        awayTeam: {
            name: 'Фулхэм',
            score: 0
        },
        date: '05-12-2020'
    },
    {
        homeTeam: {
            name: 'Манчестер Сити',
            score: 4
        },
        awayTeam: {
            name: 'Фулхэм',
            score: 0
        },
        date: '26-01-2020'
    },
    {
        homeTeam: {
            name: 'Фулхэм',
            score: 0
        },
        awayTeam: {
            name: 'Манчестер Сити',
            score: 2
        },
        date: '30-03-2019'
    },
    {
        homeTeam: {
            name: 'Фулхэм',
            score: 2
        },
        awayTeam: {
            name: 'Манчестер Сити',
            score: 2
        },
        date: '30-03-2018'
    },
];

const abbr = {
    'MCI': 'Манчестер Сити',
    'FUL': 'Фулхэм',
};

const table = document.querySelector('table'),
      tbody = document.getElementById('tbody'),
      select = document.querySelector('select'),
      form = document.querySelector('form'); 

const createTableData = (row, data) => {
    for(let value of data){
        const td = document.createElement('td');
        td.innerText = value;
        row.appendChild(td);
    }
}

const detectTargetTeam = (homeTeam, awayTeam, favTeam) => {
    let targetTeam, otherTeam;
    if(homeTeam.name === favTeam){
        targetTeam = homeTeam;
        otherTeam = awayTeam;
    } else {
        targetTeam = awayTeam;
        otherTeam = homeTeam;
    }
    return [targetTeam, otherTeam];
}

const targetResult = (homeTeam, awayTeam, favTeam) => {
    const [targetTeam, otherTeam] = detectTargetTeam(homeTeam, awayTeam, favTeam);
    let result;
    if(targetTeam.score > otherTeam.score){
        result = 'win'
    } else if(targetTeam.score === otherTeam.score){
        result = 'draw'
    } else if(targetTeam.score < otherTeam.score){
        result = 'lose'
    }
    return result;
}

const clearTable = () => {
    tbody.innerHTML = ``;
}

const createDetailsRow = details => {
    const detailsRow = document.createElement('tr');
    detailsRow.classList.add('details');
    const detailsData = document.createElement('td');
    detailsData.setAttribute('colspan', '4');
    detailsData.innerText = details;
    detailsRow.appendChild(detailsData);
    return detailsRow; 
}

const drawTable = data => {
    clearTable();
    for(let {homeTeam, awayTeam, date} of data){
        const gameRow = document.createElement('tr');
        gameRow.classList.add('game');
        createTableData(gameRow, [homeTeam.name,
                                  awayTeam.name,
                                  `${homeTeam.score}:${awayTeam.score}`]); 
        tbody.appendChild(gameRow);
        gameRow.classList.add(targetResult(homeTeam, awayTeam, abbr[select.value])); 
        tbody.append(createDetailsRow(`Встреча состоялась: ${date}`));
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    drawTable(data);
});

tbody.addEventListener('click', (e)=> {
    const parent = e.target.parentElement;
    if(parent.classList.contains('game')){
        parent.nextElementSibling.classList.toggle('show');
    }
})

drawTable(data);




