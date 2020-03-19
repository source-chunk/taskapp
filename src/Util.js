export const getPercentage = (num) => {
    return (num * 100).toFixed(2) + '%';
}

export const capitalizeThis = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}