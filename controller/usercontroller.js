const { User } = require('../models');
const bycrypt = require('bcrypt');
const jwt = require('../helper/jwt');

module.exports = class {

    static async MemberRegister(req, res, next) {
        try {
            const admin = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role:"member"
            })
            res.status(200).send({
                status: 200,
                message: 'Data Member Ditambahkan!',
                data: admin 
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }

    static async AdminRegister(req, res, next) {
        try {
            
            const SuperAdmin = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role:"admin",
            })
            res.status(200).send({
                status: 200,
                message: 'Data Admin Ditambahkan!',
                data: SuperAdmin 
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }

    static async login (req, res, next) {
        try {
            const admin = await User.findOne( {where: {email: req.body.email} })
            if (!admin) {
                res.status(404).send({
                status: 404,
                message: 'User tidak ditemukan',
                }) 
            }

            const isValidPassword = await bycrypt.compare(req.body.password, admin.password)

            if (!isValidPassword) {
                res.status(404).send({
                    status: 400,
                    message: 'Email dan password salah!!',
                }) 
            }
            const token = jwt.generateToken({email: admin.email, password: admin.password})
            const secureadmin = admin.dataValues
            delete secureadmin.password

            res.status(200).send({
                status: 200,
                message: 'User ditemukan',
                data: {
                    admin: secureadmin,
                    token: token
                }
            }) 
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }

    static async currentUser(req, res, next) {
        try{
            res.status(200).send({
                status: 200,
                message: 'Data User Ditemukan!',
                data: req.adminlogin
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }

    static async getAllUser(req, res, next) {
        User.findAll({
            where: {...req.query}
        })
        .then((result) => {
            res.status(200).send({
                status: 200,
                data: result,
            })
        })
        .catch((err) => {
            res.status(400).send(err)
        })
    }

}