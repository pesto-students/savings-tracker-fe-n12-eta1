const validatePersonalFields = (form, force) => {
    const errors = {};

    const {first_name, last_name, email, dob} = form;

    if (first_name.getAttribute('data-touched') === '1' || force) {
        if (first_name.value === '') {
            errors['first_name'] = 'First Name is required';
        }
    }

    if (last_name.getAttribute('data-touched') === '1' || force) {
        if (last_name.value === '') {
            errors['last_name'] = 'Last Name is required';
        }
    }

    if (email.getAttribute('data-touched') === '1' || force) {

        if (email.value === '') {
            errors['email'] = 'Email is required';
        }
    }


    if (dob.getAttribute('data-touched') === '1' || force) {

        if (dob.value === '') {
            errors['dob'] = 'Date of Birth is required';
        }
    }


    return errors;
};
const validateLocationFields = (form, force) => {
    const errors = {};

    const {country, city,} = form;

    if (country.getAttribute('data-touched') === '1' || force) {
        if (country.value === '') {
            errors['country'] = 'Country is required';
        }
    }

    if (city.getAttribute('data-touched') === '1' || force) {
        if (city.value === '') {
            errors['city'] = 'City is required';
        }
    }


    return errors;
};

const validateFinancialFields = (form, force) => {
    const errors = {};

    const {currency} = form;

    if (currency.getAttribute('data-touched') === '1' || force) {
        if (currency.value === '') {
            errors['currency'] = 'Currency is required';
        }
    }

    return errors;
};

export {validatePersonalFields, validateLocationFields, validateFinancialFields};