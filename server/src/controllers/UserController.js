const {createUser, loginUser, getAllUser, deleteUser} = require('../services/UserService')
const UserController = {
    create: async (req, res) => {
        try {
            const user = req.body;
            const result = await createUser(user);
            if (result.error) {
                return res.status(400).json(result);
            }
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json({
                error: true,
                message: e.message || e
            })
        }
    },
    login: async (req, res) => {
        try {
            const user = req.body;
            const result = await loginUser(user);
            if (result.error) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({
                error: true,
                message: e.message || e
            })
        }
    },
    getAllUser: async (req, res) => {
        try {
            const result = await getAllUser();
            if (result.error) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({
                error: true,
                message: e.message || e
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;
            const result = await deleteUser(id);
            if (result.error) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({
                error: true,
                message: e.message || e
            })
        }
    }
}
module.exports = UserController;