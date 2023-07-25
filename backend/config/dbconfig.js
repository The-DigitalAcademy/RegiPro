 // dbconfig.js

module.exports = {
    DB: 'sage_cqop',
    USER: 'vutomi',
    PASSWORD: 'drOU5lyGCQPL4Y94rZiRRjhsJhT2W70E',
    HOST: 'dpg-ci3fns3hp8u1a185jqkg-a.oregon-postgres.render.com',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }; 
  // module.exports = {
  //   DB: 'sage',
  //   USER: 'postgres',
  //   PASSWORD: 'Letsdoit!',
  //   HOST: 'localhost',
  //   dialect: 'postgres',
  
  //   pool: {
  //     max: 5,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000
  //   }
  // };
