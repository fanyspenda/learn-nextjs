# Catatan Belajar Next.js:

> ### **Note:**
>
> Repo ini merupakan clone dari repo yang disediakan pada tutorial Next.js. Tempat belajar Next.js bisa kalian lihat [di sini](https://nextjs.org/learn).

## 1. Navigate

-   `export default` untuk routing otomatis berdasarkan _filename_
-   `<Link>` menavigasikan halaman dengan javascript. Jika js di-_disable_, halaman akan diload tanpa pre-rendering.
-   **Next.js** merender komponen yg diperlukan saja untuk ditampilkan (_codesplitting_).
-   resource halaman dari alamat yang tertulis di `<Link>`, pada production, akan didownload di _background_ terlebih dahulu agar ketika diklik, resource sudah siap ditampilkan (_prefetching_).

> ### **Note:**
>
> Prefetching = fetching resource halaman dari link yang kemungkinan di klik, di background, setelah halaman yang ditampilkan dimuat. Terdapat 3 jenis prefetching, yaitu:
>
> -   Link Prefetching = mem-fetching resource dari link yang ada, dan disimpan di browser cache. Sehingga, resource siap untuk dimuat ketika link diklik.
> -   DNS Prefetching = melakukan DNS lookup,
> -   Prerendering = mem-fetching SELURUH halaman dari link yang tersedia, di background.

## 2. Assets, Metadata, CSS

-   static file ditempatkan pada folder `public`.
-   CSS module harus diakhiri dengan `.module.css`.
-   CSS module memiliki **className yg digenerate otomatis**. Sehingga, kita bisa menggunakan nama variable yg sama pada komponen lain tanpa khawatir _crash_.
-   setelah menambahkan `_app.js` pada `pages/`, diperlukan restart project.
-   Next.js meng-_compile_ CSS menggunakan PostCSS

## 3. Pre-rendering dan Data Fetching

-   Next.js pre-rendering semua `pages`.
-   setelah halaman yang sudah di pre-render dimuat, barulah Next.js menjalankan kode javascript dan membuat halaman menjadi interaktif (konsep SSR).
-   konsep prerender tidak ada pada create-react-app. Karena create-react-app bukanlah SSR. Sehingga, jika js di-disable, halaman create-react-app tidak akan bisa dimuat.
-   Next.js memiliki 2 jenis prerendering:
    -   Static Generation = page di-_generate_ saat **build-time**, kemudian dapat dipakai berkali-kali pada setiap _request_.
    -   SSR = page digenerate tiap request.
-   Jika dijalankan mode dev (`npm run dev`), page akan selalu menggunakan SSR.
-   tiap halaman bisa menggunakan tipe prerendering yang berbeda.
-   gunakan static generation sebisa mungkin.
