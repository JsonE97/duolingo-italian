export const executeFunction = ({ funcName, args }) => {
    return new Promise(
        fetch('/' + funcName).then(
            res => res.json()
        ).then(res => res)
    )
}