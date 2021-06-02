/* 标签管理数据库操作相关 */
const connection = require('../app/database');

class LabelService {
  // 根据标签名在数据库中插入一条标签
  async createLabel(labelName) {
    try {
      const statement = `INSERT INTO label (name) VALUES (?)`;
      const [result] = await connection.execute(statement, [labelName]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // 标签表中查询是否存在该标签
  async getLabelByName(labelName){
    try{
      const statement = `SELECT * FROM label WHERE name = ?`;
      const [result] = await connection.execute(statement, [labelName]);
      return result[0];
    }catch (error) {
      console.log(error);
    }
  }

  // 查询一页标签
  async getLabelList(offset,size){
    try{
      const statement = `SELECT * FROM label LIMIT ?,?;`;
      const [result] = await connection.execute(statement, [offset,size]);
      return result;
    }catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LabelService();