//Ini adalah pernyataan JavaScript yang memaksa kode berada dalam mode "strict", yang berarti beberapa aturan tambahan akan diterapkan pada kode untuk mengurangi kesalahan
'use strict';
// Ini mengimpor modul Model dari pustaka Sequelize. Model adalah kelas dasar yang digunakan untuk mendefinisikan model-model yang mewakili tabel dalam database.
const { Model } = require('sequelize');
//mengeksport variabel supaya bisa digunakan di file lain 
module.exports = (sequelize, DataTypes) => {
    //alias class model menjadi detail_of_borrow, Model ini akan memiliki metode dan properti yang mendefinisikan tabel "detail_of_borrows".
    class detail_of_borrow extends Model {
      //Ini adalah metode statis yang digunakan untuk mendefinisikan asosiasi atau hubungan antara model "detail_of_borrow" dengan model-model lain. 
      static associate(models) {
        this.belongsTo(models.borrow)
        this.belongsTo(models.book)
    }
  }
    // Ini adalah metode yang digunakan untuk mendefinisikan struktur tabel "detail_of_borrows" beserta kolom-kolomnya.
    detail_of_borrow.init({
    borrowID: DataTypes.INTEGER,
    bookID: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    //ini adalah objek konfigurasi yang menghubungkan model "detail_of_borrow" ke objek sequelize 
    sequelize,
    modelName: 'detail_of_borrow',
  });
  // mengembalikan detail_of_borrow
  return detail_of_borrow;
};