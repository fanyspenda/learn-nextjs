# This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## Catatan Belajar Next.js:

-   `export default` untuk routing otomatis berdasarkan _filename_
-   `<Link>` menavigasikan halaman dengan javascript.
-   **Next.js** merender komponen yg diperlukan saja untuk ditampilkan (_codesplitting_).
-   `<Link>` pada production, akan didownload di _background_ terlebih dahulu agar ketika diklik, halaman sudah siap ditampilkan (_prefetching_).
-   static file ditempatkan pada folder `public`
-   CSS module memiliki **className yg digenerate otomatis**. Sehingga, kita bisa menggunakan nama variable yg sama pada komponen lain tanpa khawatir _crash_
-   setelah menambahkan `_app.js` pada `pages/`, diperlukan restart project
