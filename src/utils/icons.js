
const iconStyles = (theme) => {
    const iconColor = {
        color: 'inherit'
    }
    return ({
        sizeSm: {
            fontSize: "18px",
            ...iconColor
        },
        sizeMd: {
            fontSize: "24px",
            ...iconColor
        },
        sizeLg: {
            fontSize: "30px",
            ...iconColor
        },
        sizeXl: {
            fontSize: "36px",
            ...iconColor
        }
    })
}

export default iconStyles