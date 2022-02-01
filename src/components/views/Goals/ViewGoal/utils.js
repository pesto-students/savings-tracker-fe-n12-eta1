const validateFundFormFields = (form) => {
    const errors = {};

    const submitAttempted = form.getAttribute('data-submit-attempted') === '1';

    const {amount, fund_type} = form;

    if (submitAttempted || amount.getAttribute('data-touched') === '1') {
        if (amount.value === '') {
            errors['amount'] = 'Amount is required';
        } else if (amount.value === '0') {
            errors['amount'] = 'Amount should be greater than zero';
        }
    }

    if (submitAttempted || fund_type.getAttribute('data-touched') === '1') {

        if (fund_type.value === '') {
            errors['fund_type'] = 'Fund Type is required';
        }
    }

    return errors;
};

export {validateFundFormFields};