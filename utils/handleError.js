const handleHttpError = (res, error = 'Forbidden \nYou don\'t have permission to access this resource', code = 403) => res.status(code).send({ error })

module.exports = {
  handleHttpError
}
