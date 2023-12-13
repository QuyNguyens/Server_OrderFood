const createErr = (state,message) =>{
    const err = new Error();
    err.state = state;
    err.message = message;
    return err;
}

module.exports = createErr;