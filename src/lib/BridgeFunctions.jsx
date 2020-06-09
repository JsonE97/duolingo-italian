export const executeFunction = (funcName, args) => {
    return new Promise((resolve, reject) => {
        fetch('/' + funcName).then(
            res => res.json()
        ).then(res => resolve(res))
    }
    )
}