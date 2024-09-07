const UserModel = require('../models/UserModel');
const createUser = async (data) => {
    try {
        const {name, email, phone} = data;
        if (!phone) {
            return {
                error: true,
                message: 'Phone is required',
                data: null
            }
        }
        if (!name) {
            return {
                error: true,
                message: 'Name is required',
                data: null
            }
        }
        const checkUser = await UserModel.findOne({phone})
        if (checkUser) {
            const {password, ...dataUser} = checkUser._doc;
            return {
                error: false,
                message: 'Create user successfully',
                data: dataUser
            }
        }
        const user = await new UserModel({name, email, phone});
        await user.save();
        const {password, ...dataUser} = user._doc;
        return {
            error: false,
            message: 'Create user successfully',
            data: dataUser
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const loginUser = async (data) => {
    try {
        const {email, password} = data;
        if (!email) {
            return {
                error: true,
                message: 'Email is required',
                data: null
            }
        }
        if (!password) {
            return {
                error: true,
                message: 'Password is required',
                data: null
            }
        }
        const user = await UserModel.findOne({email, password});
        if (!user) {
            return {
                error: true,
                message: 'Email hoặc mật khẩu không đúng !!!',
                data: null
            }
        }
        const {password: pass, ...dataUser} = user._doc;
        return {
            error: false,
            message: 'Login successfully',
            data: dataUser
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getAllUser = async () => {
    try {
        const users = await UserModel.find().select('-password').sort({'createdAt': -1});
        return {
            error: false,
            message: 'Get all users successfully',
            data: users
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const deleteUser = async (id) => {
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return {
                error: true,
                message: 'User not found',
                data: null
            }
        }
        return {
            error: false,
            message: 'Delete user successfully',
            data: user
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
module.exports = {
    createUser,
    loginUser,
    getAllUser,
    deleteUser
}