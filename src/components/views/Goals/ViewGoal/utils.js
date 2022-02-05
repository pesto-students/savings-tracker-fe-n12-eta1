const validateFundFormFields = (form) => {
    const errors = {};

    const submitAttempted = form.getAttribute('data-submit-attempted') === '1';

    const {amount} = form;

    if (submitAttempted || amount.getAttribute('data-touched') === '1') {
        if (amount.value === '') {
            errors['amount'] = 'Amount is required';
        } else if (amount.value === '0') {
            errors['amount'] = 'Amount should be greater than zero';
        }
    }


    return errors;
};

export {validateFundFormFields};