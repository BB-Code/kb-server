const { conn } = require('./index')

const InsertUser = (params) => {
    conn.execute(`INSERT INTO tb_user
   (username, password, cover, sex, email, boi, create_date, is_active)
   VALUES(?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 1);
   `, [params?.username, params?.password, params?.cover, params?.sex, params?.email, params?.boi])
}

const UpdateUser = (id, params) => {
    conn.execute(`UPDATE tb_user
    SET password=?, cover=?, sex=?, email=?, boi=?, update_date=CURRENT_TIMESTAMP
    WHERE id=${id};
    `, [params?.password, params?.cover, params?.sex, params?.email, params?.boi])
}

const DeleteUser = (id) => {
    conn.execute(`UPDATE tb_user SET is_active=0 WHERE id=?;`, [id])
}

const findOneUser = (username) => {
    conn.query(
        `SELECT * FROM tb_user WHERE username = "${username}"`,
        function (err, results, fields) {
            console.log(results);
        }
    );

}

const findAllUser = () => {
    conn.query(
        `SELECT * FROM tb_user`,
        function (err, results, fields) {
            console.log(results);
        }
    );
}

module.exports = {
    InsertUser,
    UpdateUser,
    DeleteUser,
    findOneUser,
    findAllUser
}