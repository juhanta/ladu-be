const config = {
    port : 3333,
    saltRounds : 1 , // Salt rounds number
    jwtSecret: '123',
    db:{
        host:'',
        user:'',
        password:'',
        database:'',
    },
    emailHost: "smtp server",
    smtpPort:465, //smtp port
    emailUser:"username", //smtp user
    emailPassword:"password" //smtp password

};

module.exports = config;