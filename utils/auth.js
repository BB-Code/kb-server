const Bcrypt = require('bcrypt');

let userInfo = {
    bobocode: {
        username: 'bobocode',
        password: '$2b$10$8Lq6BSpG2ipR7QBO53siKeaVGCvX7WScaVYPv0I.2ufgTJW7LnioC',
        name: 'bobo',
        id: '1'
    }
}

// Bcrypt.hash(userInfo.bobocode.password,10,(err,hash) =>{
//     console.log(hash);
// })

// basic authentication
const basicValidate = async (req, username, password) => {
    const user = userInfo[username];
    if (!user) {
        return {
            credential: null,
            isVaild: false
        }
    }
    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, name: user.name };
    return { isValid, credentials };
}

const cookieValidate = async ()=>{}
const sessionValidate = async ()=>{}
module.exports = {
    basicValidate,
    cookieValidate,
    sessionValidate
};