const validatePortfolioFormFields = (form) => {
    const errors = {};

    const submitAttempted = form.getAttribute('data-submit-attempted') === '1';

    const {amount, description, start_date, end_date, frequency, frequency_unit} = form;

    if (submitAttempted || amount.getAttribute('data-touched') === '1') {
        if (amount.value === '') {
            errors['amount'] = 'Amount is required';
        } else if (amount.value === '0') {
            errors['amount'] = 'Amount should be greater than zero';
        }
    }

    if (submitAttempted || description.getAttribute('data-touched') === '1') {

        if (description.value === '') {
            errors['description'] = 'Description is required';
        }
    }


    if (submitAttempted || start_date.getAttribute('data-touched') === '1') {

        if (start_date.value === '') {
            errors['start_date'] = 'Start Date is required';
        }
    }

    if (frequency.value === 'Recurring') {

        if (submitAttempted || frequency_unit.getAttribute('data-touched') === '1') {

            if (frequency_unit.value === '') {
                errors['frequency_unit'] = 'Frequency Unit is required';
            }
        }


        if (end_date.value === '') {
            errors['end_date'] = 'End Date is required';
        } else if ((new Date(start_date.value).getTime() > (new Date(end_date.value).getTime()))) {
            errors['end_date'] = 'End Date cannot be before Start Date';
        }
    }


    return errors;
};

export {validatePortfolioFormFields};