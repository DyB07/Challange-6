const { Cars } = require('../models');

module.exports = class {

    static async createcar(req, res, next){
        Cars.create({
            model: req.body.model,
            type: req.body.type,
            available: true,
            createdBy: req.adminlogin.id,
            updateBy: req.adminlogin.id
        })
        .then((result) => {
            console.log(result);
            res.status(201).send({
                status: 201,
                message: "car terupload",
                data: result,
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(error)
        })
    }

    static async getCarAvailable(req, res, next){
        Cars.findAll({
            where: {available: true}
        })
        .then((result) => {
            res.status(200).send({
                status: 200,
                message: "semua data car sudah tampil",
                data: result,
            })
        })
        .catch((err) => {
            res.status(400).send(err)
        })
    }

    static async deleteCar(req, res, next){
        try {
            const deletCar = await Cars.update({deleteBy: req.adminlogin.id, available: false}, {where: {id: req.params.id}, returning: true})
                res.status(201).send({
                    status: 201,
                    message: 'Data cars berhasil dihapus!',
                    data: deletCar
                })
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static async updateCar(req, res, next) {
    try{
        const update = await Cars.update({...req.body,updateBy: req.adminlogin.id},{where: {id: req.params.id},returning: true})
            res.status(201).send({
                status: 201,
                message: 'Data car diupdate!',
                data: update
            })
        } catch (err){
            res.status(500).send(err)
        }
    }

}