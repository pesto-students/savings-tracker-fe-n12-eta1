const formatDateSimple = (dateStr) => {

    if (dateStr) {
        const date = new Date(dateStr);

        if (isNaN(date.getTime())) {
            return '--';
        }

        return date.toJSON().slice(0, 10).split('-').reverse().join('/')
    }
    return '';
};

const formatDateYYYYMMDD = (dateStr) => {
    if (dateStr) {
        const date = new Date(dateStr);

        if (isNaN(date.getTime())) {
            return '--';
        }

        return date.toISOString().split('T')[0];
    }
    return '';
};

export {formatDateSimple, formatDateYYYYMMDD};