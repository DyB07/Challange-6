const jwt = require('../helper/jwt')
const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const payload = jwt.verifyToken(req.headers.token)
        if (!payload) {
            res.status(404).send({ message: 'user tidak ditemukan' })
        }
        const admin = await User.findOne({
            where: { email: payload.email, password: payload.password },
        })
        if (!admin) {
            res.status(404).send({ message: 'user tidak ditemukan' })
        }
        else {
            req.adminlogin = admin.dataValues
            next()
        }
    } catch (err) {
        res.status(404).send({
            status: 404,
            message: 'User tidak ditemukan',
        })
    }
}