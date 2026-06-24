# OpenEdge ABL Basics

A VS Code extension for OpenEdge ABL / Progress 4GL.

Initial features:

- Syntax highlighting for `.p`, `.i`, and `.df` files
- Bracket and comment configuration
- Basic ABL snippets
- Keyword, statement, and built-in function autocomplete
- Built-in ABL function and modifier highlighting based on the Progress ABL Syntax Reference
- Built-in ABL function signature help based on Progress function detail pages
- Table and column autocomplete from a database schema cache JSON file
- Schema cache refresh through an ODBC connection string
- Go to Definition and clickable links for include files such as `{ar/fmsg.i}` and procedures such as `RUN po/item-price-p.p`
- Basic Format Document support for ABL block indentation

## Running the Extension

1. Run `npm install`
2. Run `npm run compile`
3. Open this project in VS Code
4. Press `F5` to open the Extension Development Host
5. Open a `.p`, `.i`, or `.df` file

## Project Structure

- `src/extension.ts`: autocomplete provider and language features
- `src/ablSignatures.ts`: generated signature help data for built-in ABL functions
- `scripts/generate-abl-signatures.mjs`: signature generator from Progress documentation
- `syntaxes/abl.tmLanguage.json`: TextMate grammar for syntax highlighting
- `language-configuration.json`: comments, brackets, and auto-closing pairs
- `snippets/abl.json`: basic snippets

## Include File Navigation

Include paths are resolved relative to the workspace root:

```abl
{ar/fmsg.i}
RUN po/item-price-p.p.
```

If the target file exists in the workspace, use `Ctrl+Click` or the `Go to Definition` command on the include/procedure path to open it. Document links are also enabled for paths that can be resolved.

## Format Document

Use `Format Document` or the default VS Code shortcut to format ABL indentation.

The formatter currently focuses on indentation for:

- Block openers such as `DO:`, `FOR EACH:`, `REPEAT:`, `PROCEDURE:`, and `FUNCTION:`
- Block closers such as `END.`, `END PROCEDURE.`, and `END FUNCTION.`
- Multiline include blocks `{ ... }`
- `ELSE`, `WHEN`, and `OTHERWISE` branches
- `FIELD` lines after `DEFINE TEMP-TABLE`

The formatter does not change keyword casing and does not split long statements.

## Database Schema Autocomplete

The extension reads table and column metadata from a JSON cache so autocomplete remains fast while editing.

Available commands:

- `ABL: Set ODBC Connection String`: stores the ODBC connection string in VS Code SecretStorage
- `ABL: Refresh Database Schema`: connects to the database through ODBC, reads table/column metadata, and writes the cache JSON
- `ABL: Show Schema Cache`: opens the schema cache file currently in use

Important settings:

```json
{
  "abl.database.connectionString": "DSN=OpenEdgeDB;UID=user;PWD=password",
  "abl.database.tableQuery": "SELECT table_name FROM sysprogress.systables WHERE table_type = 'T' ORDER BY table_name",
  "abl.database.columnQuery": "SELECT column_name FROM sysprogress.syscolumns WHERE table_name = ? ORDER BY ordinal_position",
  "abl.database.schemaCacheFile": ""
}
```

Using `ABL: Set ODBC Connection String` is recommended instead of storing passwords in `settings.json`.

Cache format:

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

After the cache is available:

- Type `FOR EACH ` to see tables in the autocomplete list.
- Type `Customer.` to see columns for the `Customer` table.

If the default queries do not match your OpenEdge database or driver, update `abl.database.tableQuery` and `abl.database.columnQuery`. The table query must return the table name in the first column. The column query must accept one `?` parameter containing the table name and return the column name in the first column.
