const formatDateSimple = (dateStr) => {
    if (dateStr) {
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
    }
    return '';
};
export {formatDateSimple};