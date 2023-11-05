//Ini adalah pernyataan JavaScript yang memaksa kode berada dalam mode "strict", yang berarti beberapa aturan tambahan akan diterapkan pada kode untuk mengurangi kesalahan
'use strict';
// Ini mengimpor modul Model dari pustaka Sequelize. Model adalah kelas dasar yang digunakan untuk mendefinisikan model-model yang mewakili tabel dalam database.
const { Model } = require('sequelize');
//mengeksport variabel supaya bisa digunakan di file lain 
module.exports = (sequelize, DataTypes) => {
  //alias class model menjadi member, Model ini akan memiliki metode dan properti yang mendefinisikan tabel "members".
  class member extends Model {
    //Ini adalah metode statis yang digunakan untuk mendefinisikan asosiasi atau hubungan antara model "member" dengan model-model lain. 
    static associate(models) {
      this.hasMany(models.borrow, {
        foreignKey: `memberID`, as: "borrow"
      })
    }
  }
  // Ini adalah metode yang digunakan untuk mendefinisikan struktur tabel "members" beserta kolom-kolomnya.
  member.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    //ini adalah objek konfigurasi yang menghubungkan model "member" ke objek sequelize 
    sequelize,
    modelName: 'member',
  });
  // mengembalikan member
  return member;
};