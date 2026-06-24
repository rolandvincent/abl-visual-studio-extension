# OpenEdge ABL Basics

VS Code extension dasar untuk OpenEdge ABL / Progress 4GL.

Fitur awal:

- Syntax highlighting untuk file `.p`, `.i`, dan `.df`
- Bracket/comment configuration
- Snippets dasar ABL
- Autocomplete keyword, statement, dan beberapa built-in function umum
- Syntax highlighting function bawaan dan modifier ABL berdasarkan Progress ABL Syntax Reference
- Signature help function bawaan ABL berdasarkan halaman detail function Progress
- Autocomplete table dan column dari database schema cache JSON
- Refresh schema cache melalui ODBC connection string
- Go to Definition / clickable link untuk include file seperti `{ar/fmsg.i}` dan procedure seperti `RUN po/item-price-p.p`
- Format Document dasar untuk merapikan indentasi blok ABL

## Menjalankan Extension

1. Jalankan `npm install`
2. Jalankan `npm run compile`
3. Buka project ini di VS Code
4. Tekan `F5` untuk membuka Extension Development Host
5. Buka file `.p`, `.i`, atau `.df`

## Struktur

- `src/extension.ts`: autocomplete provider
- `src/ablSignatures.ts`: generated signature help function bawaan ABL
- `scripts/generate-abl-signatures.mjs`: generator signature dari dokumentasi Progress
- `syntaxes/abl.tmLanguage.json`: TextMate grammar untuk syntax highlighting
- `language-configuration.json`: comment, bracket, dan auto-closing pair
- `snippets/abl.json`: snippet dasar

## Include File Navigation

Path include seperti ini akan dicari relatif ke root folder workspace:

```abl
{ar/fmsg.i}
RUN po/item-price-p.p.
```

Jika file ada di workspace, gunakan `Ctrl+Click` atau command `Go to Definition` pada path include/procedure untuk membuka file tersebut. Document link juga aktif pada path yang berhasil ditemukan.

## Format Document

Gunakan `Format Document` atau shortcut bawaan VS Code untuk merapikan indentasi file ABL.

Formatter saat ini fokus pada indentasi:

- Pembuka blok seperti `DO:`, `FOR EACH:`, `REPEAT:`, `PROCEDURE:`, `FUNCTION:`
- Penutup blok seperti `END.`, `END PROCEDURE.`, `END FUNCTION.`
- Blok include multiline `{ ... }`
- Cabang `ELSE`, `WHEN`, dan `OTHERWISE`
- `FIELD` setelah `DEFINE TEMP-TABLE`

Formatter tidak mengubah kapitalisasi keyword dan tidak memecah statement panjang.

## Database Schema Autocomplete

Extension membaca table dan column dari cache JSON agar autocomplete tetap cepat saat mengetik.

Command yang tersedia:

- `ABL: Set ODBC Connection String`: simpan ODBC connection string di VS Code SecretStorage
- `ABL: Refresh Database Schema`: konek ke database lewat ODBC, ambil table/column, lalu tulis cache JSON
- `ABL: Show Schema Cache`: buka file cache schema yang sedang dipakai

Setting penting:

```json
{
  "abl.database.connectionString": "DSN=OpenEdgeDB;UID=user;PWD=password",
  "abl.database.tableQuery": "SELECT table_name FROM sysprogress.systables WHERE table_type = 'T' ORDER BY table_name",
  "abl.database.columnQuery": "SELECT column_name FROM sysprogress.syscolumns WHERE table_name = ? ORDER BY ordinal_position",
  "abl.database.schemaCacheFile": ""
}
```

`ABL: Set ODBC Connection String` lebih disarankan daripada menyimpan password di `settings.json`.

Format cache:

```json
{
  "refreshedAt": "2026-06-22T04:00:00.000Z",
  "tables": [
    {
      "name": "Customer",
      "columns": [
        {
          "name": "CustNum",
          "dataType": "integer"
        },
        {
          "name": "Name",
          "dataType": "character"
        }
      ]
    }
  ]
}
```

Setelah cache ada:

- Ketik `FOR EACH ` untuk melihat table di daftar autocomplete.
- Ketik `Customer.` untuk melihat column milik table `Customer`.

Jika query bawaan tidak cocok dengan database/driver OpenEdge Anda, ubah `abl.database.tableQuery` dan `abl.database.columnQuery`. Query table harus mengembalikan nama table di kolom pertama. Query column harus menerima satu parameter `?` berisi nama table dan mengembalikan nama column di kolom pertama.
