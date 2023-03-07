const { conn } = require('./index');

const InsertCard = (params) => {
    conn.execute(`INSERT INTO tb_cards
    (title, description, cover, flag, tags, annotations, url, folder, create_date, ranking, update_date, is_delete)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, -1, null, 0)`, [params?.title, params?.description, params?.cover, params?.flag, params?.tags, params?.annotations, params?.url, params?.folder])
}

const UpdateCard = (id, params) => {
    conn.execute(`UPDATE tb_cards SET title=?, description=?, cover=?, flag=?, tags=?, annotations=?, url=?, folder=?, update_date=CURRENT_TIMESTAMP WHERE id=${id};`, [params?.title, params?.description, params?.cover, params?.flag, params?.tags, params?.annotations, params?.url, params?.folder])
    
}

const DeleteCard = (id) => {
    conn.execute(`UPDATE tb_cards SET is_delete=1 WHERE id=?;`, [id])
}

const findOneCard = (id) => {
    conn.query(
        `SELECT * FROM tb_cards WHERE id = ${id}`,
        function (err, results, fields) {
            console.log(results);
        }
    );
}

const findAllCard = () => {
    conn.query(
        'SELECT * FROM tb_cards',
        function (err, results, fields) {
            console.log(results);
        }
    );
}

module.exports = {
    InsertCard,
    UpdateCard,
    DeleteCard,
    findOneCard,
    findAllCard
}