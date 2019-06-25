const weatherForm = document.querySelector('.location-form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    document.querySelector('.content').innerHTML = '<p>Loading...</p>';
    console.log('Finding location: ' + location);
    fetch(`http://localhost:4000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data[0].error) {
                document.querySelector('.content').innerHTML = `
                <p><b class="b_red">Error:</b> ${data[0].error} - ${search.value}</p>`;
                console.error('Incorect data! ' + data.error)
                search.value = '';
                console.log('Returned error: ', data);
            } else {
                search.value = '';
                document.querySelector('.content').innerHTML = `
                <p><b class="b_green">Location</b>: ${data[0].location}</p>
                <p><b class="b_green">Temperature CI:</b> ${data[0].data.temperature}</p>
                <p><b class="b_green">Percent chance of rain:</b> ${data[0].data.precipProbability}%</p>
                <p><b class="b_green">Summary:</b> ${data[0].data.summary}</p>`;
                console.log('Returned data: ', data);
            }
        })
    })
}) 
