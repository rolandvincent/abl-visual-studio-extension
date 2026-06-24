import * as vscode from 'vscode';
import * as path from 'path';
import { builtInSignatures } from './ablSignatures';

type AblCompletion = {
  label: string;
  detail: string;
  documentation?: string;
  insertText?: string;
  kind?: vscode.CompletionItemKind;
};

type SchemaColumn = {
  name: string;
  dataType?: string;
};

type SchemaTable = {
  name: string;
  columns: SchemaColumn[];
};

type DatabaseSchema = {
  refreshedAt: string;
  tables: SchemaTable[];
};

type AblVariableSymbol = {
  name: string;
  dataType?: string;
  definitionRange: vscode.Range;
  nameRange: vscode.Range;
};

type AblRoutineParameter = {
  name: string;
  direction?: string;
  dataType?: string;
};

type AblRoutineSymbol = {
  name: string;
  kind: 'procedure' | 'function';
  returnType?: string;
  parameters: AblRoutineParameter[];
  range: vscode.Range;
  nameRange: vscode.Range;
};

type AblLabelSymbol = {
  name: string;
  definitionRange: vscode.Range;
  nameRange: vscode.Range;
};

type CommentStripResult = {
  code: string;
  commentDepth: number;
};

type IncludeDepthResult = {
  includeDepth: number;
  started: boolean;
  closed: boolean;
};

type OdbcConnection = {
  query: (sql: string, params?: unknown[]) => Promise<Record<string, unknown>[]>;
  close: () => Promise<void>;
};

const connectionSecretKey = 'abl.database.connectionString';

const completions: AblCompletion[] = [
  { label: 'DEFINE VARIABLE', detail: 'ABL statement', insertText: 'DEFINE VARIABLE ${1:name} AS ${2:CHARACTER} NO-UNDO.', kind: vscode.CompletionItemKind.Snippet },
  { label: 'DEFINE TEMP-TABLE', detail: 'ABL statement', insertText: 'DEFINE TEMP-TABLE ${1:name} NO-UNDO\n    FIELD ${2:fieldName} AS ${3:CHARACTER}.', kind: vscode.CompletionItemKind.Snippet },
  { label: 'FOR EACH', detail: 'ABL block', insertText: 'FOR EACH ${1:tableName} NO-LOCK:\n    ${0}\nEND.', kind: vscode.CompletionItemKind.Snippet },
  { label: 'IF THEN DO', detail: 'ABL block', insertText: 'IF ${1:condition} THEN DO:\n    ${0}\nEND.', kind: vscode.CompletionItemKind.Snippet },
  { label: 'PROCEDURE', detail: 'ABL block', insertText: 'PROCEDURE ${1:name}:\n    ${0}\nEND PROCEDURE.', kind: vscode.CompletionItemKind.Snippet },
  { label: 'FUNCTION', detail: 'ABL block', insertText: 'FUNCTION ${1:name} RETURNS ${2:CHARACTER} (${3:}):\n    ${0}\nEND FUNCTION.', kind: vscode.CompletionItemKind.Snippet },
  { label: 'NO-LOCK', detail: 'ABL record lock option' },
  { label: 'EXCLUSIVE-LOCK', detail: 'ABL record lock option' },
  { label: 'NO-UNDO', detail: 'ABL variable option' },
  { label: 'NO-ERROR', detail: 'ABL error option' },
  { label: 'ABSOLUTE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ACCUM', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ADD-INTERVAL', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ALIAS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'AMBIGUOUS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ASC', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'AUDIT-ENABLED', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'AVAILABLE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'BASE64-DECODE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'BASE64-ENCODE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'BOX', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'BUFFER-GROUP-ID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'BUFFER-GROUP-NAME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'BUFFER-PARTITION-ID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'BUFFER-TENANT-ID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'BUFFER-TENANT-NAME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CAN-DO', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CAN-FIND', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CAN-QUERY', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CAN-SET', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CAPS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CAST', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CHR', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CODEPAGE-CONVERT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'COMPARE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CONNECTED', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'COUNT-OF', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CURRENT-CHANGED', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CURRENT-LANGUAGE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CURRENT-RESULT-ROW', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CURRENT-VALUE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DATA-SOURCE-MODIFIED', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DATASERVERS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DATE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DATETIME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DATETIME-TZ', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DAY', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DB-REMOTE-HOST', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DBCODEPAGE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DBCOLLATION', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DBNAME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DBPARAM', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DBRESTRICTIONS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DBTASKID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DBTYPE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DBVERSION', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DECIMAL', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DECRYPT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DYNAMIC-CAST', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DYNAMIC-CURRENT-VALUE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DYNAMIC-ENUM', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DYNAMIC-FUNCTION', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DYNAMIC-INVOKE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DYNAMIC-NEXT-VALUE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'DYNAMIC-PROPERTY', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ENCODE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ENCRYPT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ENTERED', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ENTRY', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ERROR', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ETIME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'EXP', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'EXTENT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FILL', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FIRST', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FIRST-OF', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FRAME-COL', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FRAME-DB', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FRAME-DOWN', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FRAME-FIELD', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FRAME-FILE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FRAME-INDEX', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FRAME-LINE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FRAME-NAME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FRAME-ROW', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'FRAME-VALUE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GATEWAYS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GENERATE-PASSWORD-HASH', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GENERATE-PBE-KEY', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GENERATE-PBE-SALT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GENERATE-RANDOM-KEY', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GENERATE-SALT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GENERATE-UUID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-BITS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-BYTE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-BYTE-ORDER', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-BYTES', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-CLASS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-CODEPAGE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-CODEPAGES', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-COLLATION', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-COLLATIONS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-DB-CLIENT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-DOUBLE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-EFFECTIVE-TENANT-ID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-EFFECTIVE-TENANT-NAME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-FLOAT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-INT64', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-LONG', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-POINTER-VALUE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-SHORT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-SIZE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-STRING', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-UNSIGNED-LONG', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GET-UNSIGNED-SHORT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GO-PENDING', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'GUID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'HANDLE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'HASH-CODE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'HEX-DECODE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'HEX-ENCODE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'INDEX', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'INPUT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'INT64', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'INTEGER', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'INTERVAL', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'IS-ATTR-SPACE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'IS-CODEPAGE-FIXED', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'IS-COLUMN-CODEPAGE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'IS-DB-MULTI-TENANT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'IS-LEAD-BYTE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ISO-DATE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'KBLABEL', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'KEYCODE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'KEYFUNCTION', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'KEYLABEL', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'KEYWORD', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'KEYWORD-ALL', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LAST', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LAST-OF', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LASTKEY', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LC', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LDBNAME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LEFT-TRIM', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LENGTH', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LIBRARY', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LINE-COUNTER', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LIST-EVENTS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LIST-QUERY-ATTRS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LIST-SET-ATTRS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LIST-WIDGETS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LOCKED', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LOG', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LOGICAL', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'LOOKUP', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'MAXIMUM', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'MD5-DIGEST', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'MEMBER', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'MESSAGE-DIGEST', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'MESSAGE-LINES', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'MINIMUM', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'MONTH', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'MTIME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'NEXT-VALUE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'NORMALIZE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'NOW', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'NUM-ALIASES', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'NUM-DBS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'NUM-ENTRIES', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'NUM-RESULTS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'OPSYS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'OS-DRIVES', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'OS-ERROR', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'OS-GETENV', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'PAGE-NUMBER', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'PAGE-SIZE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'PDBNAME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'PROC-HANDLE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'PROC-STATUS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'PROCESS-ARCHITECTURE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'PROGRAM-NAME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'PROGRESS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'PROMSGS', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'PROPATH', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'PROVERSION', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'QUERY-OFF-END', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'QUOTER', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'R-INDEX', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'RANDOM', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'RAW', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'RECID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'RECORD-LENGTH', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'REJECTED', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'REPLACE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'RETRY', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'RETURN-VALUE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'RGB-VALUE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'RIGHT-TRIM', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ROUND', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ROW-STATE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'ROWID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SCREEN-LINES', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SDBNAME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SEARCH', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SEEK', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SET-DB-CLIENT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SET-EFFECTIVE-TENANT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SETUSERID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SHA1-DIGEST', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SQRT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SSL-SERVER-NAME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'STRING', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SUBSTITUTE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SUBSTRING', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'SUPER', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TENANT-ID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TENANT-NAME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TENANT-NAME-TO-ID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TERMINAL', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TIME', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TIMEZONE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TO-ROWID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TODAY', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TRANSACTION', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TRIM', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TRUNCATE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'TYPE-OF', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'UNBOX', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'USERID', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'VALID-EVENT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'VALID-HANDLE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'VALID-OBJECT', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'WEEKDAY', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'WIDGET-HANDLE', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'YEAR', detail: 'ABL function', kind: vscode.CompletionItemKind.Function },
  { label: 'CHARACTER', detail: 'ABL data type', kind: vscode.CompletionItemKind.TypeParameter },
  { label: 'INTEGER', detail: 'ABL data type', kind: vscode.CompletionItemKind.TypeParameter },
  { label: 'DECIMAL', detail: 'ABL data type', kind: vscode.CompletionItemKind.TypeParameter },
  { label: 'LOGICAL', detail: 'ABL data type', kind: vscode.CompletionItemKind.TypeParameter },
  { label: 'DATE', detail: 'ABL data type', kind: vscode.CompletionItemKind.TypeParameter },
  { label: 'DATETIME', detail: 'ABL data type', kind: vscode.CompletionItemKind.TypeParameter },
  { label: 'HANDLE', detail: 'ABL data type', kind: vscode.CompletionItemKind.TypeParameter }
];

type AblSignatureDefinition = {
  label: string;
  documentation?: string;
  parameters: string[];
};

let databaseSchema: DatabaseSchema = {
  refreshedAt: '',
  tables: []
};

type FoldingStart = {
  line: number;
  kind?: vscode.FoldingRangeKind;
  type: 'block' | 'include' | 'comment';
};

const blockStartPattern = /^\s*(?:[a-z_][a-z0-9_-]*\s*:\s*)?(?:(?:procedure|function|method|constructor|destructor|class|interface|do|repeat|for|case)\b.*:|.*\bthen\s+do\b.*:|else\s+do\b.*:)/i;
const blockHeaderPrefixPattern = /^\s*(?:[a-z_][a-z0-9_-]*\s*:\s*)?(?:(?:procedure|function|method|constructor|destructor|class|interface|do|repeat|for|case)\b|.*\bthen\s+do\b|else\s+do\b)/i;
const blockEndPattern = /^\s*end(?:\s+(?:procedure|function|method|constructor|destructor|class|interface|case))?\s*\./i;
const includeStartPattern = /^\s*\{(?!\d)/;
const includeEndPattern = /^\s*\}/;
const includePathPattern = /\{\s*([A-Za-z0-9_./\\-]+\.(?:i|p|df))\b/gi;
const runPathPattern = /\brun\s+([A-Za-z0-9_./\\-]+\.p)\b/gi;
const ablIdentifierPattern = /[A-Za-z_][A-Za-z0-9_-]*/g;
const semanticTokenTypes = ['variable', 'function', 'method', 'struct', 'property', 'label'];
const semanticTokenLegend = new vscode.SemanticTokensLegend(semanticTokenTypes, []);
const dotBlockDiagnosticCode = 'abl.blockHeaderDot';

function createRange(start: FoldingStart, endLine: number): vscode.FoldingRange | undefined {
  if (endLine <= start.line) {
    return undefined;
  }

  return new vscode.FoldingRange(start.line, endLine, start.kind);
}

function provideAblFoldingRanges(document: vscode.TextDocument): vscode.FoldingRange[] {
  const ranges: vscode.FoldingRange[] = [];
  const stack: FoldingStart[] = [];

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const text = document.lineAt(lineNumber).text;
    const trimmed = text.trim();

    if (trimmed.includes('/*')) {
      stack.push({ line: lineNumber, kind: vscode.FoldingRangeKind.Comment, type: 'comment' });
    }

    if (trimmed.includes('*/')) {
      const index = findLastStackIndex(stack, 'comment');
      const start = index >= 0 ? stack.splice(index, 1)[0] : undefined;
      const range = start ? createRange(start, lineNumber) : undefined;

      if (range && start!.line > lineNumber) {
        ranges.push(range);
      }

      continue;
    }

    if (includeEndPattern.test(text)) {
      const index = findLastStackIndex(stack, 'include');
      const start = index >= 0 ? stack.splice(index, 1)[0] : undefined;
      const range = start ? createRange(start, lineNumber) : undefined;

      if (range) {
        ranges.push(range);
      }

      continue;
    }

    if (blockEndPattern.test(text)) {
      const index = findLastStackIndex(stack, 'block');
      const start = index >= 0 ? stack.splice(index, 1)[0] : undefined;
      const range = start ? createRange(start, lineNumber) : undefined;

      if (range) {
        ranges.push(range);
      }

      continue;
    }

    if (includeStartPattern.test(text) && !trimmed.includes('}')) {
      stack.push({ line: lineNumber, type: 'include' });
      continue;
    }

    if (blockStartPattern.test(text) && !blockEndPattern.test(text)) {
      stack.push({ line: lineNumber, type: 'block' });
    }
  }

  return ranges;
}

function findLastStackIndex(stack: FoldingStart[], type: FoldingStart['type']): number {
  for (let index = stack.length - 1; index >= 0; index -= 1) {
    if (stack[index].type === type) {
      return index;
    }
  }

  return -1;
}

function normalizeAblPath(includePath: string): string {
  return includePath.replace(/\\/g, '/').replace(/^\/+/, '');
}

async function fileExists(uri: vscode.Uri): Promise<boolean> {
  try {
    const stat = await vscode.workspace.fs.stat(uri);
    return stat.type === vscode.FileType.File;
  } catch {
    return false;
  }
}

async function resolveWorkspaceInclude(includePath: string): Promise<vscode.Uri | undefined> {
  const normalizedPath = normalizeAblPath(includePath);
  const workspaceFolders = vscode.workspace.workspaceFolders ?? [];

  for (const folder of workspaceFolders) {
    const uri = vscode.Uri.joinPath(folder.uri, ...normalizedPath.split('/'));

    if (await fileExists(uri)) {
      return uri;
    }
  }

  return undefined;
}

function pathAtPosition(
  document: vscode.TextDocument,
  position: vscode.Position,
  pattern: RegExp
): { path: string; range: vscode.Range } | undefined {
  const line = document.lineAt(position.line).text;
  let match: RegExpExecArray | null;

  pattern.lastIndex = 0;

  while ((match = pattern.exec(line)) !== null) {
    const includePath = match[1];
    const start = match.index + match[0].indexOf(includePath);
    const end = start + includePath.length;

    if (position.character >= start && position.character <= end) {
      return {
        path: includePath,
        range: new vscode.Range(position.line, start, position.line, end)
      };
    }
  }

  return undefined;
}

function linkedPathAtPosition(document: vscode.TextDocument, position: vscode.Position): { path: string; range: vscode.Range } | undefined {
  return pathAtPosition(document, position, includePathPattern)
    ?? pathAtPosition(document, position, runPathPattern);
}

function runRoutineAtPosition(document: vscode.TextDocument, position: vscode.Position): { name: string; range: vscode.Range } | undefined {
  const line = document.lineAt(position.line).text;
  const pattern = /\brun\s+([A-Za-z_][A-Za-z0-9_-]*)\b/gi;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line)) !== null) {
    const name = match[1];
    const start = match.index + match[0].toLowerCase().lastIndexOf(name.toLowerCase());
    const end = start + name.length;

    if (position.character >= start && position.character <= end) {
      return {
        name,
        range: new vscode.Range(position.line, start, position.line, end)
      };
    }
  }

  return undefined;
}

function isAblIdentifierChar(char: string | undefined): boolean {
  return Boolean(char && /[A-Za-z0-9_-]/.test(char));
}

function isAblIdentifierStart(char: string | undefined): boolean {
  return Boolean(char && /[A-Za-z_]/.test(char));
}

function getAblIdentifierRangeAtPosition(document: vscode.TextDocument, position: vscode.Position): vscode.Range | undefined {
  const line = document.lineAt(position.line).text;
  let start = position.character;
  let end = position.character;

  if (!isAblIdentifierChar(line[start]) && start > 0 && isAblIdentifierChar(line[start - 1])) {
    start -= 1;
    end -= 1;
  }

  if (!isAblIdentifierChar(line[start])) {
    return undefined;
  }

  while (start > 0 && isAblIdentifierChar(line[start - 1])) {
    start -= 1;
  }

  while (end < line.length && isAblIdentifierChar(line[end])) {
    end += 1;
  }

  if (!isAblIdentifierStart(line[start])) {
    return undefined;
  }

  return new vscode.Range(position.line, start, position.line, end);
}

function getAblIdentifierAtPosition(document: vscode.TextDocument, position: vscode.Position): { name: string; range: vscode.Range } | undefined {
  const range = getAblIdentifierRangeAtPosition(document, position);

  if (!range) {
    return undefined;
  }

  return {
    name: document.getText(range),
    range
  };
}

function findAblVariableDefinitions(document: vscode.TextDocument): AblVariableSymbol[] {
  const definitions: AblVariableSymbol[] = [];
  let commentDepth = 0;

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const originalLine = document.lineAt(lineNumber).text;
    const commentStripped = stripBlockComments(originalLine, commentDepth);
    const codeLine = commentStripped.code;
    const match = codeLine.match(/^\s*(?:define|def)\s+(?:variable|var)\s+([A-Za-z_][A-Za-z0-9_-]*)\b(?:.*?\s+(?:as|like)\s+([A-Za-z_][A-Za-z0-9_.-]*))?/i);

    commentDepth = commentStripped.commentDepth;

    if (!match) {
      continue;
    }

    const name = match[1];
    const originalMatch = /^\s*(?:define|def)\s+(?:variable|var)\s+([A-Za-z_][A-Za-z0-9_-]*)\b/i.exec(originalLine);
    const nameStart = originalMatch?.[0].toLowerCase().lastIndexOf(name.toLowerCase()) ?? -1;

    if (nameStart < 0) {
      continue;
    }

    const nameRange = new vscode.Range(lineNumber, nameStart, lineNumber, nameStart + name.length);

    definitions.push({
      name,
      dataType: match[2],
      definitionRange: new vscode.Range(lineNumber, 0, lineNumber, originalLine.length),
      nameRange
    });
  }

  return definitions;
}

function findAblVariableDefinition(
  document: vscode.TextDocument,
  name: string,
  position?: vscode.Position
): AblVariableSymbol | undefined {
  const lowerName = name.toLowerCase();
  const definitions = findAblVariableDefinitions(document)
    .filter((definition) => definition.name.toLowerCase() === lowerName);

  if (!position || definitions.length <= 1) {
    return definitions[0];
  }

  const precedingDefinitions = definitions
    .filter((definition) => definition.nameRange.start.isBeforeOrEqual(position))
    .sort((left, right) => right.nameRange.start.compareTo(left.nameRange.start));

  return precedingDefinitions[0] ?? definitions[0];
}

function isDefinedAblVariable(document: vscode.TextDocument, name: string, position?: vscode.Position): boolean {
  return Boolean(findAblVariableDefinition(document, name, position));
}

function isReservedAblBlockWord(name: string): boolean {
  return /^(?:do|repeat|for|case|if|else|procedure|function|method|constructor|destructor|class|interface)$/i.test(name);
}

function isLabelBlockTarget(codeLine: string): boolean {
  const trimmed = codeLine.trim();

  return /^(?:do|repeat|for|case)\b/i.test(trimmed)
    || /^.*\bthen\s+do\b/i.test(trimmed)
    || /^else\s+do\b/i.test(trimmed);
}

function nextCodeLine(document: vscode.TextDocument, startLine: number): string | undefined {
  let commentDepth = 0;

  for (let lineNumber = startLine; lineNumber < document.lineCount; lineNumber += 1) {
    const commentStripped = stripBlockComments(document.lineAt(lineNumber).text, commentDepth);
    const codeLine = commentStripped.code.trim();

    commentDepth = commentStripped.commentDepth;

    if (codeLine) {
      return codeLine;
    }
  }

  return undefined;
}

function findAblLabelDefinitions(document: vscode.TextDocument): AblLabelSymbol[] {
  const labels: AblLabelSymbol[] = [];
  let commentDepth = 0;

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const originalLine = document.lineAt(lineNumber).text;
    const commentStripped = stripBlockComments(originalLine, commentDepth);
    const codeLine = commentStripped.code;
    const match = codeLine.match(/^\s*([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$/);

    commentDepth = commentStripped.commentDepth;

    if (!match || isReservedAblBlockWord(match[1])) {
      continue;
    }

    const rest = match[2].trim();
    const labelsSameLineBlock = rest && isLabelBlockTarget(rest);
    const labelsNextLineBlock = !rest && isLabelBlockTarget(nextCodeLine(document, lineNumber + 1) ?? '');

    if (!labelsSameLineBlock && !labelsNextLineBlock) {
      continue;
    }

    const name = match[1];
    const nameStart = originalLine.toLowerCase().indexOf(name.toLowerCase());

    if (nameStart < 0) {
      continue;
    }

    labels.push({
      name,
      definitionRange: new vscode.Range(lineNumber, 0, lineNumber, originalLine.length),
      nameRange: new vscode.Range(lineNumber, nameStart, lineNumber, nameStart + name.length)
    });
  }

  return labels;
}

function findAblLabelDefinition(
  document: vscode.TextDocument,
  name: string,
  position?: vscode.Position
): AblLabelSymbol | undefined {
  const lowerName = name.toLowerCase();
  const definitions = findAblLabelDefinitions(document)
    .filter((label) => label.name.toLowerCase() === lowerName);

  if (!position || definitions.length <= 1) {
    return definitions[0];
  }

  const precedingDefinitions = definitions
    .filter((label) => label.nameRange.start.isBeforeOrEqual(position))
    .sort((left, right) => right.nameRange.start.compareTo(left.nameRange.start));

  return precedingDefinitions[0] ?? definitions[0];
}

function findAblLabelReferences(document: vscode.TextDocument, label: AblLabelSymbol): vscode.Range[] {
  const ranges: vscode.Range[] = [label.nameRange];
  const lowerName = label.name.toLowerCase();
  let commentDepth = 0;

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const originalLine = document.lineAt(lineNumber).text;
    const masked = maskNonCodeSegments(originalLine, commentDepth);
    const pattern = /\b(?:next|leave)\s+([A-Za-z_][A-Za-z0-9_-]*)\b/gi;
    let match: RegExpExecArray | null;

    commentDepth = masked.commentDepth;

    while ((match = pattern.exec(masked.code)) !== null) {
      if (match[1].toLowerCase() !== lowerName) {
        continue;
      }

      const start = match.index + match[0].toLowerCase().lastIndexOf(lowerName);
      const range = new vscode.Range(lineNumber, start, lineNumber, start + label.name.length);
      const targetLabel = findAblLabelDefinition(document, label.name, range.start);

      if (!targetLabel?.nameRange.isEqual(label.nameRange)) {
        continue;
      }

      if (!range.isEqual(label.nameRange)) {
        ranges.push(range);
      }
    }
  }

  return ranges;
}

function normalizeParameterDirection(direction: string | undefined): string | undefined {
  if (!direction) {
    return undefined;
  }

  return direction.toUpperCase();
}

function formatRoutineParameter(parameter: AblRoutineParameter): string {
  const parts = [
    parameter.direction,
    parameter.name,
    parameter.dataType ? `AS ${parameter.dataType}` : undefined
  ].filter(Boolean);

  return parts.join(' ');
}

function parseDefineParameter(line: string): AblRoutineParameter | undefined {
  const match = line.match(/^\s*(?:define|def)\s+(?:(input-output|input|output|return)\s+)?parameter\s+([A-Za-z_][A-Za-z0-9_-]*)\s+(?:as|like)\s+([A-Za-z_][A-Za-z0-9_-]*)/i);

  if (!match) {
    return undefined;
  }

  return {
    direction: normalizeParameterDirection(match[1]),
    name: match[2],
    dataType: match[3]
  };
}

function parseInlineRoutineParameters(text: string): AblRoutineParameter[] {
  return text
    .split(',')
    .map((part) => part.trim())
    .map((part): AblRoutineParameter | undefined => {
      const match = part.match(/^(?:(input-output|input|output)\s+)?([A-Za-z_][A-Za-z0-9_-]*)\s+(?:as|like)\s+([A-Za-z_][A-Za-z0-9_-]*)/i);

      if (!match) {
        return undefined;
      }

      return {
        direction: normalizeParameterDirection(match[1]),
        name: match[2],
        dataType: match[3]
      };
    })
    .filter((parameter): parameter is AblRoutineParameter => Boolean(parameter));
}

function findAblRoutineDefinitions(document: vscode.TextDocument): AblRoutineSymbol[] {
  const routines: AblRoutineSymbol[] = [];
  let currentRoutine: AblRoutineSymbol | undefined;
  let commentDepth = 0;
  let pendingFunction: { name: string; returnType: string; line: number; signature: string } | undefined;

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const originalLine = document.lineAt(lineNumber).text;
    const commentStripped = stripBlockComments(originalLine, commentDepth);
    const codeLine = commentStripped.code.trim();

    commentDepth = commentStripped.commentDepth;

    if (!codeLine) {
      continue;
    }

    if (pendingFunction) {
      pendingFunction.signature = `${pendingFunction.signature} ${codeLine}`;

      if (codeLine.includes(':')) {
        const signature = pendingFunction.signature;
        const paramsText = signature.match(/\((.*)\)/)?.[1] ?? '';
        const originalFunctionLine = document.lineAt(pendingFunction.line).text;
        const nameStart = originalFunctionLine.toLowerCase().indexOf(pendingFunction.name.toLowerCase());
        currentRoutine = {
          name: pendingFunction.name,
          kind: 'function',
          returnType: pendingFunction.returnType,
          parameters: parseInlineRoutineParameters(paramsText),
          range: new vscode.Range(pendingFunction.line, 0, pendingFunction.line, originalFunctionLine.length),
          nameRange: new vscode.Range(pendingFunction.line, nameStart, pendingFunction.line, nameStart + pendingFunction.name.length)
        };
        routines.push(currentRoutine);
        pendingFunction = undefined;
      }

      continue;
    }

    if (/^end\s+(?:procedure|function)\s*\./i.test(codeLine)) {
      currentRoutine = undefined;
      continue;
    }

    const procedureMatch = codeLine.match(/^procedure\s+([A-Za-z_][A-Za-z0-9_-]*)\s*:/i);

    if (procedureMatch) {
      const nameStart = originalLine.toLowerCase().indexOf(procedureMatch[1].toLowerCase());
      currentRoutine = {
        name: procedureMatch[1],
        kind: 'procedure',
        parameters: [],
        range: new vscode.Range(lineNumber, 0, lineNumber, originalLine.length),
        nameRange: new vscode.Range(lineNumber, nameStart, lineNumber, nameStart + procedureMatch[1].length)
      };
      routines.push(currentRoutine);
      continue;
    }

    const functionMatch = codeLine.match(/^function\s+([A-Za-z_][A-Za-z0-9_-]*)\s+returns\s+([A-Za-z_][A-Za-z0-9_-]*)\b(.*)$/i);

    if (functionMatch) {
      const signature = functionMatch[3].trim();

      if (signature.includes(':')) {
        const paramsText = signature.match(/\((.*)\)/)?.[1] ?? '';
        const nameStart = originalLine.toLowerCase().indexOf(functionMatch[1].toLowerCase());
        currentRoutine = {
          name: functionMatch[1],
          kind: 'function',
          returnType: functionMatch[2],
          parameters: parseInlineRoutineParameters(paramsText),
          range: new vscode.Range(lineNumber, 0, lineNumber, originalLine.length),
          nameRange: new vscode.Range(lineNumber, nameStart, lineNumber, nameStart + functionMatch[1].length)
        };
        routines.push(currentRoutine);
      } else {
        pendingFunction = {
          name: functionMatch[1],
          returnType: functionMatch[2],
          line: lineNumber,
          signature
        };
      }

      continue;
    }

    if (!currentRoutine) {
      continue;
    }

    const parameter = parseDefineParameter(codeLine);

    if (parameter) {
      currentRoutine.parameters.push(parameter);
    }
  }

  return routines;
}

function findAblRoutineDefinition(document: vscode.TextDocument, name: string): AblRoutineSymbol | undefined {
  const lowerName = name.toLowerCase();
  return findAblRoutineDefinitions(document)
    .find((definition) => definition.name.toLowerCase() === lowerName);
}

function findAblRoutineReferences(document: vscode.TextDocument, routine: AblRoutineSymbol): vscode.Range[] {
  const ranges: vscode.Range[] = [routine.nameRange];
  const lowerName = routine.name.toLowerCase();
  let commentDepth = 0;

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const originalLine = document.lineAt(lineNumber).text;
    const masked = maskNonCodeSegments(originalLine, commentDepth);

    commentDepth = masked.commentDepth;

    const runPattern = /\brun\s+([A-Za-z_][A-Za-z0-9_-]*)\b/gi;
    let runMatch: RegExpExecArray | null;

    while ((runMatch = runPattern.exec(masked.code)) !== null) {
      if (runMatch[1].toLowerCase() !== lowerName) {
        continue;
      }

      const start = runMatch.index + runMatch[0].toLowerCase().lastIndexOf(lowerName);
      ranges.push(new vscode.Range(lineNumber, start, lineNumber, start + routine.name.length));
    }

    if (routine.kind !== 'function') {
      continue;
    }

    const functionPattern = /([A-Za-z_][A-Za-z0-9_-]*)\s*\(/g;
    let functionMatch: RegExpExecArray | null;

    while ((functionMatch = functionPattern.exec(masked.code)) !== null) {
      if (functionMatch[1].toLowerCase() !== lowerName) {
        continue;
      }

      const start = functionMatch.index;
      const range = new vscode.Range(lineNumber, start, lineNumber, start + routine.name.length);

      if (!routine.nameRange.isEqual(range)) {
        ranges.push(range);
      }
    }
  }

  return ranges;
}

function isDottedIdentifier(line: string, range: vscode.Range): boolean {
  const dotBefore = range.start.character - 1;
  const dotAfter = range.end.character;

  return (line[dotBefore] === '.' && isAblIdentifierChar(line[dotBefore - 1]))
    || (line[dotAfter] === '.' && isAblIdentifierStart(line[dotAfter + 1]));
}

function findAblVariableReferences(document: vscode.TextDocument, name: string): vscode.Range[] {
  const ranges: vscode.Range[] = [];
  const lowerName = name.toLowerCase();
  let commentDepth = 0;

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const originalLine = document.lineAt(lineNumber).text;
    const masked = maskNonCodeSegments(originalLine, commentDepth);
    let match: RegExpExecArray | null;

    commentDepth = masked.commentDepth;
    ablIdentifierPattern.lastIndex = 0;

    while ((match = ablIdentifierPattern.exec(masked.code)) !== null) {
      if (match[0].toLowerCase() !== lowerName) {
        continue;
      }

      const range = new vscode.Range(lineNumber, match.index, lineNumber, match.index + match[0].length);

      if (isDottedIdentifier(originalLine, range)) {
        continue;
      }

      ranges.push(range);
    }
  }

  return ranges;
}

function validateAblVariableName(name: string): string | undefined {
  if (!/^[A-Za-z_][A-Za-z0-9_-]*$/.test(name)) {
    return 'ABL variable name must start with a letter or underscore and contain only letters, numbers, underscore, or hyphen.';
  }

  return undefined;
}

function provideAblPrepareRename(
  document: vscode.TextDocument,
  position: vscode.Position
): { range: vscode.Range; placeholder: string } | undefined {
  const identifier = getAblIdentifierAtPosition(document, position);

  if (!identifier || isDottedIdentifier(document.lineAt(position.line).text, identifier.range)) {
    return undefined;
  }

  if (!isDefinedAblVariable(document, identifier.name, position)) {
    const routine = findAblRoutineDefinition(document, identifier.name);
    const label = findAblLabelDefinition(document, identifier.name, position);

    if (!routine && !label) {
      return undefined;
    }
  }

  return {
    range: identifier.range,
    placeholder: identifier.name
  };
}

function provideAblRenameEdits(
  document: vscode.TextDocument,
  position: vscode.Position,
  newName: string
): vscode.WorkspaceEdit | undefined {
  const validationError = validateAblVariableName(newName);

  if (validationError) {
    throw new Error(validationError);
  }

  const identifier = getAblIdentifierAtPosition(document, position);

  if (!identifier || isDottedIdentifier(document.lineAt(position.line).text, identifier.range)) {
    return undefined;
  }

  const definition = findAblVariableDefinition(document, identifier.name, position);

  if (definition) {
    const edit = new vscode.WorkspaceEdit();

    for (const range of findAblVariableReferences(document, definition.name)) {
      edit.replace(document.uri, range, newName);
    }

    return edit;
  }

  const label = findAblLabelDefinition(document, identifier.name, position);

  if (label) {
    const edit = new vscode.WorkspaceEdit();

    for (const range of findAblLabelReferences(document, label)) {
      edit.replace(document.uri, range, newName);
    }

    return edit;
  }

  const routine = findAblRoutineDefinition(document, identifier.name);

  if (!routine) {
    return undefined;
  }

  const edit = new vscode.WorkspaceEdit();

  for (const range of findAblRoutineReferences(document, routine)) {
    edit.replace(document.uri, range, newName);
  }

  return edit;
}

function getTextBeforePosition(document: vscode.TextDocument, position: vscode.Position): string {
  return document.getText(new vscode.Range(new vscode.Position(0, 0), position));
}

function getActiveFunctionCall(document: vscode.TextDocument, position: vscode.Position): { name: string; activeParameter: number } | undefined {
  const text = getTextBeforePosition(document, position);
  let depth = 0;
  let activeParameter = 0;

  for (let index = text.length - 1; index >= 0; index -= 1) {
    const char = text[index];

    if (char === ')') {
      depth += 1;
      continue;
    }

    if (char === '(') {
      if (depth > 0) {
        depth -= 1;
        continue;
      }

      const beforeParen = text.slice(0, index);
      const match = beforeParen.match(/([A-Za-z_][A-Za-z0-9_-]*)\s*$/);
      const name = match?.[1]?.toLowerCase();

      if (!name) {
        return undefined;
      }

      return { name, activeParameter };
    }

    if (char === ',' && depth === 0) {
      activeParameter += 1;
    }
  }

  return undefined;
}

function createSignatureHelp(definitions: AblSignatureDefinition[], activeParameter: number): vscode.SignatureHelp {
  const signatureHelp = new vscode.SignatureHelp();

  signatureHelp.signatures = definitions.map((definition) => {
    const signature = new vscode.SignatureInformation(
      definition.label,
      definition.documentation
        ? new vscode.MarkdownString(definition.documentation)
        : undefined
    );

    signature.parameters = definition.parameters.map((parameter) => new vscode.ParameterInformation(parameter));

    return signature;
  });
  signatureHelp.activeSignature = 0;
  signatureHelp.activeParameter = Math.max(activeParameter, 0);

  return signatureHelp;
}

function routineToSignatureDefinition(routine: AblRoutineSymbol): AblSignatureDefinition {
  const parameterLabels = routine.parameters.map(formatRoutineParameter);
  const returnType = routine.returnType ? ` RETURNS ${routine.returnType}` : '';

  return {
    label: `${routine.name}(${parameterLabels.join(', ')})${returnType}`,
    documentation: `${routine.kind.toUpperCase()} defined in this document.`,
    parameters: parameterLabels
  };
}

function provideAblSignatureHelp(document: vscode.TextDocument, position: vscode.Position): vscode.SignatureHelp | undefined {
  const activeCall = getActiveFunctionCall(document, position);

  if (!activeCall) {
    return undefined;
  }

  const builtInSignature = builtInSignatures[activeCall.name];

  if (builtInSignature) {
    return createSignatureHelp(builtInSignature, activeCall.activeParameter);
  }

  const routine = findAblRoutineDefinitions(document)
    .find((definition) => definition.name.toLowerCase() === activeCall.name);

  if (!routine) {
    return undefined;
  }

  return createSignatureHelp([routineToSignatureDefinition(routine)], activeCall.activeParameter);
}

async function provideAblDefinition(document: vscode.TextDocument, position: vscode.Position): Promise<vscode.Location | undefined> {
  const include = linkedPathAtPosition(document, position);

  if (include) {
    const target = await resolveWorkspaceInclude(include.path);

    if (target) {
      return new vscode.Location(target, new vscode.Position(0, 0));
    }
  }

  const runRoutine = runRoutineAtPosition(document, position);

  if (runRoutine) {
    const target = findAblRoutineDefinition(document, runRoutine.name);

    if (target) {
      return new vscode.Location(document.uri, target.range);
    }
  }

  const identifier = getAblIdentifierAtPosition(document, position);

  if (!identifier || isDottedIdentifier(document.lineAt(position.line).text, identifier.range)) {
    return undefined;
  }

  const definition = findAblVariableDefinition(document, identifier.name, position);

  if (definition) {
    return new vscode.Location(document.uri, definition.nameRange);
  }

  const label = findAblLabelDefinition(document, identifier.name, position);

  if (label) {
    return new vscode.Location(document.uri, label.nameRange);
  }

  const routine = findAblRoutineDefinition(document, identifier.name);

  if (!routine) {
    return undefined;
  }

  return new vscode.Location(document.uri, routine.range);
}

async function provideAblDocumentLinks(document: vscode.TextDocument): Promise<vscode.DocumentLink[]> {
  const links: vscode.DocumentLink[] = [];
  const patterns = [includePathPattern, runPathPattern];

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const line = document.lineAt(lineNumber).text;

    for (const pattern of patterns) {
      let match: RegExpExecArray | null;

      pattern.lastIndex = 0;

      while ((match = pattern.exec(line)) !== null) {
        const includePath = match[1];
        const target = await resolveWorkspaceInclude(includePath);

        if (!target) {
          continue;
        }

        const start = match.index + match[0].indexOf(includePath);
        const end = start + includePath.length;
        const link = new vscode.DocumentLink(
          new vscode.Range(lineNumber, start, lineNumber, end),
          target
        );

        link.tooltip = `Open ${includePath}`;
        links.push(link);
      }
    }
  }

  return links;
}

function indentation(options: vscode.FormattingOptions, level: number): string {
  if (level <= 0) {
    return '';
  }

  if (options.insertSpaces) {
    return ' '.repeat(options.tabSize * level);
  }

  return '\t'.repeat(level);
}

function isBlockStart(trimmedLine: string): boolean {
  return blockStartPattern.test(trimmedLine) && !blockEndPattern.test(trimmedLine);
}

function isBlockEnd(trimmedLine: string): boolean {
  return blockEndPattern.test(trimmedLine);
}

function updateIncludeDepth(line: string, initialIncludeDepth: number): IncludeDepthResult {
  let includeDepth = initialIncludeDepth;
  let started = false;
  let closed = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '{' && (line[index + 1] === '&' || /\d/.test(line[index + 1] ?? ''))) {
      const macroEnd = line.indexOf('}', index + 1);

      if (macroEnd === -1) {
        break;
      }

      index = macroEnd;
      continue;
    }

    if (char === '{') {
      includeDepth += 1;
      started = true;
      continue;
    }

    if (char === '}' && includeDepth > 0) {
      includeDepth -= 1;
      closed = includeDepth === 0;
    }
  }

  return { includeDepth, started, closed };
}

function startsStandaloneIncludeInvocation(trimmedLine: string): boolean {
  return /^\{(?![&\d])/.test(trimmedLine);
}

function completesStatement(trimmedLine: string): boolean {
  return /\.\s*$/.test(trimmedLine);
}

function endsBlockHeader(trimmedLine: string): boolean {
  return /:\s*$/.test(trimmedLine);
}

function startsBlockHeader(trimmedLine: string): boolean {
  return isBlockStart(trimmedLine) && endsBlockHeader(trimmedLine);
}

function startsPendingBlockHeader(trimmedLine: string): boolean {
  return blockHeaderPrefixPattern.test(trimmedLine)
    && !startsBlockHeader(trimmedLine)
    && !completesStatement(trimmedLine);
}

function isLabelOnly(trimmedLine: string): boolean {
  return /^[A-Za-z_][A-Za-z0-9_-]*\s*:\s*$/.test(trimmedLine)
    && !startsBlockHeader(trimmedLine);
}

function startsElseBranch(trimmedLine: string): boolean {
  return /^else\b/i.test(trimmedLine);
}

function leadingWhitespace(line: string): string {
  return line.match(/^\s*/)?.[0] ?? '';
}

function parseAssignLine(line: string): { indent: string; lhs: string; operator: string; rhs: string } | undefined {
  const match = line.match(/^(\s*)(?:(assign)\s+)?(.+?)\s*(=|<>|<=|>=)\s*(.*)$/i);

  if (!match) {
    return undefined;
  }

  const lhs = match[3].trim();

  if (!lhs || lhs.startsWith('{') || /^if\b/i.test(lhs) || /^else\b/i.test(lhs)) {
    return undefined;
  }

  return {
    indent: match[1],
    lhs,
    operator: match[4],
    rhs: match[5]
  };
}

function alignAssignBlock(lines: string[], start: number, end: number): void {
  const firstIndent = leadingWhitespace(lines[start]);
  const assignPrefix = 'ASSIGN ';
  const continuationIndent = `${firstIndent}${' '.repeat(assignPrefix.length)}`;
  const parsedLines: Array<{ index: number; parsed: ReturnType<typeof parseAssignLine> }> = [];

  for (let index = start; index <= end; index += 1) {
    const parsed = parseAssignLine(lines[index]);

    if (parsed) {
      parsedLines.push({ index, parsed });
    }
  }

  if (parsedLines.length === 0) {
    return;
  }

  const lhsWidth = Math.max(...parsedLines.map((line) => line.parsed?.lhs.length ?? 0));

  for (const item of parsedLines) {
    if (!item.parsed) {
      continue;
    }

    const prefix = item.index === start ? `${firstIndent}${assignPrefix}` : continuationIndent;
    const rhs = item.parsed.rhs ? ` ${item.parsed.rhs}` : '';
    lines[item.index] = `${prefix}${item.parsed.lhs.padEnd(lhsWidth)} ${item.parsed.operator}${rhs}`;
  }

  for (let index = start + 1; index <= end; index += 1) {
    if (parsedLines.some((line) => line.index === index)) {
      continue;
    }

    if (lines[index].trim()) {
      lines[index] = `${continuationIndent}${lines[index].trim()}`;
    }
  }
}

function alignAssignBlocks(lines: string[]): string[] {
  let start: number | undefined;

  for (let index = 0; index < lines.length; index += 1) {
    const trimmedLine = lines[index].trim();

    if (start === undefined && /^assign\b/i.test(trimmedLine)) {
      start = index;
    }

    if (start !== undefined && completesStatement(trimmedLine)) {
      alignAssignBlock(lines, start, index);
      start = undefined;
    }
  }

  return lines;
}

function shouldIndentTempTableField(previousTrimmedLine: string, trimmedLine: string): boolean {
  return /^(?:define|def)\s+temp-table\b/i.test(previousTrimmedLine)
    && /^field\b/i.test(trimmedLine);
}

function stripBlockComments(line: string, initialCommentDepth: number): CommentStripResult {
  let code = '';
  let index = 0;
  let commentDepth = initialCommentDepth;

  while (index < line.length) {
    if (commentDepth > 0) {
      if (line[index] === '/' && line[index + 1] === '*') {
        commentDepth += 1;
        index += 2;
        continue;
      }

      if (line[index] === '*' && line[index + 1] === '/') {
        commentDepth -= 1;
        index += 2;
        continue;
      }

      index += 1;
      continue;
    }

    if (line[index] === '/' && line[index + 1] === '*') {
      commentDepth = 1;
      index += 2;
      continue;
    }

    code += line[index];
    index += 1;
  }

  return { code, commentDepth };
}

function maskNonCodeSegments(line: string, initialCommentDepth: number): CommentStripResult {
  const chars = line.split('');
  let index = 0;
  let commentDepth = initialCommentDepth;

  while (index < chars.length) {
    if (commentDepth > 0) {
      chars[index] = ' ';

      if (line[index] === '/' && line[index + 1] === '*') {
        chars[index + 1] = ' ';
        commentDepth += 1;
        index += 2;
        continue;
      }

      if (line[index] === '*' && line[index + 1] === '/') {
        chars[index + 1] = ' ';
        commentDepth -= 1;
        index += 2;
        continue;
      }

      index += 1;
      continue;
    }

    if (line[index] === '/' && line[index + 1] === '*') {
      chars[index] = ' ';
      chars[index + 1] = ' ';
      index += 2;
      commentDepth = 1;
      continue;
    }

    if (line[index] === '"' || line[index] === "'") {
      const quote = line[index];
      chars[index] = ' ';
      index += 1;

      while (index < chars.length) {
        chars[index] = ' ';

        if (line[index] === '~') {
          index += 2;
          continue;
        }

        if (line[index] === quote) {
          index += 1;
          break;
        }

        index += 1;
      }

      continue;
    }

    index += 1;
  }

  return { code: chars.join(''), commentDepth };
}

function formatAblText(document: vscode.TextDocument, options: vscode.FormattingOptions): string {
  const formattedLines: string[] = [];
  let indentLevel = 0;
  let includeDepth = 0;
  let includeClosesContinuation = false;
  let continuationIndentLevel = 0;
  let pendingBlockHeader = false;
  let commentDepth = 0;
  let previousTrimmedLine = '';

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const originalLine = document.lineAt(lineNumber).text;
    const trimmedLine = originalLine.trim();
    const startsInsideBlockComment = commentDepth > 0;
    const commentStripped = stripBlockComments(originalLine, commentDepth);
    const codeLine = commentStripped.code.trim();
    const wasInInclude = includeDepth > 0;
    const includeResult = codeLine ? updateIncludeDepth(codeLine, includeDepth) : { includeDepth, started: false, closed: false };
    const startsStandaloneInclude = codeLine ? startsStandaloneIncludeInvocation(codeLine) : false;
    const includeIndentLevel = wasInInclude ? 1 : 0;
    const commentOnlyLine = !codeLine && (startsInsideBlockComment || trimmedLine.includes('/*') || trimmedLine.includes('*/'));

    if (commentOnlyLine) {
      formattedLines.push(originalLine);
      commentDepth = commentStripped.commentDepth;
      continue;
    }

    if (!trimmedLine) {
      formattedLines.push('');
      previousTrimmedLine = '';
      commentDepth = commentStripped.commentDepth;
      continue;
    }

    if (codeLine && isBlockEnd(codeLine)) {
      indentLevel = Math.max(indentLevel - 1, 0);
      continuationIndentLevel = 0;
    }

    if (codeLine && startsElseBranch(codeLine)) {
      continuationIndentLevel = 0;
    }

    const extraFieldIndent = codeLine && continuationIndentLevel === 0 && shouldIndentTempTableField(previousTrimmedLine, codeLine) ? 1 : 0;
    formattedLines.push(`${indentation(options, indentLevel + includeIndentLevel + continuationIndentLevel + extraFieldIndent)}${trimmedLine}`);

    if (!codeLine) {
      commentDepth = commentStripped.commentDepth;
      continue;
    }

    const closedMultilineInclude = wasInInclude && includeResult.closed;

    if (closedMultilineInclude) {
      includeDepth = includeResult.includeDepth;
      continuationIndentLevel = 0;
      includeClosesContinuation = false;
      previousTrimmedLine = codeLine;
      commentDepth = commentStripped.commentDepth;
      continue;
    }

    if (!wasInInclude && startsStandaloneInclude && includeResult.started && includeResult.includeDepth > 0) {
      includeDepth = includeResult.includeDepth;
      includeClosesContinuation = continuationIndentLevel > 0;

      previousTrimmedLine = codeLine;
      commentDepth = commentStripped.commentDepth;
      continue;
    }

    if (!wasInInclude && startsStandaloneInclude && includeResult.started && includeResult.closed) {
      continuationIndentLevel = 0;
      previousTrimmedLine = codeLine;
      commentDepth = commentStripped.commentDepth;
      continue;
    }

    if (startsBlockHeader(codeLine)) {
      continuationIndentLevel = 0;
      indentLevel += 1;
      pendingBlockHeader = false;
    } else if (pendingBlockHeader && endsBlockHeader(codeLine)) {
      continuationIndentLevel = 0;
      indentLevel += 1;
      pendingBlockHeader = false;
    } else if (isLabelOnly(codeLine)) {
      continuationIndentLevel = 0;
      pendingBlockHeader = false;
    } else if (completesStatement(codeLine)) {
      continuationIndentLevel = 0;
      pendingBlockHeader = false;
    } else {
      continuationIndentLevel = 1;
      pendingBlockHeader = startsPendingBlockHeader(codeLine) || pendingBlockHeader;
    }

    previousTrimmedLine = codeLine;
    commentDepth = commentStripped.commentDepth;
  }

  return alignAssignBlocks(formattedLines).join(document.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n');
}

function provideAblDocumentFormattingEdits(
  document: vscode.TextDocument,
  options: vscode.FormattingOptions
): vscode.TextEdit[] {
  const fullRange = new vscode.Range(
    document.positionAt(0),
    document.positionAt(document.getText().length)
  );

  return [
    vscode.TextEdit.replace(fullRange, formatAblText(document, options))
  ];
}

function getDotBlockRange(line: string, lineNumber: number): vscode.Range | undefined {
  const match = line.match(/^\s*(?:do(?![A-Za-z0-9_-])|for\s+each(?![A-Za-z0-9_-]))/i);

  if (!match) {
    return undefined;
  }

  const trimmedLine = line.trim();

  if (!/\.\s*$/.test(trimmedLine) || trimmedLine.includes(':')) {
    return undefined;
  }

  return new vscode.Range(lineNumber, match.index ?? 0, lineNumber, line.length);
}

function updateAblDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
  if (document.languageId !== 'abl') {
    collection.delete(document.uri);
    return;
  }

  const diagnostics: vscode.Diagnostic[] = [];
  let commentDepth = 0;

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const originalLine = document.lineAt(lineNumber).text;
    const commentStripped = stripBlockComments(originalLine, commentDepth);
    const codeLine = commentStripped.code;

    commentDepth = commentStripped.commentDepth;

    const range = getDotBlockRange(codeLine, lineNumber);

    if (!range) {
      continue;
    }

    const diagnostic = new vscode.Diagnostic(
      range,
      'Use ":" for ABL block headers instead of ".".',
      vscode.DiagnosticSeverity.Error
    );
    diagnostic.code = dotBlockDiagnosticCode;
    diagnostics.push(diagnostic);
  }

  collection.set(document.uri, diagnostics);
}

function provideAblCodeActions(
  document: vscode.TextDocument,
  _range: vscode.Range,
  context: vscode.CodeActionContext
): vscode.CodeAction[] {
  const actions: vscode.CodeAction[] = [];

  for (const diagnostic of context.diagnostics) {
    if (diagnostic.code !== dotBlockDiagnosticCode) {
      continue;
    }

    const line = document.lineAt(diagnostic.range.start.line).text;
    const dotIndex = line.lastIndexOf('.', diagnostic.range.end.character - 1);

    if (dotIndex < diagnostic.range.start.character) {
      continue;
    }

    const action = new vscode.CodeAction('Replace "." with ":"', vscode.CodeActionKind.QuickFix);
    action.diagnostics = [diagnostic];
    action.isPreferred = true;
    action.edit = new vscode.WorkspaceEdit();
    action.edit.replace(
      document.uri,
      new vscode.Range(diagnostic.range.start.line, dotIndex, diagnostic.range.start.line, dotIndex + 1),
      ':'
    );
    actions.push(action);
  }

  return actions;
}

function provideAblDocumentSymbols(document: vscode.TextDocument): vscode.DocumentSymbol[] {
  const symbols: vscode.DocumentSymbol[] = [];

  for (const routine of findAblRoutineDefinitions(document)) {
    const symbol = new vscode.DocumentSymbol(
      routine.name,
      routine.kind === 'function'
        ? `FUNCTION${routine.returnType ? ` RETURNS ${routine.returnType}` : ''}`
        : 'PROCEDURE',
      routine.kind === 'function' ? vscode.SymbolKind.Function : vscode.SymbolKind.Method,
      routine.range,
      routine.nameRange
    );

    for (const parameter of routine.parameters) {
      symbol.children.push(new vscode.DocumentSymbol(
        parameter.name,
        formatRoutineParameter(parameter),
        vscode.SymbolKind.Variable,
        routine.range,
        routine.range
      ));
    }

    symbols.push(symbol);
  }

  for (const variable of findAblVariableDefinitions(document)) {
    symbols.push(new vscode.DocumentSymbol(
      variable.name,
      'VARIABLE',
      vscode.SymbolKind.Variable,
      variable.definitionRange,
      variable.nameRange
    ));
  }

  for (const label of findAblLabelDefinitions(document)) {
    symbols.push(new vscode.DocumentSymbol(
      label.name,
      'LABEL',
      vscode.SymbolKind.String,
      label.definitionRange,
      label.nameRange
    ));
  }

  let currentTable: vscode.DocumentSymbol | undefined;

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const line = document.lineAt(lineNumber).text;
    const tempTableMatch = line.match(/^\s*(?:define|def)\s+temp-table\s+([A-Za-z_][A-Za-z0-9_-]*)/i);

    if (tempTableMatch) {
      const nameStart = line.toLowerCase().indexOf(tempTableMatch[1].toLowerCase());
      currentTable = new vscode.DocumentSymbol(
        tempTableMatch[1],
        'TEMP-TABLE',
        vscode.SymbolKind.Struct,
        new vscode.Range(lineNumber, 0, lineNumber, line.length),
        new vscode.Range(lineNumber, nameStart, lineNumber, nameStart + tempTableMatch[1].length)
      );
      symbols.push(currentTable);
      continue;
    }

    if (!currentTable) {
      continue;
    }

    const fieldMatch = line.match(/^\s*field\s+([A-Za-z_][A-Za-z0-9_-]*)(?:\s+(?:as|like)\s+([A-Za-z_][A-Za-z0-9_-]*))?/i);

    if (fieldMatch) {
      const nameStart = line.toLowerCase().indexOf(fieldMatch[1].toLowerCase());
      currentTable.children.push(new vscode.DocumentSymbol(
        fieldMatch[1],
        fieldMatch[2] ? `FIELD ${fieldMatch[2]}` : 'FIELD',
        vscode.SymbolKind.Field,
        new vscode.Range(lineNumber, 0, lineNumber, line.length),
        new vscode.Range(lineNumber, nameStart, lineNumber, nameStart + fieldMatch[1].length)
      ));
    }

    if (line.trim().endsWith('.')) {
      currentTable = undefined;
    }
  }

  return symbols;
}

function getTableColumnAtPosition(document: vscode.TextDocument, position: vscode.Position): { tableName: string; columnName: string } | undefined {
  const line = document.lineAt(position.line).text;
  const pattern = /([A-Za-z_][A-Za-z0-9_-]*)\.([A-Za-z_][A-Za-z0-9_-]*)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line)) !== null) {
    const start = match.index;
    const end = start + match[0].length;

    if (position.character >= start && position.character <= end) {
      return {
        tableName: match[1],
        columnName: match[2]
      };
    }
  }

  return undefined;
}

function provideAblHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
  if (isInsideIncludeInvocation(document.lineAt(position.line).text, position.character)) {
    return undefined;
  }

  const tableColumn = getTableColumnAtPosition(document, position);

  if (tableColumn) {
    const table = findTable(tableColumn.tableName) ?? findLearnedTable(document, tableColumn.tableName);
    const column = table?.columns.find((item) => item.name.toLowerCase() === tableColumn.columnName.toLowerCase());

    if (table && column) {
      const markdown = new vscode.MarkdownString(`**${table.name}.${column.name}**${column.dataType ? `\n\nType: \`${column.dataType}\`` : ''}`);
      return new vscode.Hover(markdown);
    }
  }

  const identifier = getAblIdentifierAtPosition(document, position);

  if (!identifier) {
    return undefined;
  }

  const variable = findAblVariableDefinition(document, identifier.name, position);

  if (variable) {
    const typeText = variable.dataType ? `\n\nType: \`${variable.dataType}\`` : '';
    return new vscode.Hover(new vscode.MarkdownString(`**${variable.name}**${typeText}`));
  }

  const routine = findAblRoutineDefinition(document, identifier.name);

  if (routine) {
    const signature = routineToSignatureDefinition(routine);
    return new vscode.Hover(new vscode.MarkdownString(`**${signature.label}**\n\n${signature.documentation ?? ''}`));
  }

  const table = findTable(identifier.name) ?? findLearnedTable(document, identifier.name);

  if (table) {
    return new vscode.Hover(new vscode.MarkdownString(`**${table.name}**\n\nABL table with ${table.columns.length} known column(s).`));
  }

  return undefined;
}

function isInsideIncludeInvocation(line: string, character: number): boolean {
  let includeDepth = 0;

  for (let index = 0; index < Math.min(character, line.length); index += 1) {
    const char = line[index];

    if (char === '{' && (line[index + 1] === '&' || /\d/.test(line[index + 1] ?? ''))) {
      const macroEnd = line.indexOf('}', index + 1);

      if (macroEnd === -1 || macroEnd >= character) {
        return false;
      }

      index = macroEnd;
      continue;
    }

    if (char === '{') {
      includeDepth += 1;
      continue;
    }

    if (char === '}' && includeDepth > 0) {
      includeDepth -= 1;
    }
  }

  return includeDepth > 0;
}

function isRangeInsideIncludeInvocation(document: vscode.TextDocument, range: vscode.Range): boolean {
  return range.isSingleLine
    && isInsideIncludeInvocation(document.lineAt(range.start.line).text, range.start.character);
}

function provideAblSemanticTokens(document: vscode.TextDocument): vscode.SemanticTokens {
  const tokens: Array<{ range: vscode.Range; tokenType: string }> = [];
  const seen = new Set<string>();

  const addToken = (range: vscode.Range, tokenType: string) => {
    if (!range.isSingleLine || range.start.character === range.end.character) {
      return;
    }

    if (isRangeInsideIncludeInvocation(document, range)) {
      return;
    }

    const key = `${range.start.line}:${range.start.character}:${range.end.character}`;

    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    tokens.push({ range, tokenType });
  };

  for (const label of findAblLabelDefinitions(document)) {
    for (const range of findAblLabelReferences(document, label)) {
      addToken(range, 'label');
    }
  }

  for (const variable of findAblVariableDefinitions(document)) {
    for (const range of findAblVariableReferences(document, variable.name)) {
      addToken(range, 'variable');
    }
  }

  for (const routine of findAblRoutineDefinitions(document)) {
    const tokenType = routine.kind === 'function' ? 'function' : 'method';

    for (const range of findAblRoutineReferences(document, routine)) {
      addToken(range, tokenType);
    }
  }

  let commentDepth = 0;

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const originalLine = document.lineAt(lineNumber).text;
    const masked = maskNonCodeSegments(originalLine, commentDepth);
    const pattern = /([A-Za-z_][A-Za-z0-9_-]*)\.([A-Za-z_][A-Za-z0-9_-]*)/g;
    let match: RegExpExecArray | null;

    commentDepth = masked.commentDepth;

    while ((match = pattern.exec(masked.code)) !== null) {
      const tableName = match[1];
      const columnName = match[2];
      const table = findTable(tableName) ?? findLearnedTable(document, tableName);

      if (!table) {
        continue;
      }

      const column = table.columns.find((item) => item.name.toLowerCase() === columnName.toLowerCase());

      if (!column) {
        continue;
      }

      addToken(new vscode.Range(lineNumber, match.index, lineNumber, match.index + tableName.length), 'struct');
      addToken(
        new vscode.Range(lineNumber, match.index + tableName.length + 1, lineNumber, match.index + tableName.length + 1 + columnName.length),
        'property'
      );
    }
  }

  const builder = new vscode.SemanticTokensBuilder(semanticTokenLegend);

  tokens
    .sort((left, right) => left.range.start.compareTo(right.range.start))
    .forEach((token) => builder.push(token.range, token.tokenType, []));

  return builder.build();
}

function getConfig() {
  return vscode.workspace.getConfiguration('abl.database');
}

function getConfiguredCacheUri(context: vscode.ExtensionContext): vscode.Uri {
  const cacheFile = getConfig().get<string>('schemaCacheFile')?.trim();

  if (cacheFile) {
    return vscode.Uri.file(cacheFile);
  }

  return vscode.Uri.joinPath(context.globalStorageUri, 'schema-cache.json');
}

async function readSchemaCache(context: vscode.ExtensionContext): Promise<DatabaseSchema> {
  const cacheUri = getConfiguredCacheUri(context);

  try {
    const data = await vscode.workspace.fs.readFile(cacheUri);
    const parsed = JSON.parse(new TextDecoder().decode(data)) as DatabaseSchema;

    return {
      refreshedAt: parsed.refreshedAt ?? '',
      tables: Array.isArray(parsed.tables) ? parsed.tables : []
    };
  } catch {
    return {
      refreshedAt: '',
      tables: []
    };
  }
}

async function writeSchemaCache(context: vscode.ExtensionContext, schema: DatabaseSchema): Promise<vscode.Uri> {
  const cacheUri = getConfiguredCacheUri(context);
  const parentUri = vscode.Uri.file(path.dirname(cacheUri.fsPath));
  const data = new TextEncoder().encode(`${JSON.stringify(schema, null, 2)}\n`);

  await vscode.workspace.fs.createDirectory(parentUri);
  await vscode.workspace.fs.writeFile(cacheUri, data);

  return cacheUri;
}

async function getConnectionString(context: vscode.ExtensionContext): Promise<string | undefined> {
  const secret = await context.secrets.get(connectionSecretKey);

  if (secret?.trim()) {
    return secret.trim();
  }

  return getConfig().get<string>('connectionString')?.trim();
}

async function setConnectionString(context: vscode.ExtensionContext): Promise<void> {
  const current = await getConnectionString(context);
  const value = await vscode.window.showInputBox({
    title: 'ABL ODBC Connection String',
    prompt: 'Masukkan ODBC connection string untuk refresh schema database.',
    value: current,
    ignoreFocusOut: true,
    password: true,
    placeHolder: 'DSN=OpenEdgeDB;UID=user;PWD=password'
  });

  if (value === undefined) {
    return;
  }

  if (!value.trim()) {
    await context.secrets.delete(connectionSecretKey);
    vscode.window.showInformationMessage('ABL ODBC connection string dikosongkan.');
    return;
  }

  await context.secrets.store(connectionSecretKey, value.trim());
  vscode.window.showInformationMessage('ABL ODBC connection string disimpan di VS Code SecretStorage.');
}

function firstColumnValue(row: Record<string, unknown>): unknown {
  const key = Object.keys(row)[0];
  return key ? row[key] : undefined;
}

function createTableCompletion(table: SchemaTable): vscode.CompletionItem {
  const item = new vscode.CompletionItem(table.name, vscode.CompletionItemKind.Struct);
  item.detail = 'ABL database table';
  item.documentation = new vscode.MarkdownString(`${table.columns.length} column(s) from schema cache.`);
  return item;
}

function createColumnCompletion(column: SchemaColumn, table: SchemaTable): vscode.CompletionItem {
  const item = new vscode.CompletionItem(column.name, vscode.CompletionItemKind.Field);
  item.detail = column.dataType ? `${table.name}.${column.name}: ${column.dataType}` : `${table.name}.${column.name}`;
  return item;
}

function createLearnedColumnCompletion(column: SchemaColumn, table: SchemaTable): vscode.CompletionItem {
  const item = createColumnCompletion(column, table);
  item.detail = `${table.name}.${column.name} (learned from document)`;
  return item;
}

function createVariableCompletion(variable: AblVariableSymbol): vscode.CompletionItem {
  const item = new vscode.CompletionItem(variable.name, vscode.CompletionItemKind.Variable);

  item.detail = variable.dataType ? `ABL local variable: ${variable.dataType}` : 'ABL local variable';

  return item;
}

function applyCompletionReplaceRange(item: vscode.CompletionItem, range: vscode.Range | undefined): vscode.CompletionItem {
  if (range) {
    item.range = range;
  }

  return item;
}

function createRoutineCompletion(routine: AblRoutineSymbol, afterRun = false, replaceRange?: vscode.Range): vscode.CompletionItem {
  const item = new vscode.CompletionItem(
    routine.name,
    routine.kind === 'function' ? vscode.CompletionItemKind.Function : vscode.CompletionItemKind.Method
  );
  const parameterLabels = routine.parameters.map(formatRoutineParameter);
  const returnType = routine.returnType ? ` RETURNS ${routine.returnType}` : '';

  item.detail = `${routine.kind.toUpperCase()} ${routine.name}(${parameterLabels.join(', ')})${returnType}`;
  item.documentation = new vscode.MarkdownString([
    `${routine.kind.toUpperCase()} defined in this document.`,
    '',
    ...parameterLabels.map((parameter) => `- ${parameter}`)
  ].join('\n'));

  if (routine.kind === 'function') {
    item.insertText = new vscode.SnippetString(`${routine.name}($0)`);
  } else if (afterRun) {
    item.insertText = new vscode.SnippetString(`${routine.name} ($0).`);
  } else {
    item.insertText = new vscode.SnippetString(`RUN ${routine.name} ($0).`);
  }

  item.command = {
    command: 'editor.action.triggerParameterHints',
    title: 'Trigger Parameter Hints'
  };

  applyCompletionReplaceRange(item, replaceRange);

  return item;
}

function tableQualifierBeforeColumn(document: vscode.TextDocument, position: vscode.Position): string | undefined {
  const text = document.lineAt(position.line).text.slice(0, position.character);
  const match = text.match(/([A-Za-z_][A-Za-z0-9_-]*)\.[A-Za-z0-9_-]*$/);

  return match?.[1];
}

function isDotTriggerAfterLetter(document: vscode.TextDocument, position: vscode.Position): boolean {
  const line = document.lineAt(position.line).text;
  const characterBeforeDot = line[position.character - 2];

  return /[A-Za-z]/.test(characterBeforeDot ?? '');
}

function findTable(name: string): SchemaTable | undefined {
  return databaseSchema.tables.find((table) => table.name.toLowerCase() === name.toLowerCase());
}

function getLearnedSchemaFromDocument(document: vscode.TextDocument): SchemaTable[] {
  const tables = new Map<string, { name: string; columns: Map<string, string> }>();
  const tableColumnPattern = /(?<![A-Za-z0-9_-])([A-Za-z_][A-Za-z0-9_-]*)\.([A-Za-z_][A-Za-z0-9_-]*)(?![A-Za-z0-9_-])/g;
  const text = document.getText();
  let match: RegExpExecArray | null;

  while ((match = tableColumnPattern.exec(text)) !== null) {
    const tableName = match[1];
    const columnName = match[2];
    const tableKey = tableName.toLowerCase();
    const columnKey = columnName.toLowerCase();
    const table = tables.get(tableKey) ?? {
      name: tableName,
      columns: new Map<string, string>()
    };

    table.columns.set(columnKey, columnName);
    tables.set(tableKey, table);
  }

  return [...tables.values()].map((table) => ({
    name: table.name,
    columns: [...table.columns.values()].map((columnName) => ({ name: columnName }))
  }));
}

function getTempTablesFromDocument(document: vscode.TextDocument): SchemaTable[] {
  const tables = new Map<string, { name: string; columns: Map<string, SchemaColumn> }>();
  let currentTable: { name: string; columns: Map<string, SchemaColumn> } | undefined;

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const line = document.lineAt(lineNumber).text;
    const tempTableMatch = line.match(/^\s*(?:define|def)\s+temp-table\s+([A-Za-z_][A-Za-z0-9_-]*)/i);

    if (tempTableMatch) {
      const tableName = tempTableMatch[1];
      const tableKey = tableName.toLowerCase();

      currentTable = tables.get(tableKey) ?? {
        name: tableName,
        columns: new Map<string, SchemaColumn>()
      };

      tables.set(tableKey, currentTable);
    }

    if (!currentTable) {
      continue;
    }

    const fieldMatch = line.match(/^\s*field\s+([A-Za-z_][A-Za-z0-9_-]*)(?:\s+as\s+([A-Za-z_][A-Za-z0-9_-]*))?/i);

    if (fieldMatch) {
      const columnName = fieldMatch[1];
      const dataType = fieldMatch[2];
      const column: SchemaColumn = { name: columnName };

      if (dataType) {
        column.dataType = dataType;
      }

      currentTable.columns.set(columnName.toLowerCase(), column);
    }

    if (line.trim().endsWith('.')) {
      currentTable = undefined;
    }
  }

  return [...tables.values()].map((table) => ({
    name: table.name,
    columns: [...table.columns.values()]
  }));
}

function getDocumentTables(document: vscode.TextDocument): SchemaTable[] {
  const tables = new Map<string, SchemaTable>();

  for (const table of getLearnedSchemaFromDocument(document)) {
    tables.set(table.name.toLowerCase(), table);
  }

  for (const table of getTempTablesFromDocument(document)) {
    const key = table.name.toLowerCase();
    const existing = tables.get(key);

    if (!existing) {
      tables.set(key, table);
      continue;
    }

    const columns = new Map<string, SchemaColumn>();

    for (const column of existing.columns) {
      columns.set(column.name.toLowerCase(), column);
    }

    for (const column of table.columns) {
      columns.set(column.name.toLowerCase(), column);
    }

    tables.set(key, {
      name: existing.name,
      columns: [...columns.values()]
    });
  }

  return [...tables.values()];
}

function findLearnedTable(document: vscode.TextDocument, name: string): SchemaTable | undefined {
  return getDocumentTables(document).find((table) => table.name.toLowerCase() === name.toLowerCase());
}

function mergeColumns(schemaTable: SchemaTable | undefined, learnedTable: SchemaTable | undefined): vscode.CompletionItem[] {
  const seen = new Set<string>();
  const items: vscode.CompletionItem[] = [];

  for (const column of schemaTable?.columns ?? []) {
    seen.add(column.name.toLowerCase());
    items.push(createColumnCompletion(column, schemaTable as SchemaTable));
  }

  if (learnedTable) {
    for (const column of learnedTable.columns) {
      if (seen.has(column.name.toLowerCase())) {
        continue;
      }

      seen.add(column.name.toLowerCase());
      items.push(createLearnedColumnCompletion(column, learnedTable));
    }
  }

  return items;
}

function mergeTableCompletions(document: vscode.TextDocument): vscode.CompletionItem[] {
  const learnedTables = getDocumentTables(document);
  const seen = new Set<string>();
  const items: vscode.CompletionItem[] = [];

  for (const table of databaseSchema.tables) {
    seen.add(table.name.toLowerCase());
    items.push(createTableCompletion(table));
  }

  for (const table of learnedTables) {
    if (seen.has(table.name.toLowerCase())) {
      continue;
    }

    const item = createTableCompletion(table);
    item.detail = 'ABL table learned from document';
    items.push(item);
  }

  return items;
}

function mergeRoutineCompletions(document: vscode.TextDocument, afterRun = false, replaceRange?: vscode.Range): vscode.CompletionItem[] {
  const seen = new Set<string>();
  const items: vscode.CompletionItem[] = [];

  for (const routine of findAblRoutineDefinitions(document)) {
    const key = `${routine.kind}:${routine.name.toLowerCase()}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    items.push(createRoutineCompletion(routine, afterRun, replaceRange));
  }

  return items;
}

function mergeVariableCompletions(document: vscode.TextDocument, replaceRange?: vscode.Range): vscode.CompletionItem[] {
  const seen = new Set<string>();
  const items: vscode.CompletionItem[] = [];

  for (const variable of findAblVariableDefinitions(document)) {
    const key = variable.name.toLowerCase();

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    items.push(applyCompletionReplaceRange(createVariableCompletion(variable), replaceRange));
  }

  return items;
}

function createStaticCompletion(entry: AblCompletion): vscode.CompletionItem {
  const item = new vscode.CompletionItem(
    entry.label,
    entry.kind ?? vscode.CompletionItemKind.Keyword
  );

  item.detail = entry.detail;

  if (entry.documentation) {
    item.documentation = new vscode.MarkdownString(entry.documentation);
  }

  if (entry.insertText) {
    item.insertText = new vscode.SnippetString(entry.insertText);
  }

  return item;
}

function getEditorIndent(): string {
  const options = vscode.window.activeTextEditor?.options;
  const tabSize = typeof options?.tabSize === 'number' ? options.tabSize : 4;

  if (options?.insertSpaces === false) {
    return '\t';
  }

  return ' '.repeat(tabSize);
}

function isAfterBlockOpeningColon(document: vscode.TextDocument, position: vscode.Position): boolean {
  const textBeforeCursor = document.lineAt(position.line).text.slice(0, position.character);
  const trimmedText = textBeforeCursor.trim();

  if (!trimmedText.endsWith(':')) {
    return false;
  }

  return blockStartPattern.test(trimmedText)
    || /^\s*[A-Za-z_][A-Za-z0-9_-]*\s*:\s*$/.test(textBeforeCursor);
}

function isAfterRunKeyword(document: vscode.TextDocument, position: vscode.Position): boolean {
  const textBeforeCursor = document.lineAt(position.line).text.slice(0, position.character);
  return /\brun\s+[A-Za-z0-9_-]*$/i.test(textBeforeCursor);
}

function createLabelBlockCompletion(): vscode.CompletionItem {
  const item = new vscode.CompletionItem('Create block END.', vscode.CompletionItemKind.Snippet);

  item.detail = 'ABL label block';
  item.insertText = new vscode.SnippetString(`\n${getEditorIndent()}$0\nEND.`);
  item.sortText = '0000';
  item.preselect = true;

  return item;
}

async function refreshDatabaseSchema(context: vscode.ExtensionContext): Promise<void> {
  const connectionString = await getConnectionString(context);

  if (!connectionString) {
    const action = await vscode.window.showWarningMessage(
      'ABL ODBC connection string belum diatur.',
      'Set Connection String'
    );

    if (action === 'Set Connection String') {
      await setConnectionString(context);
    }

    return;
  }

  const tableQuery = getConfig().get<string>('tableQuery')?.trim();
  const columnQuery = getConfig().get<string>('columnQuery')?.trim();

  if (!tableQuery || !columnQuery) {
    vscode.window.showErrorMessage('ABL tableQuery dan columnQuery harus diisi.');
    return;
  }

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Refreshing ABL database schema',
      cancellable: false
    },
    async (progress) => {
      let connection: OdbcConnection | undefined;

      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const odbc = require('odbc') as { connect: (connectionString: string) => Promise<OdbcConnection> };
        progress.report({ message: 'Connecting through ODBC...' });
        connection = await odbc.connect(connectionString);

        progress.report({ message: 'Loading tables...' });
        const tableRows = await connection.query(tableQuery);
        const tableNames = tableRows
          .map((row) => firstColumnValue(row))
          .filter((value): value is string | number => typeof value === 'string' || typeof value === 'number')
          .map((value) => String(value).trim())
          .filter(Boolean);

        const tables: SchemaTable[] = [];

        for (const tableName of tableNames) {
          progress.report({ message: `Loading columns for ${tableName}...` });
          const columnRows = await connection.query(columnQuery, [tableName]);
          const columns = columnRows
            .map((row): SchemaColumn | undefined => {
              const keys = Object.keys(row);
              const nameValue = keys[0] ? row[keys[0]] : undefined;
              const typeValue = keys[1] ? row[keys[1]] : undefined;

              if (typeof nameValue !== 'string' && typeof nameValue !== 'number') {
                return undefined;
              }

              const column: SchemaColumn = {
                name: String(nameValue).trim()
              };

              if (typeValue !== undefined) {
                column.dataType = String(typeValue).trim();
              }

              return column;
            })
            .filter((column): column is SchemaColumn => Boolean(column?.name));

          tables.push({ name: tableName, columns });
        }

        databaseSchema = {
          refreshedAt: new Date().toISOString(),
          tables
        };

        const cacheUri = await writeSchemaCache(context, databaseSchema);
        vscode.window.showInformationMessage(`ABL schema cache refreshed: ${tables.length} table(s). ${cacheUri.fsPath}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`ABL schema refresh failed: ${message}`);
      } finally {
        await connection?.close().catch(() => undefined);
      }
    }
  );
}

async function showSchemaCache(context: vscode.ExtensionContext): Promise<void> {
  if (!databaseSchema.refreshedAt && databaseSchema.tables.length === 0) {
    await writeSchemaCache(context, databaseSchema);
  }

  const cacheUri = getConfiguredCacheUri(context);
  const document = await vscode.workspace.openTextDocument(cacheUri);
  await vscode.window.showTextDocument(document);
}

export async function activate(context: vscode.ExtensionContext) {
  databaseSchema = await readSchemaCache(context);
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('abl');
  const languageConfiguration = vscode.languages.setLanguageConfiguration('abl', {
    wordPattern: /[A-Za-z_][A-Za-z0-9_-]*/
  });

  const provider = vscode.languages.registerCompletionItemProvider(
    'abl',
    {
      provideCompletionItems(document, position, _token, context) {
        if (context.triggerCharacter === '.' && !isDotTriggerAfterLetter(document, position)) {
          return [];
        }

        const labelBlockCompletion = isAfterBlockOpeningColon(document, position)
          ? [createLabelBlockCompletion()]
          : [];
        const replaceRange = getAblIdentifierRangeAtPosition(document, position);
        const afterRun = isAfterRunKeyword(document, position);
        const tableName = tableQualifierBeforeColumn(document, position);

        if (afterRun) {
          return mergeRoutineCompletions(document, true, replaceRange);
        }

        if (tableName) {
          const table = findTable(tableName);
          const learnedTable = findLearnedTable(document, tableName);
          return [
            ...labelBlockCompletion,
            ...mergeColumns(table, learnedTable)
          ];
        }

        return [
          ...labelBlockCompletion,
          ...completions.map(createStaticCompletion),
          ...mergeVariableCompletions(document, replaceRange),
          ...mergeRoutineCompletions(document, false, replaceRange),
          ...mergeTableCompletions(document)
        ];
      }
    },
    ' ',
    ':',
    '-',
    '.'
  );

  const foldingProvider = vscode.languages.registerFoldingRangeProvider('abl', {
    provideFoldingRanges: provideAblFoldingRanges
  });
  const definitionProvider = vscode.languages.registerDefinitionProvider('abl', {
    provideDefinition: provideAblDefinition
  });
  const renameProvider = vscode.languages.registerRenameProvider('abl', {
    prepareRename: provideAblPrepareRename,
    provideRenameEdits: provideAblRenameEdits
  });
  const documentLinkProvider = vscode.languages.registerDocumentLinkProvider('abl', {
    provideDocumentLinks: provideAblDocumentLinks
  });
  const documentSymbolProvider = vscode.languages.registerDocumentSymbolProvider('abl', {
    provideDocumentSymbols: provideAblDocumentSymbols
  });
  const hoverProvider = vscode.languages.registerHoverProvider('abl', {
    provideHover: provideAblHover
  });
  const semanticTokensProvider = vscode.languages.registerDocumentSemanticTokensProvider(
    'abl',
    {
      provideDocumentSemanticTokens: provideAblSemanticTokens
    },
    semanticTokenLegend
  );
  const signatureHelpProvider = vscode.languages.registerSignatureHelpProvider(
    'abl',
    {
      provideSignatureHelp: provideAblSignatureHelp
    },
    '(',
    ','
  );
  const formattingProvider = vscode.languages.registerDocumentFormattingEditProvider('abl', {
    provideDocumentFormattingEdits: provideAblDocumentFormattingEdits
  });
  const codeActionProvider = vscode.languages.registerCodeActionsProvider(
    'abl',
    {
      provideCodeActions: provideAblCodeActions
    },
    {
      providedCodeActionKinds: [vscode.CodeActionKind.QuickFix]
    }
  );
  const changeDiagnosticsProvider = vscode.workspace.onDidChangeTextDocument((event) => {
    updateAblDiagnostics(event.document, diagnosticCollection);
  });
  const openDiagnosticsProvider = vscode.workspace.onDidOpenTextDocument((document) => {
    updateAblDiagnostics(document, diagnosticCollection);
  });
  const closeDiagnosticsProvider = vscode.workspace.onDidCloseTextDocument((document) => {
    diagnosticCollection.delete(document.uri);
  });

  for (const document of vscode.workspace.textDocuments) {
    updateAblDiagnostics(document, diagnosticCollection);
  }

  const setConnectionCommand = vscode.commands.registerCommand(
    'abl.setDatabaseConnectionString',
    () => setConnectionString(context)
  );
  const refreshSchemaCommand = vscode.commands.registerCommand(
    'abl.refreshDatabaseSchema',
    () => refreshDatabaseSchema(context)
  );
  const showSchemaCacheCommand = vscode.commands.registerCommand(
    'abl.showSchemaCache',
    () => showSchemaCache(context)
  );

  context.subscriptions.push(
    languageConfiguration,
    provider,
    foldingProvider,
    definitionProvider,
    renameProvider,
    documentLinkProvider,
    documentSymbolProvider,
    hoverProvider,
    semanticTokensProvider,
    signatureHelpProvider,
    formattingProvider,
    codeActionProvider,
    diagnosticCollection,
    changeDiagnosticsProvider,
    openDiagnosticsProvider,
    closeDiagnosticsProvider,
    setConnectionCommand,
    refreshSchemaCommand,
    showSchemaCacheCommand
  );
}

export function deactivate() {}
