const { conn } = require('./index')

const InsertUser = async (params) => {
    return await (await conn()).execute(`INSERT INTO tb_user
   (username, password,sex, email, boi, create_date, is_active)
   VALUES(?, ?, ?, ?,?, CURRENT_TIMESTAMP, 1);
   `, [params?.username, params?.password,params?.sex, params?.email, params?.boi])
}

const UpdateUser = async (id, params) => {
    return await (await conn()).execute(`UPDATE tb_user
    SET username=?,password=?, sex=?, email=?, boi=?, update_date=CURRENT_TIMESTAMP WHERE id=${id};
    `, [params?.username, params?.password, params?.sex, params?.email, params?.boi])
}

const DeleteUser = async (id) => {
    return await (await conn()).execute(`UPDATE tb_user SET is_active=1 WHERE id=?;`, [id])
}

const findOneUser = async (id) => {
    return await (await conn()).query(`SELECT * FROM tb_user WHERE id = "${id}"`);
}

const findAllUser = async (num) => {
    return await (await conn()).query(`SELECT * FROM tb_user limit ${num}`);
}

module.exports = {
    InsertUser,
    UpdateUser,
    DeleteUser,
    findOneUser,
    findAllUser
}