// indexedDB: Reforzamiento
let request = window.indexedDB.open('mi-database', 1);

request.onupgradeneeded = event => {
    console.log('Actializacion');
    let db = event.target.result;
    db.createObjectStore('heroes', {
        keyPath: 'id'
    });
};

//manejo de erroees
request.onerror = event => {
    console.log('DB error:', event.target.error);
};

//insertar datos
request.onsuccess = event => {
    let db = event.target.result;

    let heroesData = [
        { id: '1111', heroe: 'Spiderman', mensaje: 'holi' },
        { id: '2222', heroe: 'Ironman <3', mensaje: 'holi bb' }
    ];

    let heroesTransaction = db.transaction('heroes', 'readwrite');

    heroesTransaction.onerror = event => {
        console.log('Error guardaddo', event.target.error);
    };

    //exito de la transaccion

    heroesTransaction.oncomplete = event => {
        console.log('Transaccion hecha', event);
    };

    let heroesStore = heroesTransaction.objectStore('heroes');


    for (let heroe of heroesData) {
        heroesStore.add(heroe);
    }

    heroesStore.onsuccess = event => {
        console.log('Nuevo item agregado a la DB');
    }
};