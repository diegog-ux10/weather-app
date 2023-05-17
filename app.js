import { inquirerMenu, listPlaces, pause, readInput } from "./helpers/inquirer.js"
import { Searches } from "./models/searches.js";

const main = async() => {
    let opt;

    const searches = new Searches();

    do {

        opt = await inquirerMenu();
        
        switch (opt) {

            case 1:

            const place = await readInput('City:')

            const places = await searches.city(place);

            const id = await listPlaces(places);

            if(id === '0') continue;

            const selectedPlace = places.find(place => place.id === id)
            //Save DB
            searches.addHistory(selectedPlace.name)
            const weather = await searches.placeWeather(selectedPlace.lat, selectedPlace.lng);
            
            console.clear();
            console.log('\nInfo about the city\n'.green);
            console.log('City:'.green, selectedPlace.name );
            console.log('Lat:'.green, selectedPlace.lat );
            console.log('Lng:'.green, selectedPlace.lng );
            console.log('Temperature:'.green, weather.temp);
            console.log('Max:'.green, weather.max);
            console.log('Min:'.green, weather.min);
            console.log('The weather is:'.green, weather.desc);

            break;

            case 2:
                searches.historyCapitalized.forEach( (place, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${place}`)
                })
            break;
        }

        if( opt !== 0 ) await pause();
        
    } while ( opt !== 0 );
}

main();