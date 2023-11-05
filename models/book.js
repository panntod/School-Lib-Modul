//Ini adalah pernyataan JavaScript yang memaksa kode berada dalam mode "strict", yang berarti beberapa aturan tambahan akan diterapkan pada kode untuk mengurangi kesalahan
'use strict';
// Ini mengimpor modul Model dari pustaka Sequelize. Model adalah kelas dasar yang digunakan untuk mendefinisikan model-model yang mewakili tabel dalam database.
const { Model } = require('sequelize');
//mengeksport variabel supaya bisa digunakan di file lain 
module.exports = (sequelize, DataTypes) => {
  //alias class model menjadi book, Model ini akan memiliki metode dan properti yang mendefinisikan tabel "books".
  class book extends Model {
    //Ini adalah metode statis yang digunakan untuk mendefinisikan asosiasi atau hubungan antara model "book" dengan model-model lain. 
    static associate(models) {
      this.hasMany(models.detail_of_borrow, {
        foreignKey: 'bookID', as: 'detail_of_borrow'
      })
    }
  }
  // Ini adalah metode yang digunakan untuk mendefinisikan struktur tabel "books" beserta kolom-kolomnya.
  book.init({
    isbn: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    category: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    cover: DataTypes.STRING
  }, {
    //ini adalah objek konfigurasi yang menghubungkan model "book" ke objek sequelize 
    sequelize,
    modelName: 'book',
  });
  //mengembalikan book
  return book;
};