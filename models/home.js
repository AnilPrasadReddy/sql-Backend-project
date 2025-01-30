const db = require("../utils/databaseUtil");

module.exports=class Home {
  constructor(houseName,loc,imgUrl,price,desc,id) {
    this.loc=loc,
    this.imgUrl=imgUrl;
    this.houseName=houseName;
    this.price=price;
    this.desc=desc;
  }

  save(){
    const query = 'INSERT INTO home (houseName, price, location,rating,imgUrl,`desc`) VALUES (?, ?, ?,?,?,?)';
    return db.execute(query, [this.houseName, this.price, this.loc,this.price,this.imgUrl,this.desc]);
  }

  updateById(homeid) {
    const query = 'UPDATE home SET houseName = ?, price = ?,location = ?,rating = ?,imgUrl = ?,`desc` = ? WHERE id = ?';
    return db.execute(query, [this.houseName, this.price, this.loc,this.price,this.imgUrl,this.desc,homeid]);
  }
  

  static fetchAll(){
   return db.execute('SELECT * FROM home')
  }

  static findById(homeid){
   return db.execute('SELECT * FROM home WHERE id=?',[homeid]);
  }

  static deleteById(homeid) {
    return db.execute('DELETE FROM home WHERE id = ?', [homeid]);
  }
  
  static getFavs() {
    const query = `
      SELECT 
        home.id,
        home.houseName,
        home.price,
        home.location,
        home.rating,
        home.imgUrl,
        home.desc
      FROM 
        home
      INNER JOIN 
        favorites 
      ON 
        home.id = favorites.id;
    `;
    return db.execute(query);
  }
  
  static addFavs(data){
    const query = 'INSERT INTO favorites (id) VALUES (?)';
    return db.execute(query, [data.id]);
  }
  static addBooking(homeid){
    const query = 'INSERT INTO bookings (id) VALUES (?)';
    return db.execute(query, [homeid]);
  }
  static delFavs(homeid){
    const query ='DELETE FROM favorites WHERE id= ?';
    return db.execute(query,[homeid]);
  }
  static getBookings(){
    const query = `
      SELECT 
        home.id,
        home.houseName,
        home.price,
        home.location,
        home.rating,
        home.imgUrl,
        home.desc
      FROM 
        home
      INNER JOIN 
        bookings 
      ON 
        home.id = bookings.id;
    `;
    return db.execute(query);
  }
}