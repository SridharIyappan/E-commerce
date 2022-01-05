import bcrypt from 'bcryptjs';

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash(password, salt);
    return userPassword;
}

export const decryptPassword = async (dbPassword, reqPassword) => {
    const matchPassword = await bcrypt.compare(dbPassword, reqPassword);
    return matchPassword;
}


