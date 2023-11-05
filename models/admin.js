//Ini adalah pernyataan JavaScript yang memaksa kode berada dalam mode "strict", yang berarti beberapa aturan tambahan akan diterapkan pada kode untuk mengurangi kesalahan
'use strict';
// Ini mengimpor modul Model dari pustaka Sequelize. Model adalah kelas dasar yang digunakan untuk mendefinisikan model-model yang mewakili tabel dalam database.
const { Model } = require('sequelize');
//mengeksport variabel supaya bisa digunakan di file lain 
module.exports = (sequelize, DataTypes) => {
  //alias class model menjadi admin, Model ini akan memiliki metode dan properti yang mendefinisikan tabel "admins".
  class admin extends Model {
    //Ini adalah metode statis yang digunakan untuk mendefinisikan asosiasi atau hubungan antara model "admin" dengan model-model lain. 
    static associate(models) {
      this.hasMany(models.borrow, {
        foreignKey: `adminID`, as: "borrow"
      })
    }
  }
  // Ini adalah metode yang digunakan untuk mendefinisikan struktur tabel "admins" beserta kolom-kolomnya.
  admin.init({
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    //ini adalah objek konfigurasi yang menghubungkan model "admin" ke objek sequelize 
    sequelize,
    modelName: 'admin',
  });
    // mengembalikan admin
  return admin;
};