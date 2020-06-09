export const executeFunction = (funcName, args) => {
    return new Promise((resolve, reject) => {
        console.log(funcName + JSON.stringify(args));
        fetch('/' + funcName + '/' + JSON.stringify(args)).then(
            res => res.json()
        ).then(res => resolve(res))
    }
    )
}