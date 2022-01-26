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
export {formatDateSimple};