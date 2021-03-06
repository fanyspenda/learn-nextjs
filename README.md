# Catatan Belajar Next.js:

> ### **Note:**
>
> Repo ini merupakan clone dari repo yang disediakan pada tutorial Next.js. Tempat belajar Next.js bisa kalian lihat [di sini](https://nextjs.org/learn).

## 1. Navigate

-   `export default` diperlukan untuk _routing_ otomatis berdasarkan _filename_.
-   `<Link>` menavigasikan halaman dengan javascript. Jika js di-_disable_, halaman akan diload tanpa _pre-rendering_.
-   **Next.js** merender komponen yg diperlukan saja untuk ditampilkan (_codesplitting_).
-   Pada _production_, _Resource_ halaman dari alamat yang tertulis di `<Link>` akan didownload di _background_ terlebih dahulu. Sehingga, ketika diklik, resource sudah siap ditampilkan (_prefetching_).

> ### **Note:**
>
> **Prefetching** = Suatu proses dimana setelah tampilan halaman dimuat, browser akan mem-_fetching_ halaman yang mungkin akan ditampilkan dan disimpan di _cache_. Dengan begitu, ketika halaman tersebut dibuka, pemuatan halaman jadi lebih cepat.
>
> Terdapat 3 jenis prefetching, yaitu:
>
> -   **Link Prefetching** = mem-fetching **RESOURCE** dari link yang ada.
> -   **DNS Prefetching** = melakukan DNS lookup,
> -   **Prerendering** = mem-fetching **KESELURUHAN ISI** halaman dari link yang ada.
>
> sumber: [di sini](https://www.keycdn.com/blog/resource-hints#:~:text=3.-,Prerendering,the%20assets%20of%20a%20document.)

## 2. Assets, Metadata, CSS

-   _Static file_ ditempatkan pada folder `public`. Untuk mengaksesnya, kita tidak perlu menggunakan alamat `/public/images/profile.png`, tapi `/images/profile.png`
-   CSS module harus diakhiri dengan `.module.css`.
-   CSS module memiliki **class name yg di-_generate_ otomatis**. Sehingga, kita bisa menggunakan nama kelas yg sama pada komponen lain tanpa khawatir _crash_.
-   setelah menambahkan `_app.js` pada `pages/`, diperlukan restart project.
-   Next.js meng-_compile_ CSS menggunakan PostCSS.

## 3. Pre-rendering dan Data Fetching

-   Next.js menerapkan _pre-rendering_ pada semua `pages`.
-   setelah halaman yang sudah di-_pre-render_ dimuat, barulah Next.js menjalankan kode javascript dan membuat halaman menjadi interaktif (_hydration_).

> **Note:**
>
> -   **CSR** = browser mendownload **html kosong**, baru javascript. Javascript merender ulang halaman untuk ditampilkan.
> -   **SSR** = browser mendownload **html yang sudah dirender** oleh server, kemudian javascript-nya. Lalu, kode javascript dijalankan, barulah halaman jadi interaktif.
>
> sumber: [di sini](https://medium.com/@theamanverma/what-is-csr-ssr-in-react-14bc3ea2ca32)

-   konsep _pre-render_ tidak ada pada `create-react-app`. Karena **`create-react-app` bukanlah SSR**. Sehingga, jika javascript di-_disable_, halaman web yang menggunakan `create-react-app` tidak akan bisa dimuat.
-   Next.js memiliki 2 jenis _pre-rendering_:
    -   **Static Generation** = page di-_generate_ saat **build-time**, kemudian dapat dipakai berkali-kali pada setiap _request_.
    -   **SSR** = page di-_generate_ tiap request.
-   Jika dijalankan mode dev (`npm run dev`), page akan selalu menggunakan SSR.
-   Tiap halaman bisa menggunakan tipe _pre-rendering_ yang berbeda.
-   Gunakan _static generation_ sebisa mungkin.

### 3.1. Static Generation dan `getStaticProps()`

-   `getStaticProps()` merupakan fungsi `async` untuk melakukan pengambilan data dan menyediakannya, sehingga page bisa di-build dengan metode `static generation`. Fungsi ini **berjalan server-side**. jadi, tidak akan berada pada bundle js.
-   `Static Generation` dan `getStaticProps()` tidak cocok untuk halaman yang harus menampilkan data yang harus selalu _up-to-date_.
-   Export `getStaticProps()` hanya boleh dilakukan di halaman (bukan component).
-   `getStaticProps()` harus mereturn objek yang memiliki property `props`.
-   `getStaticProps()` dapat menerima parameter jika diterapkan pada [halaman _dynamic_](#4-dynamic-route). Parameternya adalah nama dari file tersebut. Misal: terdapat halaman dynamic dengan nama `[id].js`, maka parameter yang dimiliki oleh `getStaticProps()` adalah `{id: ...}`.

### 3.2. Server-Side Rendering

-   Untuk mengaktifkan penggunaan _Server-Side Rendering_ pada halaman, ganti `getStaticProps()` dengan `getServerSideProps()`.

### 3.3. Client-Side Rendering

> **Note:** bagian ini merupakan hal opsional. Tapi, bagus jika dipelajari.

-   Menampilkan bagian halaman yang tidak membutuhkan data terlebih dahulu. ketika sudah dimuat, barulah memuat data yang diperlukan secara **_client-side_** menggunakan javascript (mirip cara kerja `create-react-app`).

## 4. Dynamic Route

-   **Dynamic route** adalah route yang tidak tentu. Contoh: `posts/:id`. `id` dapat berupa angka tertentu dan berbeda setiap _post_-nya.
-   Berikan tanda `[` dan `]` untuk menandai file sebagai dynamic route. Contoh: `[id].js`.
-   Pada penggunaan `getStaticPaths()`, nilai yang direturnkan ketika mengakses external data harus berupa _array of object_ dan objeknya harus memiliki property bernama `params`. Contoh:

```js
return [
	{
		params: { id: "id1" },
	},
	{
		params: { id: "id2" },
	},
];
```

-   Pada fungsi `getStaticPaths()`, harus sebuah objek dengan property bernama `paths` untuk menjadi nama alamatnya. Contoh:

```js
return {
	paths: [
		{
			params: { id: "id1" },
		},
		{
			params: { id: "id2" },
		},
	],
	fallback: false,
};
```

> **Note:**
> property `fallback`, jika bernilai `false`, ketika url yang tidak memiliki halaman diakses, akan mereturn 404 Page Not Found.
> Jika bernilai `true`, path yang direturnkan akan digenerate di build time dan halaman 404 tidak ditampilkan, tapi Next.js akan men-generate halaman versi "fallback".

-   Perbedaan penulisan `<Link>` seperti menjadi `<Link href="/alamat/[dynamicName]" as="/alamat/urlAslinya">`
-   Pada Development, `getStaticPaths()` dijalankan setiap requests.
-   Pada Production,`getStaticPaths()` dijalankan setiap ketika build-time.
-   Mengambil semua routes dapat dilakukan dengan cara `[...]`. Contoh: [...id] akan mengambil route dari `id/nama`, `id/teman/tahun`, dll.
-   Dengan begitu, pada `getStaticPaths()`, harus mereturn id berupa array. misal: `id: ["id1", "teman", "tahun"]`.
-   Untuk mengkustom halaman 404, buat file `404.js` di folder `pages/`.

## 5. API Routes

-   Next.js dapat membuat API-nya sendiri dengan membuat folder `api` di dalam folder `pages/`.
-   Jangan fetching API Next.js dari `getStaticProps()` dan `getStaticPaths()`.
-   API Routes juga dapat dibuat menjadi dinamis seperti dynamic routes.

## 6. Production

-   Next.js merekomendasikan untuk mengembangkan project Next.js menggunakan konsep **DPS**. Yaitu:
    -   Develop: Kembangkan aplikasi,
    -   Preview: Push project ke github dan lihat hasil dari pengembangan/perubahan di Vercel,
    -   Ship: `Merge Pull Request` ke `master` untuk masuk ke _production_.

> **Note:**
> Untuk pengembangan Next.js dengan menggunakan bahasa `TypeScript`, setup dan beberapa hal mengenai typing dapat dilihat [di sini](https://nextjs.org/learn/excel/typescript).
