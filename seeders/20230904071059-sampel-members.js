// Ini adalah pernyataan JavaScript yang memaksa kode berada dalam mode "strict" berarti beberapa aturan diterapkan pada kode untuk mengurangi kesalahan
'use strict';


/** @type {import('sequelize-cli').Migration} */
// mengeksport variabel supaya bisa digunakan di file lain
module.exports = {
  // Ini adalah metode up yang digunakan untuk menerapkan migrasi. Ketika migrasi dijalankan, kode di dalam metode up ini akan dijalankan.
  async up (queryInterface, Sequelize) {
    //Ini adalah metode Sequelize yang digunakan untuk memasukkan beberapa baris data ke dalam tabel members. 
    await queryInterface.bulkInsert("members", [
      {
        name: `Pandhu`, gender: `Male`,
        contact: `087858496019`, address:`Tokyo Japan`,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: `Arya`, gender: `Male`,
        contact: `087858496013`, address:`Hiroshima Japan`,
        createdAt: new Date(), updatedAt: new Date()
      }
    ], {})
  },
// Ini adalah metode down yang digunakan untuk menggulirkan (rollback) migrasi. Ketika Anda memutuskan untuk menggulirkan migrasi, kode di dalam metode down ini akan dijalankan.
  async down (queryInterface, Sequelize) {
    // Ini adalah metode Sequelize yang digunakan untuk menghapus semua data dari tabel members. 
    await queryInterface.bulkDelete('members', null, {});
  }
};
