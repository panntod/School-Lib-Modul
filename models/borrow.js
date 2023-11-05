//Ini adalah pernyataan JavaScript yang memaksa kode berada dalam mode "strict", yang berarti beberapa aturan tambahan akan diterapkan pada kode untuk mengurangi kesalahan
'use strict';
// Ini mengimpor modul Model dari pustaka Sequelize. Model adalah kelas dasar yang digunakan untuk mendefinisikan model-model yang mewakili tabel dalam database.
const { Model } = require('sequelize');
//mengeksport variabel supaya bisa digunakan di file lain 
module.exports = (sequelize, DataTypes) => {
    //alias class model menjadi borrow, Model ini akan memiliki metode dan properti yang mendefinisikan tabel "borrows".
    class borrow extends Model {
       //Ini adalah metode statis yang digunakan untuk mendefinisikan asosiasi atau hubungan antara model "borrow" dengan model-model lain. 
       static associate(models) {
        this.belongsTo(models.admin)
        this.belongsTo(models.member)
        this.hasMany(models.detail_of_borrow, {
          foreignKey: `borrowID`, as: "detail_of_borrow"
        })
      }
  }
  // Ini adalah metode yang digunakan untuk mendefinisikan struktur tabel "borrows" beserta kolom-kolomnya.
  borrow.init({
    memberID: DataTypes.INTEGER,
    adminID: DataTypes.INTEGER,
    date_of_borrow: DataTypes.DATE,
    date_of_return: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {
    //ini adalah objek konfigurasi yang menghubungkan model "borrow" ke objek sequelize 
    sequelize,
    modelName: 'borrow',
  });
  //mengembalikan borrow
  return borrow;
};