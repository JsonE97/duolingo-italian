export const Bridge = {
  executeFunction: (funcName, args) => {
    return new Promise((resolve, reject) => {
      var url = '/api/executeBackendFunction?funcName=' + funcName + '&';
      if (Object.keys(args).length > 0) {
        Object.keys(args).forEach(k => {
          url += (k + '=' + args[k] + '&')
        });
      }
      fetch(url.slice(0, -1)).then(
        res => res.json()
      ).then(res => {
        if (res.success === false) console.log("warning - function call unsuccessful")
        resolve(res);
      })
    })
  }
}