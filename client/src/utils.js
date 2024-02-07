const convertArray = (string) => {
    const arr = string.split(', ');
    return arr;
};

const average = (string) => {
    const arr = string.split(' - ');
    if(arr.length === 1) return +arr[0];
    else if(arr.length === 2) return (+arr[0] + +arr[1])/2;
};

const validate = (form, setErrors, errors) => {                                                                     //Esta fn se encarga de hacer la validación del estado(local) del formulario. Si saco esta fn del componente debo pasarle como parámetros adicionales serErrors y errors
    if(+form.maxHeight > +form.minHeight) {
        setErrors((errors) => ({ ...errors, maxHeight: '', minHeight: '' }));
    } else {
        setErrors((errors) => ({ ...errors, maxHeight: 'La altura mínima NO puede ser mayor o igual que la altura máxima', minHeight: 'La altura mínima NO puede ser mayor o igual que la altura máxima' }));
    }
    if(!form.maxHeight || !form.minHeight) setErrors((errors) => ({ ...errors, maxHeight: '', minHeight: '' }));


    if(/^[A-Za-zñÑ\s]*$/.test(form.name)) {
        setErrors((errors) => ({ ...errors, name: '' }));
    } else {
        setErrors((errors) => ({ ...errors, name: 'Hay un error en la propiedad name' }));
    }
    if(form.name === '') setErrors((errors) => ({ ...errors, name: '' }));


    if(+form.maxWeight > +form.minWeight) {
        setErrors((errors) => ({ ...errors, maxWeight: '', minWeight: '' }));
    } else {
        setErrors((errors) => ({ ...errors, maxWeight: 'El peso mínimo NO puede ser mayor o igual que el peso máximo', minWeight: 'El peso mínimo NO puede ser mayor o igual que el peso máximo' }));
    }
    if(!form.maxWeight || !form.minWeight) setErrors((errors) => ({ ...errors, maxWeight: '', minWeight: '' }));
};

const validateSearchBar = (searchBar, setErrors, errors) => {
    if(searchBar.name.length >= 4) {
        setErrors((errors) => ({ ...errors, name: '' }));
    } else {
        setErrors((errors) => ({ ...errors, name: 'El nombre de la raza debe tener al menos cuatro caracteres' }));
    }
    if(searchBar.name === '') setErrors((errors) => ({ ...errors, name: '' }));
};

export { convertArray, average, validate, validateSearchBar };

//NOTA: Cuando uso setErrors() varias veces en el mismo bloque de código, debo escribir su parámetro, NO como un obj, sino como una fn: ((errors) => ({...errors, 'propiedad a actualizar' }))
