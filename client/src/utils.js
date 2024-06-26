const convertArray = (string) => {
    const arr = string.split(', ');
    return arr;
};

const average = (string) => {
    const arr = string.split(' - ');
    if(arr.length === 1) return +arr[0];
    else if(arr.length === 2) return (+arr[0] + +arr[1])/2;
};

const repeatedDog = (name, arr) => {
    const repeatedDog = arr.filter((dog) => dog.name === name);
    if(repeatedDog.length === 0) return false;
    return true;
};

const combineFilters = (arr, filters) => {
    let filteredDogs = arr.filter((dog) => dog.name !== 'Olde English Bulldogge' && dog.name !== 'Smooth Fox Terrier');

    if(filters.origin !== 'All') {
        filteredDogs = filteredDogs.filter((dog) => (filters.origin === 'API') ? dog.created === false : dog.created === true);
    } else {
        filteredDogs = filteredDogs;
    }

    if(filters.temperament !== 'All') {
        filteredDogs = filteredDogs.filter((dog) => dog.temperaments?.split(', ').includes(filters.temperament));
    }

    if(filters.order !== 'None') {
        filteredDogs.sort((a, b) => {
            if(filters.order === 'AO') {
                if (a.name.toUpperCase() > b.name.toUpperCase()) {
                    return 1;
                }
                if (a.name.toUpperCase() < b.name.toUpperCase()) {
                    return -1;
                }
                return 0; // a must be equal to b
            }   else if(filters.order === 'DO') {
                if (a.name.toUpperCase() < b.name.toUpperCase()) {
                    return 1;
            }
                if (a.name.toUpperCase() > b.name.toUpperCase()) {
                    return -1;
                }
                return 0; // a must be equal to b
            } else if(filters.order === 'AW') {
                if (average(a.weight) < average(b.weight)) {
                return 1;
                }
                if (average(a.weight) > average(b.weight)) {
                    return -1;
                }
                return 0; // a must be equal to b
            } else if(filters.order === 'DW') {
                if (average(a.weight) > average(b.weight)) {
                    return 1;
                }
                if (average(a.weight) < average(b.weight)) {
                    return -1;
                }
                return 0; // a must be equal to b
            } else {
                return 0; //No se aplica ordenamiento
            }
        });
    }
    return filteredDogs;
};

const validate = (form, setErrors, errors) => {                                                                     //Esta fn se encarga de hacer la validación del estado(local) del formulario. Si saco esta fn del componente debo pasarle como parámetros adicionales serErrors y errors
    if(+form.maxHeight >= +form.minHeight) {
        setErrors((errors) => ({ ...errors, maxHeight: '', minHeight: '' }));
    } else {
        setErrors((errors) => ({ ...errors, maxHeight: 'The minimum height cannot be greater than to the maximum height', minHeight: 'La altura mínima NO puede ser mayor que la altura máxima' }));
    }
    if(!form.maxHeight || !form.minHeight) setErrors((errors) => ({ ...errors, maxHeight: '', minHeight: '' }));


    if(/^[A-Za-zñÑ\s]*$/.test(form.name)) {
        setErrors((errors) => ({ ...errors, name: '' }));
    } else {
        setErrors((errors) => ({ ...errors, name: 'Invalid character' }));
    }
    if(form.name === '') setErrors((errors) => ({ ...errors, name: '' }));


    if(+form.maxWeight >= +form.minWeight) {
        setErrors((errors) => ({ ...errors, maxWeight: '', minWeight: '' }));
    } else {
        setErrors((errors) => ({ ...errors, maxWeight: 'The minimum weight cannot be greater than to the maximum weight', minWeight: 'El peso mínimo NO puede ser mayor que el peso máximo' }));
    }
    if(!form.maxWeight || !form.minWeight) setErrors((errors) => ({ ...errors, maxWeight: '', minWeight: '' }));
    

    if(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(form.image)) {
        setErrors((errors) => ({ ...errors, image: '' }));
    } else {
        setErrors((errors) => ({ ...errors, image: "It's not URL" }));
    }
    if(!form.image) setErrors((errors) => ({ ...errors, image: '' }));
    

    if(/^[0-9,-\s]*$/.test(form.life_span)) {
        setErrors((errors) => ({ ...errors, life_span: '' }));
    } else {
        setErrors((errors) => ({ ...errors, life_span: 'Invalid character' }));
    }
};

const validateSearchBar = (searchBar, setErrors, errors) => {
    if(searchBar.name.length >= 4) {
        setErrors((errors) => ({ ...errors, name: '' }));
    } else {
        setErrors((errors) => ({ ...errors, name: 'Enter minimun four characters' }));
    }
    if(searchBar.name === '') setErrors((errors) => ({ ...errors, name: '' }));
};

export { convertArray, average, repeatedDog, combineFilters, validate, validateSearchBar };

//NOTA: Cuando uso setErrors() varias veces en el mismo bloque de código, debo escribir su parámetro, NO como un obj, sino como una fn: ((errors) => ({...errors, 'propiedad a actualizar' }))
