// Generated from Progress ABL function reference pages.
// Source index: https://docs.progress.com/bundle/abl-reference/page/ABL-Syntax-Reference.html

export type AblSignatureDefinition = {
  label: string;
  documentation?: string;
  parameters: string[];
};

export const builtInSignatures: Record<string, AblSignatureDefinition[]> = {
  "absolute": [
    {
      "label": "ABSOLUTE (n)",
      "documentation": "Returns the absolute value of a numeric value. n An integer or decimal expression. The return value is the same format as n . This procedure calculates the number of miles you drive between highway exit ramps. r-abs.p",
      "parameters": [
        "n"
      ]
    }
  ],
  "base64-decode": [
    {
      "label": "BASE64-DECODE (expression)",
      "documentation": "Converts a Base64 character string into a binary value. The result is a MEMPTR containing the binary data. expression A CHARACTER or LONGCHAR expression containing the string you want to convert. Note: The BASE64-ENCODE and BASE64-DECODE functions: Use the Base64",
      "parameters": [
        "expression"
      ]
    }
  ],
  "asc": [
    {
      "label": "ASC (expression [, target-codepage [, source-codepage]])",
      "documentation": "Converts a character expression representing a single character into the corresponding ASCII (or internal code page) value, returned as an INTEGER. expression An expression with a value of a single character that you want to convert to an ASCII (or",
      "parameters": [
        "expression",
        "target-codepage",
        "source-codepage"
      ]
    }
  ],
  "audit-enabled": [
    {
      "label": "AUDIT-ENABLED([integer-expression | logical-name | alias])",
      "documentation": "Determines whether a connected database is audit-enabled. For information about audit-enabling a database, or creating and activating an audit policy for a database, see Introduction to Security and Auditing . integer-expression The sequence number of a connected database to query.",
      "parameters": [
        "integer-expression",
        "logical-name",
        "alias"
      ]
    }
  ],
  "ambiguous": [
    {
      "label": "AMBIGUOUS record",
      "documentation": "Returns a TRUE value if the last FIND statement for a particular record found more than one record that met the specified index criteria. record The name of a record or record buffer used in a previous FIND statement. To",
      "parameters": []
    }
  ],
  "accum": [
    {
      "label": "ACCUM aggregate-phrase expression",
      "documentation": "Returns the value of an aggregate expression that is calculated by an ACCUMULATE or aggregate phrase of a DISPLAY statement. aggregate-phrase A phrase that identifies the aggregate value it should return. This is the syntax for aggregate-phrase : For more",
      "parameters": []
    }
  ],
  "add-interval": [
    {
      "label": "ADD-INTERVAL (datetime, interval-amount, interval-unit)",
      "documentation": "Adds a time interval to, or subtracts a time interval from, a DATE, DATETIME, or DATETIME-TZ value, and returns the new value. datetime An expression whose value is a DATE, DATETIME, or DATETIME-TZ. interval-amount A signed integer (positive or negative)",
      "parameters": [
        "datetime",
        "interval-amount",
        "interval-unit"
      ]
    }
  ],
  "available": [
    {
      "label": "AVAILABLE record",
      "documentation": "Returns a TRUE value if the record buffer you name contains a record and returns a FALSE value if the record buffer is empty. When you use the FIND statement or the FOR EACH statement to find a record, the",
      "parameters": []
    }
  ],
  "alias": [
    {
      "label": "ALIAS (integer-expression)",
      "documentation": "The ALIAS function returns the alias corresponding to the integer value of expression. integer-expression If there are, for example, three currently defined aliases, the functions ALIAS(1), ALIAS(2), and ALIAS(3) return them. If the ALIAS function cannot find a defined alias,",
      "parameters": [
        "integer-expression"
      ]
    }
  ],
  "box": [
    {
      "label": "BOX (ABL-expression [, AS-data-type-expression])",
      "documentation": "(.NET) Returns an object reference to a .NET System.Object that contains ( boxes ) a .NET mapping of an ABL value. At run time, this mapping depends on the kind of ABL value passed to the function. If you pass",
      "parameters": [
        "ABL-expression",
        "AS-data-type-expression"
      ]
    }
  ],
  "buffer-partition-id": [
    {
      "label": "BUFFER-PARTITION-ID (buffer-name)",
      "documentation": "Returns the partition ID (as an integer) of the partition of the current record in a specified buffer. buffer-name An identifier that specifies the name of a record buffer. If the buffer is not populated with a record, this function",
      "parameters": [
        "buffer-name"
      ]
    }
  ],
  "buffer-group-id": [
    {
      "label": "BUFFER-GROUP-ID (buffer-name)",
      "documentation": "Returns the group ID (as an integer) of the tenant group to which the current record in a specified record buffer belongs. If the buffer does not contain a record from a tenant group, the function returns the Unknown value",
      "parameters": [
        "buffer-name"
      ]
    }
  ],
  "buffer-tenant-name": [
    {
      "label": "BUFFER-TENANT-NAME (buffer-name)",
      "documentation": "Returns the name (as a character string) of the tenant that owns the current record in a specified buffer. buffer-name An identifier that specifies the name of a record buffer. If the buffer is not populated with a record, this",
      "parameters": [
        "buffer-name"
      ]
    }
  ],
  "buffer-group-name": [
    {
      "label": "BUFFER-GROUP-NAME (buffer-name)",
      "documentation": "Returns the name (as a character string) of the tenant group to which the current record in a specified record buffer belongs. If the buffer does not contain a record from a tenant group, the function returns the Unknown value",
      "parameters": [
        "buffer-name"
      ]
    }
  ],
  "can-find": [
    {
      "label": "CAN-FIND ([FIRST | LAST] record [constant] [OF table] [WHERE expression] [USE-INDEX index] [USING [FRAME frame] field [AND [FRAME frame] field] ...] [SHARE-LOCK | NO-LOCK] [NO-WAIT] [NO-PREFETCH])",
      "documentation": "Returns a TRUE value if a record is found that meets the specified FIND criteria; otherwise it returns FALSE. CAN-FIND does not make the record available to the procedure. You typically use the CAN-FIND function within a VALIDATE option in",
      "parameters": [
        "FIRST",
        "LAST",
        "record",
        "constant",
        "OF",
        "table",
        "WHERE",
        "expression",
        "USE-INDEX",
        "index",
        "USING",
        "FRAME",
        "frame",
        "field",
        "FRAME",
        "frame",
        "field",
        "SHARE-LOCK",
        "NO-LOCK",
        "NO-WAIT",
        "NO-PREFETCH"
      ]
    }
  ],
  "can-query": [
    {
      "label": "CAN-QUERY (handle, attribute-name)",
      "documentation": "Returns a logical value indicating whether you can query a specified attribute or method for a specified widget. handle An expression that evaluates to a handle. The handle must refer to a valid widget. attribute-name An expression that evaluates to",
      "parameters": [
        "handle",
        "attribute-name"
      ]
    }
  ],
  "cast": [
    {
      "label": "CAST(object-reference, object-type-name).",
      "documentation": "Returns a new object reference to the same class instance as an existing object reference, but with a different data type. This different data type is cast from the object type of the original object reference according to another specified",
      "parameters": [
        "object-reference",
        "object-type-name"
      ]
    }
  ],
  "codepage-convert": [
    {
      "label": "CODEPAGE-CONVERT (source-string [, target-codepage [,source-codepage]])",
      "documentation": "Converts a string value from one code page to another. source-string A CHARACTER or LONGCHAR expression to be converted. target-codepage A character-string expression that evaluates to the name of a code page. The returned character value is relative to target-codepage",
      "parameters": [
        "source-string",
        "target-codepage",
        "source-codepage"
      ]
    }
  ],
  "connected": [
    {
      "label": "CONNECTED (logical-name | alias)",
      "documentation": "Tells whether a database is connected. If logical name is the logical name or alias is the alias of a connected database, the CONNECTED function returns TRUE; otherwise, it returns FALSE. logical-name Refers to a logical name. It can be",
      "parameters": [
        "logical-name",
        "alias"
      ]
    }
  ],
  "caps": [
    {
      "label": "CAPS (expression)",
      "documentation": "Converts any lowercase characters in a CHARACTER or LONGCHAR expression to uppercase characters, and returns the result. The data type of the returned value matches the data type of the expression passed to the function. expression A constant, field name,",
      "parameters": [
        "expression"
      ]
    }
  ],
  "can-set": [
    {
      "label": "CAN-SET (handle, attribute-name)",
      "documentation": "Returns a logical value indicating whether you can set a specified attribute for a specified widget. handle An expression that evaluates to a handle. The handle must refer to a valid widget. attribute-name An expression that evaluates to a character-string",
      "parameters": [
        "handle",
        "attribute-name"
      ]
    }
  ],
  "count-of": [
    {
      "label": "COUNT-OF (break-group)",
      "documentation": "Returns an INTEGER value that is the total number of selected records in the table or tables you are using across break groups. break-group The name of a field or expression you named in the block header with the BREAK",
      "parameters": [
        "break-group"
      ]
    }
  ],
  "current-language": [
    {
      "label": "CURRENT-LANGUAGE",
      "documentation": "Returns the current value of the CURRENT-LANGUAGE variable. Note: Does not apply to SpeedScript programming. The following example displays a message indicating the setting of your CURRENT-LANGUAGE: r-curlng.p An r-code file may contain several text segments each associated with a",
      "parameters": []
    }
  ],
  "chr": [
    {
      "label": "CHR (expression [,target-codepage [, source-codepage]])",
      "documentation": "Converts an integer value to its corresponding character value. expression An expression that yields an integer value that you want to convert to a character value. If the value of expression is in the range of 1 to 255, CHR",
      "parameters": [
        "expression",
        "target-codepage",
        "source-codepage"
      ]
    }
  ],
  "compare": [
    {
      "label": "COMPARE (string1, relational-operator, string2, strength [, collation])",
      "documentation": "The COMPARE function compares two strings and lets you: Perform a raw compare, if desired Use a particular collation Turn case sensitivity on and off COMPARE returns a LOGICAL value representing the result of the logical expression, where the comparison",
      "parameters": [
        "string1",
        "relational-operator",
        "string2",
        "strength",
        "collation"
      ]
    }
  ],
  "current-changed": [
    {
      "label": "CURRENT-CHANGED record",
      "documentation": "Returns TRUE if the copy of the record in the buffer after executing a FIND CURRENT or GET CURRENT differs from the copy of the record in the buffer before executing the FIND CURRENT or GET CURRENT. That is, if",
      "parameters": []
    }
  ],
  "current-result-row": [
    {
      "label": "CURRENT-RESULT-ROW (query-name)",
      "documentation": "Returns the number of the current row of a specified query as an INTEGER value. query-name A character expression that evaluates to the name of a currently open, scrolling query. If query-name does not resolve to the name of a",
      "parameters": [
        "query-name"
      ]
    }
  ],
  "dataservers": [
    {
      "label": "DATASERVERS",
      "documentation": "Returns a list of database types your OpenEdge product supports from where it is executed. The DATASERVERS function takes no arguments. The DATASERVERS function returns a character string containing a comma-separated list of database types. For example: Which indicates licensed",
      "parameters": []
    }
  ],
  "current-value": [
    {
      "label": "CURRENT-VALUE (sequence [, logical-dbname] [, tenant-id])",
      "documentation": "Returns the current INT64 value of a sequence defined in the Data Dictionary. sequence An identifier that specifies the name of a sequence defined in the Data Dictionary. logical-dbname An identifier that specifies the logical name of the database in",
      "parameters": [
        "sequence",
        "logical-dbname",
        "tenant-id"
      ]
    }
  ],
  "date": [
    {
      "label": "DATE (month, day, year)",
      "documentation": "Converts a single character string, a set of month, day, and year values, an integer expression, a DATETIME expression, or a DATETIME-TZ expression into a DATE value. If the DATE function cannot produce a valid date given the specified argument(s),",
      "parameters": [
        "month",
        "day",
        "year"
      ]
    },
    {
      "label": "DATE (string)",
      "documentation": "Converts a single character string, a set of month, day, and year values, an integer expression, a DATETIME expression, or a DATETIME-TZ expression into a DATE value. If the DATE function cannot produce a valid date given the specified argument(s),",
      "parameters": [
        "string"
      ]
    },
    {
      "label": "DATE (integer-expression)",
      "documentation": "Converts a single character string, a set of month, day, and year values, an integer expression, a DATETIME expression, or a DATETIME-TZ expression into a DATE value. If the DATE function cannot produce a valid date given the specified argument(s),",
      "parameters": [
        "integer-expression"
      ]
    },
    {
      "label": "DATE (datetime-expression)",
      "documentation": "Converts a single character string, a set of month, day, and year values, an integer expression, a DATETIME expression, or a DATETIME-TZ expression into a DATE value. If the DATE function cannot produce a valid date given the specified argument(s),",
      "parameters": [
        "datetime-expression"
      ]
    }
  ],
  "datetime": [
    {
      "label": "DATETIME (date-exp[, mtime-exp])",
      "documentation": "Converts date and time values, or a character string, into a DATETIME value. Note: If any argument is the Unknown value ( ? ), the result is the Unknown value ( ? ). date-exp An expression whose value is a",
      "parameters": [
        "date-exp",
        "mtime-exp"
      ]
    },
    {
      "label": "DATETIME (string)",
      "documentation": "Converts date and time values, or a character string, into a DATETIME value. Note: If any argument is the Unknown value ( ? ), the result is the Unknown value ( ? ). date-exp An expression whose value is a",
      "parameters": [
        "string"
      ]
    },
    {
      "label": "DATETIME (month, day, year, hours, minutes [, seconds[, milliseconds]])",
      "documentation": "Converts date and time values, or a character string, into a DATETIME value. Note: If any argument is the Unknown value ( ? ), the result is the Unknown value ( ? ). date-exp An expression whose value is a",
      "parameters": [
        "month",
        "day",
        "year",
        "hours",
        "minutes",
        "seconds",
        "milliseconds"
      ]
    }
  ],
  "day": [
    {
      "label": "DAY (date)",
      "documentation": "Evaluates a date expression and returns a day of the month as an INTEGER value from 1 to 31, inclusive. date An expression whose value is a DATE. datetime-expression An expression that evaluates to a DATETIME or DATETIME-TZ. The DAY",
      "parameters": [
        "date"
      ]
    },
    {
      "label": "DAY (datetime-expression)",
      "documentation": "Evaluates a date expression and returns a day of the month as an INTEGER value from 1 to 31, inclusive. date An expression whose value is a DATE. datetime-expression An expression that evaluates to a DATETIME or DATETIME-TZ. The DAY",
      "parameters": [
        "datetime-expression"
      ]
    }
  ],
  "dbcodepage": [
    {
      "label": "DBCODEPAGE ({integer-expression|logical-name|alias})",
      "documentation": "Returns, as a character string, the name of a connected database's code page. integer-expression The sequence number of a database the ABL session is connected to. For example, DBCODEPAGE(1) returns information on the first database the ABL session is connected",
      "parameters": [
        "integer-expression",
        "logical-name",
        "alias"
      ]
    }
  ],
  "dbcollation": [
    {
      "label": "DBCOLLATION ({integer-expression|logical-name|alias})",
      "documentation": "Returns, as a character string, the name of the collating sequence for character set information contained in the database. This name corresponds to the definition of the collating sequence contained in the convmap.dat file, which usually resides in the $DLC",
      "parameters": [
        "integer-expression",
        "logical-name",
        "alias"
      ]
    }
  ],
  "dbname": [
    {
      "label": "DBNAME",
      "documentation": "Returns, as a character string, the name of the logical database currently in use or the name of your first connected database. This portion of a procedure defines a header frame to hold a date, page number, database name, and",
      "parameters": []
    }
  ],
  "dbparam": [
    {
      "label": "DBPARAM (integer-expression|logical-name|alias)",
      "documentation": "Returns, as a character string, a comma-separated list of the parameters used to connect to the database. integer-expression The sequence number of a database the ABL session is connected to. For example, DBPARAM(1) returns information on the first database the",
      "parameters": [
        "integer-expression",
        "logical-name",
        "alias"
      ]
    }
  ],
  "db-remote-host": [
    {
      "label": "DB-REMOTE-HOST ({logical-name|integer-expression})",
      "documentation": "Returns a character string containing the IP address of the database connection. The IP address format is determined by the Internet Protocol used when the connection was established. A single input parameter identifies the database, which can be either the",
      "parameters": [
        "logical-name",
        "integer-expression"
      ]
    }
  ],
  "dbrestrictions": [
    {
      "label": "DBRESTRICTIONS ({integer-expression|logical-name|alias} [, table-name])",
      "documentation": "Returns a character string that describes features that are not supported for this database. You can use this function with OpenEdge DataServers. integer-expression The sequence number of a database the ABL session is connected to. For example, DBRESTRICTIONS(1) returns information",
      "parameters": [
        "integer-expression",
        "logical-name",
        "alias",
        "table-name"
      ]
    }
  ],
  "dbtaskid": [
    {
      "label": "DBTASKID (integer-expression|logical-name|alias)",
      "documentation": "Returns an INTEGER value that uniquely identifies a database's transaction. integer-expression The sequence number of a database the ABL session is connected to. For example, DBTASKID(1) returns information on the first database the ABL session is connected to, DBTASKID(2) returns",
      "parameters": [
        "integer-expression",
        "logical-name",
        "alias"
      ]
    }
  ],
  "dbversion": [
    {
      "label": "DBVERSION (integer-expression|logical-name|alias)",
      "documentation": "Returns, as a character string, the version number of an OpenEdge database. integer-expression The sequence number of a database the ABL session is connected to. For example, DBVERSION(1) returns information on the first database the ABL session is connected to,",
      "parameters": [
        "integer-expression",
        "logical-name",
        "alias"
      ]
    }
  ],
  "decimal": [
    {
      "label": "DECIMAL (expression)",
      "documentation": "Converts an expression of any data type, with the exception of BLOB, CLOB, and RAW, to a DECIMAL value. expression The function behaves as described for the following data types: If expression is a CHARACTER, then it must be valid",
      "parameters": [
        "expression"
      ]
    }
  ],
  "decrypt": [
    {
      "label": "DECRYPT (data-to-decrypt [, encrypt-key [, iv-value [, algorithm [, tag [, aad]]]]])",
      "documentation": "Converts encrypted data (a binary byte stream) to its original source format, and returns a MEMPTR containing the decrypted data. You must use the same cryptographic algorithm, initialization vector, and encryption key values to encrypt and decrypt the same data",
      "parameters": [
        "data-to-decrypt",
        "encrypt-key",
        "iv-value",
        "algorithm",
        "tag",
        "aad"
      ]
    }
  ],
  "defined preprocessor": [
    {
      "label": "DEFINED (name)",
      "documentation": "Returns the status of a preprocessor name or include file argument name as an INTEGER value. You can use the DEFINED function only within a preprocessor &IF expression. name Preprocessor name or include file argument name whose status you want",
      "parameters": [
        "name"
      ]
    },
    {
      "label": "DEFINED(MAX-EXPENSE)",
      "documentation": "Returns the status of a preprocessor name or include file argument name as an INTEGER value. You can use the DEFINED function only within a preprocessor &IF expression. name Preprocessor name or include file argument name whose status you want",
      "parameters": [
        "MAX-EXPENSE"
      ]
    }
  ],
  "dynamic-cast": [
    {
      "label": "DYNAMIC-CAST(object-reference, expression).",
      "documentation": "Returns a new object reference to the same class instance as an existing object reference, but with a different data type. This different data type is cast from the object type of the original object reference according to another object",
      "parameters": [
        "object-reference",
        "expression"
      ]
    }
  ],
  "dynamic-current-value": [
    {
      "label": "DYNAMIC-CURRENT-VALUE(sequence-expression, logical-dbname-expression [, tenant-id])",
      "documentation": "Returns the current INT64 value of a sequence defined in the specified database. sequence-expression A character expression that evaluates to the name of a sequence. logical-dbname-expression A character expression that evaluates to the name of a connected database in which",
      "parameters": [
        "sequence-expression",
        "logical-dbname-expression",
        "tenant-id"
      ]
    }
  ],
  "dynamic-function": [
    {
      "label": "DYNAMIC-FUNCTION (function-name[IN proc-handle] [, param1[, param2]...])",
      "documentation": "Invokes a user-defined function. The AVM evaluates the name of the function (and the procedure handle, if any) at run time. function-name A CHARACTER expression that returns the name of a user-defined function. The AVM evaluates function-name at run time.",
      "parameters": [
        "function-name",
        "IN",
        "proc-handle",
        "param1",
        "param2"
      ]
    }
  ],
  "dynamic-next-value": [
    {
      "label": "DYNAMIC-NEXT-VALUE(sequence-expression, logical-dbname-expression [, tenant-id])",
      "documentation": "Returns the next INT64 value of a sequence, incremented by the positive or negative value defined in the specified database. sequence-expression A character expression that evaluates to the name of a sequence. logical-dbname-expression A character expression that evaluates to the",
      "parameters": [
        "sequence-expression",
        "logical-dbname-expression",
        "tenant-id"
      ]
    }
  ],
  "encode": [
    {
      "label": "ENCODE (expression)",
      "documentation": "Encodes a source character string and returns the encoded character string result. expression An expression that results in a character string value. If you use a constant, you must enclose it in quotation marks (\" \"). This procedure uses the",
      "parameters": [
        "expression"
      ]
    }
  ],
  "encrypt": [
    {
      "label": "ENCRYPT (data-to-encrypt [, encrypt-key [, iv-value [, algorithm [, tag [, aad]]]]])",
      "documentation": "Converts source data into a particular format, and returns a MEMPTR containing the encrypted data (a binary byte stream). You must use the same cryptographic algorithm, initialization vector, and encryption key values to encrypt and decrypt the same data instance.",
      "parameters": [
        "data-to-encrypt",
        "encrypt-key",
        "iv-value",
        "algorithm",
        "tag",
        "aad"
      ]
    }
  ],
  "error": [
    {
      "label": "ERROR(buffer-name)",
      "documentation": "Indicates whether an error occurred during a FILL or SAVE-ROW-CHANGES operation on the specified ProDataSet temp-table buffer. buffer-name The name of a ProDataSet temp-table buffer. The ERROR function corresponds to the ERROR attribute . You can invoke the ERROR function",
      "parameters": [
        "buffer-name"
      ]
    }
  ],
  "entry": [
    {
      "label": "ENTRY (element, list[, delimiter])",
      "documentation": "Returns a character string (CHARACTER or LONGCHAR) entry from a list based on an integer position. The data type of the returned value matches the data type of the list element. element An integer value that corresponds to the position",
      "parameters": [
        "element",
        "list",
        "delimiter"
      ]
    }
  ],
  "etime": [
    {
      "label": "ETIME [(logical)]",
      "documentation": "Returns, as an INT64 value, the time (in milliseconds) elapsed since the ABL session began or since ETIME (elapsed time) was last set to 0. To set ETIME to 0, pass it a positive logical value, such as YES or",
      "parameters": [
        "logical"
      ]
    }
  ],
  "exp": [
    {
      "label": "EXP (base, exponent)",
      "documentation": "Returns the result of raising a number to a power. The number is called the base and the power is called the exponent . base A constant, field name, variable name, or expression that evaluates to a numeric value. exponent",
      "parameters": [
        "base",
        "exponent"
      ]
    }
  ],
  "extent": [
    {
      "label": "EXTENT (array)",
      "documentation": "This function returns the size (extent) of an array field or variable as an INTEGER value. More specifically, it returns: The number of elements for a field or variable defined as a determinate array The Unknown value ( ? )",
      "parameters": [
        "array"
      ]
    }
  ],
  "fill": [
    {
      "label": "FILL (expression, repeats)",
      "documentation": "Generates a character string made up of a character string that is repeated a specified number of times. expression An expression that yields a character value. This expression can contain double-byte characters. repeats A constant, field name, variable name, or",
      "parameters": [
        "expression",
        "repeats"
      ]
    }
  ],
  "first": [
    {
      "label": "FIRST (break-group)",
      "documentation": "Returns a TRUE value if the current iteration of a DO, FOR EACH, or REPEAT . . . BREAK block is the first iteration of that block. break-group The name of a field or expression you name in the block",
      "parameters": [
        "break-group"
      ]
    }
  ],
  "first-of": [
    {
      "label": "FIRST-OF (break-group)",
      "documentation": "Returns a TRUE value if the current iteration of a DO, FOR EACH, or REPEAT . . . BREAK block is the first iteration for a new break group, and modifies all three block types. break-group The name of a",
      "parameters": [
        "break-group"
      ]
    }
  ],
  "frame-col": [
    {
      "label": "FRAME-COL [(frame)]",
      "documentation": "Returns a DECIMAL value that is the column position of the left corner of a frame within its window. Note: Does not apply to SpeedScript programming. frame The name of the frame whose column position you are trying to determine.",
      "parameters": [
        "frame"
      ]
    }
  ],
  "frame-down": [
    {
      "label": "FRAME-DOWN [(frame)]",
      "documentation": "Returns an INTEGER value that represents the number of iterations in a frame. Note: Does not apply to SpeedScript programming. frame The name of the frame whose number down you are trying to determine. If you do not supply a",
      "parameters": [
        "frame"
      ]
    }
  ],
  "can-do": [
    {
      "label": "CAN-DO (id-pattern-list [, userid])",
      "documentation": "Checks a user ID against a list of one or more user ID matching patterns that can be used to indicate what users have access to a given application function. The function returns TRUE if the specified user ID has",
      "parameters": [
        "id-pattern-list",
        "userid"
      ]
    }
  ],
  "dbtype": [
    {
      "label": "DBTYPE (integer-expression|logical-name|alias)",
      "documentation": "Returns, as a character string, the database type of a currently connected database. This function returns one of the following strings: \" MSS \", \" ORACLE \", or \" PROGRESS \". integer-expression The sequence number of a database the ABL",
      "parameters": [
        "integer-expression",
        "logical-name",
        "alias"
      ]
    }
  ],
  "base64-encode": [
    {
      "label": "BASE64-ENCODE (expression)",
      "documentation": "Converts binary data into a Base64 character string, and returns a LONGCHAR containing the character data. The resulting LONGCHAR is in the code page specified by -cpinternal . expression A MEMPTR or RAW expression containing the binary data you want",
      "parameters": [
        "expression"
      ]
    }
  ],
  "data-source-modified": [
    {
      "label": "DATA-SOURCE-MODIFIED(buffer-name)",
      "documentation": "Returns TRUE if data in the data source associated with the specified ProDataSet temp-table buffer has been modified. buffer-name The name of a ProDataSet temp-table buffer. The AVM sets the value of this function from the SAVE-ROW-CHANGES( ) method. The",
      "parameters": [
        "buffer-name"
      ]
    }
  ],
  "frame-index": [
    {
      "label": "FRAME-INDEX",
      "documentation": "During a data entry statement, returns the subscript of the array element of the input field that the cursor is in as an INTEGER value. At other times, returns the subscript of the array element the cursor was in. The",
      "parameters": []
    }
  ],
  "frame-name": [
    {
      "label": "FRAME-NAME",
      "documentation": "Returns the name of the frame that the cursor is in to a field that is enabled for input. Note: Does not apply to SpeedScript programming. This procedure displays Customer information in one frame, then displays Order information for the",
      "parameters": []
    }
  ],
  "frame-line": [
    {
      "label": "FRAME-LINE [(frame)]",
      "documentation": "Returns an INTEGER value that represents the current logical line number in a down frame. Note: Does not apply to SpeedScript programming. frame The frame name that you are trying to determine a line number for. If you do not",
      "parameters": [
        "frame"
      ]
    }
  ],
  "frame-file": [
    {
      "label": "FRAME-FILE",
      "documentation": "Returns the name of the database table that contains the field the cursor is in. The FRAME-FILE function is useful if you want to provide users with context-sensitive help. Note: Does not apply to SpeedScript programming. This procedure updates fields",
      "parameters": []
    }
  ],
  "generate-password-hash": [
    {
      "label": "GENERATE-PASSWORD-HASH (password [, salt [, hash-algorithm]])",
      "documentation": "Performs a hashing operation on a value and returns a CHARACTER string with the hashed value encoded as a Base64-encoded string. GENERATE-PASSWORD-HASH() supports password hash generation using algorithms that are approved by the National Institute of Standards and Technology (NIST).",
      "parameters": [
        "password",
        "salt",
        "hash-algorithm"
      ]
    }
  ],
  "frame-row": [
    {
      "label": "FRAME-ROW [(frame)]",
      "documentation": "Returns a DECIMAL value that represents the row position of the upper-left corner of a frame within its window. Note: Does not apply to SpeedScript programming. frame The name of the frame whose row position you are trying to determine.",
      "parameters": [
        "frame"
      ]
    }
  ],
  "gateways": [
    {
      "label": "GATEWAYS",
      "documentation": "The GATEWAYS function has been replaced by the DATASERVERS function , which is exactly equivalent. This function is supported only for backward compatibility. Note: Does not apply to SpeedScript programming.",
      "parameters": []
    }
  ],
  "buffer-tenant-id": [
    {
      "label": "BUFFER-TENANT-ID (buffer-name)",
      "documentation": "Returns the tenant ID (as an integer) of the tenant that owns the current record in a specified buffer. buffer-name An identifier that specifies the name of a record buffer. If the buffer is not populated with a record, this",
      "parameters": [
        "buffer-name"
      ]
    }
  ],
  "generate-pbe-salt": [
    {
      "label": "GENERATE-PBE-SALT",
      "documentation": "Generates a random salt value (a series of 8 bytes) to use in generating an encryption key, and returns the salt value as a RAW value. Using a salt value can help to ensure that a password key value is",
      "parameters": []
    }
  ],
  "datetime-tz": [
    {
      "label": "DATETIME-TZ (date-exp[, mtime-exp [, timezone-exp]])",
      "documentation": "Converts a date, time, and time zone value, or a character string, into a DATETIME-TZ value. Note: If any argument is the Unknown value ( ? ), the result is the Unknown value ( ? ). date-exp An expression whose",
      "parameters": [
        "date-exp",
        "mtime-exp",
        "timezone-exp"
      ]
    },
    {
      "label": "DATETIME-TZ (datetime-exp [, timezone-exp])",
      "documentation": "Converts a date, time, and time zone value, or a character string, into a DATETIME-TZ value. Note: If any argument is the Unknown value ( ? ), the result is the Unknown value ( ? ). date-exp An expression whose",
      "parameters": [
        "datetime-exp",
        "timezone-exp"
      ]
    },
    {
      "label": "DATETIME-TZ (datetime-tz-exp [, timezone-exp])",
      "documentation": "Converts a date, time, and time zone value, or a character string, into a DATETIME-TZ value. Note: If any argument is the Unknown value ( ? ), the result is the Unknown value ( ? ). date-exp An expression whose",
      "parameters": [
        "datetime-tz-exp",
        "timezone-exp"
      ]
    },
    {
      "label": "DATETIME-TZ (month, day, year, hours, minutes [, seconds[, milliseconds[, timezone-exp]]])",
      "documentation": "Converts a date, time, and time zone value, or a character string, into a DATETIME-TZ value. Note: If any argument is the Unknown value ( ? ), the result is the Unknown value ( ? ). date-exp An expression whose",
      "parameters": [
        "month",
        "day",
        "year",
        "hours",
        "minutes",
        "seconds",
        "milliseconds",
        "timezone-exp"
      ]
    },
    {
      "label": "DATETIME-TZ (string)",
      "documentation": "Converts a date, time, and time zone value, or a character string, into a DATETIME-TZ value. Note: If any argument is the Unknown value ( ? ), the result is the Unknown value ( ? ). date-exp An expression whose",
      "parameters": [
        "string"
      ]
    }
  ],
  "generate-uuid": [
    {
      "label": "GENERATE-UUID",
      "documentation": "Generates a universally unique identifier (UUID), as a 16-byte RAW value. The following code fragment illustrates how to use the GENERATE-UUID function: You can use the GENERATE-UUID function with the BASE64-ENCODE function to generate a UUID and convert it to",
      "parameters": []
    }
  ],
  "generate-salt": [
    {
      "label": "GENERATE-SALT([size])",
      "documentation": "Generates a random salt value (a random series of bytes) of a specified size as a RAW value. This salt value can be used when generating a hashed password with the GENERATE-PASSWORD-HASH function or changing the PASSWORD-HASH-SALT attribute . size",
      "parameters": [
        "size"
      ]
    }
  ],
  "frame-db": [
    {
      "label": "FRAME-DB",
      "documentation": "Returns the logical database name of the database that contains any field in which the user-interface cursor is entered. Note: Does not apply to SpeedScript programming. The function requires no arguments. If the cursor is in a field that is",
      "parameters": []
    }
  ],
  "frame-field": [
    {
      "label": "FRAME-FIELD",
      "documentation": "During a data entry statement, returns the name of the input field the cursor is in. At other times, returns the name of the input field the cursor was last in. The FRAME-FIELD function is particularly useful if you want",
      "parameters": []
    }
  ],
  "get-byte-order": [
    {
      "label": "GET-BYTE-ORDER(memptr)",
      "documentation": "Returns an INTEGER value indicating the byte order setting of a MEMPTR variable. This will be either the value provided by the last execution of SET-BYTE-ORDER with this MEMPTR variable, or HOST-BYTE-ORDER if SET-BYTE-ORDER has not been executed. memptr An",
      "parameters": [
        "memptr"
      ]
    }
  ],
  "get-byte": [
    {
      "label": "GET-BYTE (source, position)",
      "documentation": "Returns the unsigned 1 byte value at the specified memory location as an INTEGER value. source A function or variable that returns a RAW or MEMPTR value. If source is the Unknown value ( ? ), GET-BYTE returns the Unknown",
      "parameters": [
        "source",
        "position"
      ]
    }
  ],
  "get-bytes": [
    {
      "label": "GET-BYTES(source, position, numbytes)",
      "documentation": "Returns the specified number of bytes, from the specified location, into a RAW or MEMPTR variable. source An expression that evaluates to a RAW or MEMPTR value indicating the source location. If source is the Unknown value ( ? ),",
      "parameters": [
        "source",
        "position",
        "numbytes"
      ]
    }
  ],
  "get-class": [
    {
      "label": "GET-CLASS (object-type-name)",
      "documentation": "Returns the object reference for the Progress.Lang.Class instance associated with the specified class or interface type. object-type-name Specifies the type name of an ABL or .NET class or interface type, using the syntax described in the Type-name syntax reference entry.",
      "parameters": [
        "object-type-name"
      ]
    }
  ],
  "get-codepages": [
    {
      "label": "GET-CODEPAGES",
      "documentation": "The GET-CODEPAGES function returns a comma-delimited list of the code pages listed in convmap.cp or specified by the Conversion Map ( -convmap ) startup parameter for the current ABL session. This procedure displays a list of the code pages available",
      "parameters": []
    }
  ],
  "get-collation": [
    {
      "label": "GET-COLLATION (clob-field)",
      "documentation": "The GET-COLLATION function returns the collation name for a CLOB field. clob-field A CLOB field name.",
      "parameters": [
        "clob-field"
      ]
    }
  ],
  "get-codepage": [
    {
      "label": "GET-CODEPAGE (large-char-object)",
      "documentation": "The GET-CODEPAGE function returns the code page of a LONGCHAR variable or CLOB field. large-char-object The name of a LONGCHAR variable or CLOB field. If the specified LONGCHAR is empty and the code page was not fixed using the FIX-CODEPAGE",
      "parameters": [
        "large-char-object"
      ]
    }
  ],
  "get-collations": [
    {
      "label": "GET-COLLATIONS (codepage)",
      "documentation": "The GET-COLLATIONS function returns a comma-delimited list of the collations either listed in convmap.cp or specified by the Conversion Map ( -convmap ) startup parameter for the specified code page. codepage A code page name. If there are no collations",
      "parameters": [
        "codepage"
      ]
    }
  ],
  "get-db-client": [
    {
      "label": "GET-DB-CLIENT ([db-exp])",
      "documentation": "Returns the handle to a copy of the sealed client-principal object that represents the user identity for the specified database connection. db-exp An optional character expression that evaluates to a case-insensitive logical or alias name of an OpenEdge RDBMS. This",
      "parameters": [
        "db-exp"
      ]
    }
  ],
  "get-double": [
    {
      "label": "GET-DOUBLE (source, position)",
      "documentation": "Returns the 8-byte floating-point value at the specified memory location as a DECIMAL value. source A function or variable that returns a RAW or MEMPTR value. If source is the Unknown value ( ? ), GET-DOUBLE returns the Unknown value",
      "parameters": [
        "source",
        "position"
      ]
    }
  ],
  "get-effective-tenant-id": [
    {
      "label": "GET-EFFECTIVE-TENANT-ID([database-name])",
      "documentation": "Returns the tenant ID of the effective tenant as an integer. database-name A character expression that evaluates to a logical database name or database alias. If no database is specified and more than one database is connected, the AVM raises",
      "parameters": [
        "database-name"
      ]
    }
  ],
  "get-float": [
    {
      "label": "GET-FLOAT (source, position)",
      "documentation": "Returns the 4-byte floating-point value at the specified memory location as a DECIMAL value. source A function or variable that returns a RAW or MEMPTR value. If source is the Unknown value ( ? ), GET-FLOAT returns the Unknown value",
      "parameters": [
        "source",
        "position"
      ]
    }
  ],
  "get-effective-tenant-name": [
    {
      "label": "GET-EFFECTIVE-TENANT-NAME([database-name])",
      "documentation": "Returns the name of the effective tenant as a character string. database-name A character expression that evaluates to a logical database name or database alias. If no database is specified and more than one database is connected, the AVM raises",
      "parameters": [
        "database-name"
      ]
    }
  ],
  "get-long": [
    {
      "label": "GET-LONG (source, position)",
      "documentation": "Returns the signed 32-bit value at the specified memory location as an INTEGER value. source A function or variable that returns a RAW or MEMPTR value. If source is the Unknown value ( ? ), GET-LONG returns the Unknown value",
      "parameters": [
        "source",
        "position"
      ]
    }
  ],
  "get-short": [
    {
      "label": "GET-SHORT (source, position)",
      "documentation": "Returns the signed 16-bit value at the specified memory location as an INTEGER value. source A function or variable that returns a RAW or MEMPTR value. If source is the Unknown value ( ? ), GET-SHORT returns the Unknown value",
      "parameters": [
        "source",
        "position"
      ]
    }
  ],
  "get-size": [
    {
      "label": "GET-SIZE (memptr-var)",
      "documentation": "Returns, as an INT64 value, the allocated byte size of the memory region associated with the specified MEMPTR variable. Note: Does not apply to SpeedScript programming. memptr-var A MEMPTR variable. If the variable is uninitialized (has no associated memory region),",
      "parameters": [
        "memptr-var"
      ]
    }
  ],
  "get-unsigned-long": [
    {
      "label": "GET-UNSIGNED-LONG (source, position)",
      "documentation": "Returns the unsigned 32-bit value at the specified memory location as an INT64. This is analogous to the GET-UNSIGNED-SHORT function, except with a 32-bit value. source A function or variable that returns a RAW or MEMPTR value. If source is",
      "parameters": [
        "source",
        "position"
      ]
    }
  ],
  "get-unsigned-short": [
    {
      "label": "GET-UNSIGNED-SHORT (source, position)",
      "documentation": "Returns the unsigned 16-bit value at the specified memory location as an INTEGER value. source A function or variable that returns a RAW or MEMPTR value. If source is the Unknown value ( ? ), GET-UNSIGNED-SHORT returns the Unknown value",
      "parameters": [
        "source",
        "position"
      ]
    }
  ],
  "go-pending": [
    {
      "label": "GO-PENDING",
      "documentation": "Returns a TRUE value if, within an EDITING phrase, an APPLY statement results in a GO action. The GO action is deferred until the end of the EDITING phrase. This function is supported only for backward compatibility. Note: Does not",
      "parameters": []
    }
  ],
  "generate-random-key": [
    {
      "label": "GENERATE-RANDOM-KEY",
      "documentation": "Generates a pseudorandom (rather than a truly random) series of bytes to use as an encryption key, and returns the key as a RAW value. You are responsible for generating, storing, and transporting this value. The size of the generated",
      "parameters": []
    }
  ],
  "handle": [
    {
      "label": "HANDLE (handle-string)",
      "documentation": "Converts a string representation of a handle to a valid handle. If the string does not correlate to a valid handle in the session, the function returns 0. CAUTION: Use this function only to convert a handle previously stored as",
      "parameters": [
        "handle-string"
      ]
    }
  ],
  "generate-pbe-key": [
    {
      "label": "GENERATE-PBE-KEY(password[, salt])",
      "documentation": "Generates a password-based encryption key, based on the PKCS#5/RFC 2898 standard, and returns the key as a RAW value. Note: If PBE-ALGORITHM attribute is set to PBKDF2 , then a PBKDF2 key derivation algorithm approved by the National Institute of",
      "parameters": [
        "password",
        "salt"
      ]
    }
  ],
  "frame-value": [
    {
      "label": "FRAME-VALUE",
      "documentation": "During a data entry statement, returns the (character string) value of the input field that the cursor is in to the current input field. At other times, returns the (character string) value of the input field the cursor was last",
      "parameters": []
    }
  ],
  "hash-code": [
    {
      "label": "HASH-CODE(arg [, arg]…)",
      "documentation": "Returns a hash code, as an INTEGER value, for one or more arguments. The HASH-CODE function is intended to be used in objects that are part of a hash-based collection, that is, those that implement the Progress.Collections.IHashable interface or the",
      "parameters": [
        "arg",
        "arg"
      ]
    }
  ],
  "if...then...else": [
    {
      "label": "IF condition THEN expression1 ELSE expression2",
      "documentation": "Evaluates and returns one of two expressions, depending on the value of a specified condition. condition An expression whose value is logical (TRUE or FALSE). expression1 A constant, field name, variable name, or expression. If the condition is TRUE, then",
      "parameters": []
    }
  ],
  "index": [
    {
      "label": "INDEX (source, searchString [, starting])",
      "documentation": "Returns an INTEGER value that indicates the position of a search string within a source string. source A CHARACTER, LONGCHAR or MEMPTR expression. searchString A CHARACTER or LONGCHAR expression whose position you want to locate in source . If searchString",
      "parameters": [
        "source",
        "searchString",
        "starting"
      ]
    }
  ],
  "input": [
    {
      "label": "INPUT [FRAME frame]field",
      "documentation": "References the value of a field in a frame. For example, if you use the PROMPT-FOR statement to get input from the user, PROMPT-FOR stores that information in the screen buffer. You can use the INPUT function to refer to",
      "parameters": []
    }
  ],
  "int64": [
    {
      "label": "INT64 (expression)",
      "documentation": "Takes any data type and returns an INT64 value, if the conversion is possible. This function takes most common data types except for RAW and MEMPTR. expression A constant, field name, variable name, or expression whose value can be of",
      "parameters": [
        "expression"
      ]
    }
  ],
  "get-bits": [
    {
      "label": "GET-BITS(source, position, numbits)",
      "documentation": "Interprets one or more consecutive bits in an integer variable or field as an ABL integer value and returns that value. source An ABL integer variable. position A variable or expression that returns an integer. This parameter designates the position",
      "parameters": [
        "source",
        "position",
        "numbits"
      ]
    }
  ],
  "get-string": [
    {
      "label": "GET-STRING (source, position [, numbytes])",
      "documentation": "Returns the null-terminated character string at the specified memory location as a CHARACTER value (not including the null terminator) or the number of bytes specified starting from the specified memory location as a CHARACTER value. source A function or variable",
      "parameters": [
        "source",
        "position",
        "numbytes"
      ]
    }
  ],
  "interval": [
    {
      "label": "INTERVAL (datetime1, datetime2, interval-unit)",
      "documentation": "Returns the time interval between two DATE, DATETIME, or DATETIME-TZ values as an INT64 value. datetime1 An expression whose value is a DATE, DATETIME, or DATETIME-TZ. datetime2 An expression whose value is a DATE, DATETIME, or DATETIME-TZ. interval-unit A character",
      "parameters": [
        "datetime1",
        "datetime2",
        "interval-unit"
      ]
    }
  ],
  "is-attr-space": [
    {
      "label": "IS-ATTR-SPACE",
      "documentation": "This function is deprecated. TERMINAL statement",
      "parameters": []
    }
  ],
  "is-codepage-fixed": [
    {
      "label": "IS-CODEPAGE-FIXED (longchar)",
      "documentation": "Returns TRUE if the code page of the specified LONGCHAR variable is fixed; otherwise it returns FALSE. longchar The name of a LONGCHAR variable. FIX-CODEPAGE statement , GET-CODEPAGE function",
      "parameters": [
        "longchar"
      ]
    }
  ],
  "get-int64": [
    {
      "label": "GET-INT64 (source, position)",
      "documentation": "Returns the signed 64-bit value at the specified memory location as an INT64 value. source A function or variable that returns a RAW or MEMPTR value. If source is the Unknown value ( ? ), GET-INT64 returns the Unknown value",
      "parameters": [
        "source",
        "position"
      ]
    }
  ],
  "get-pointer-value": [
    {
      "label": "GET-POINTER-VALUE (memptr-var)",
      "documentation": "Returns, as an INT64 value, the address of (or pointer to) the memory region associated with the specified MEMPTR variable. The returned value is based on whether the platform supports 64-bit pointers or 32-bit pointers. On a 32-bit platform, the",
      "parameters": [
        "memptr-var"
      ]
    }
  ],
  "is-db-multi-tenant": [
    {
      "label": "IS-DB-MULTI-TENANT([database-name])",
      "documentation": "Returns TRUE if a specified database is multi-tenant enabled, and returns FALSE if it is not. database-name A character expression that evaluates to a logical database name or database alias. If no database is specified and more than one database",
      "parameters": [
        "database-name"
      ]
    }
  ],
  "is-lead-byte": [
    {
      "label": "IS-LEAD-BYTE (string)",
      "documentation": "Returns TRUE if the first character of the string is the lead-byte of a multi-byte character. Returns FALSE if it is not. string A character expression (a constant, field name, variable name, or any combination of these) whose value is",
      "parameters": [
        "string"
      ]
    }
  ],
  "iso-date": [
    {
      "label": "ISO-DATE (expression)",
      "documentation": "Returns a character representation of a DATE, DATETIME , or DATETIME-TZ that conforms to the ISO 8601 standard for date/time representations. Note: These formats are equivalent to the XML Schema date and dateTime formats. expression An expression that evaluates to",
      "parameters": [
        "expression"
      ]
    }
  ],
  "kblabel": [
    {
      "label": "KBLABEL (key-function)",
      "documentation": "Returns the keyboard label (such as F1 ) of the key that performs a specified ABL function (such as GO). Note: Does not apply to SpeedScript programming. key-function An expression whose value is the name of the special ABL key",
      "parameters": [
        "key-function"
      ]
    }
  ],
  "keycode": [
    {
      "label": "KEYCODE (key-label)",
      "documentation": "Evaluates a key label (such as F1 ) for a key in the predefined set of keyboard keys and returns the corresponding = key code (such as 301) as an INTEGER value. See OpenEdge Programming Interfaces for a list of",
      "parameters": [
        "key-label"
      ]
    }
  ],
  "keyfunction": [
    {
      "label": "KEYFUNCTION (expression)",
      "documentation": "Evaluates an integer expression (such as 301) and returns a character string that is the function of the key associated with that integer expression (such as GO). Note: Does not apply to SpeedScript programming. expression A constant, field name, variable",
      "parameters": [
        "expression"
      ]
    }
  ],
  "keylabel": [
    {
      "label": "KEYLABEL (key-code)",
      "documentation": "Evaluates a key code (such as 301) and returns a character string that is the predefined keyboard label for that key (such as F1 ). Note: Does not apply to SpeedScript programming. key-code The key code of the key whose",
      "parameters": [
        "key-code"
      ]
    }
  ],
  "keyword": [
    {
      "label": "KEYWORD (expression)",
      "documentation": "Returns a character value that indicates whether a string is an ABL reserved keyword. expression A constant, field name, variable name, or expression that results in a character string. If expression matches an ABL reserved keyword or valid abbreviation of",
      "parameters": [
        "expression"
      ]
    }
  ],
  "keyword-all": [
    {
      "label": "KEYWORD-ALL (expression)",
      "documentation": "Returns a character value that indicates whether a string is an ABL keyword. This function returns all keywords and does not distinguish between reserved or unreserved keywords. expression A constant, field name, variable name, or expression that results in a",
      "parameters": [
        "expression"
      ]
    }
  ],
  "last": [
    {
      "label": "LAST (break-group)",
      "documentation": "Returns a TRUE value if the current iteration of a DO, FOR EACH, or REPEAT . . . BREAK block is the last iteration of that block. break-group The name of a field or expression you named in the block",
      "parameters": [
        "break-group"
      ]
    }
  ],
  "lc": [
    {
      "label": "LC (expression)",
      "documentation": "Converts any uppercase characters in a CHARACTER or LONGCHAR expression to lowercase characters, and returns the result. The data type of the returned value matches the data type of the expression passed to the function. expression A constant, field name,",
      "parameters": [
        "expression"
      ]
    }
  ],
  "ldbname": [
    {
      "label": "LDBNAME ({ integer-expression | logical-name | alias | BUFFER bufname })",
      "documentation": "Returns the logical name of a database that is currently connected. integer-expression The sequence number of a database the ABL session is connected to. For example, LDBNAME(1) returns information on the first database the ABL session is connected to, LDBNAME(2)",
      "parameters": [
        "integer-expression",
        "logical-name",
        "alias",
        "BUFFER",
        "bufname"
      ]
    }
  ],
  "left-trim": [
    {
      "label": "LEFT-TRIM (expression [, trim-chars])",
      "documentation": "Removes leading white space, or other specified characters, from a CHARACTER or LONGCHAR expression. The data type of the returned value matches the data type of the expression passed to the function. expression An expression (a constant, field name, variable",
      "parameters": [
        "expression",
        "trim-chars"
      ]
    }
  ],
  "length": [
    {
      "label": "LENGTH ({ exp | raw-exp | blob-field } [, type])",
      "documentation": "Returns, as an INTEGER value, the number of characters, bytes, or columns in a string, an expression of type RAW, or a BLOB field. exp An expression that evaluates to a CHARACTER, LONGCHAR, INTEGER, LOGICAL, or CLOB type. If exp",
      "parameters": [
        "exp",
        "raw-exp",
        "blob-field",
        "type"
      ]
    }
  ],
  "library": [
    {
      "label": "LIBRARY (string)",
      "documentation": "Parses a character string in the form path-name<<member-name>> , where path-name is the pathname of an ABL r-code library and member-name is the name of a file within the library, and returns the pathname of the library. The double angle",
      "parameters": [
        "string"
      ]
    }
  ],
  "line-counter": [
    {
      "label": "LINE-COUNTER [(stream | STREAM-HANDLE handle)]",
      "documentation": "Returns the current line number of paged output as an INTEGER value. The initial value of LINE-COUNTER is 1. At the completion of each DISPLAY statement, the AVM increments LINE-COUNTER by the number of lines that were output in that",
      "parameters": [
        "stream",
        "STREAM-HANDLE",
        "handle"
      ]
    }
  ],
  "list-events": [
    {
      "label": "LIST-EVENTS (handle [, platform])",
      "documentation": "Returns a comma-separated list of the valid events for a specified object or widget. Note: Does not apply to SpeedScript programming. handle A handle to a valid object or widget. The function returns a list of the events that are",
      "parameters": [
        "handle",
        "platform"
      ]
    }
  ],
  "list-query-attrs": [
    {
      "label": "LIST-QUERY-ATTRS (handle)",
      "documentation": "Returns a comma-separated list of attributes and methods that are supported for an object or widget. handle A handle to a valid object or widget. The function returns a list of the attributes and methods that are supported for that",
      "parameters": [
        "handle"
      ]
    }
  ],
  "list-set-attrs": [
    {
      "label": "LIST-SET-ATTRS (handle)",
      "documentation": "Returns a comma-separated list of attributes that can be set for an object or widget. handle A handle to a valid object or widget. The function returns a list of the attributes that can be set for that object or",
      "parameters": [
        "handle"
      ]
    }
  ],
  "guid": [
    {
      "label": "GUID [(UUID)]",
      "documentation": "Converts a universally unique identifier (UUID) value into a globally unique identifier (GUID) value. This function returns a GUID as a 36-character string value consisting of 32 hexadecimal digits (0 through 9 and A through F) and 4 hyphens formatted",
      "parameters": [
        "UUID"
      ]
    }
  ],
  "locked": [
    {
      "label": "LOCKED record",
      "documentation": "Returns a TRUE value in the following cases: a record is not available to a prior FIND . . . NO-WAIT statement because another user has locked the record a record is not available to a GET . . .",
      "parameters": []
    }
  ],
  "log": [
    {
      "label": "LOG (expression [, base])",
      "documentation": "Calculates the logarithm of an expression using a specified base and returns that logarithm as a DECIMAL value. expression A decimal expression that you want the logarithm of. Expression must be greater than 0. base A numeric expression that is",
      "parameters": [
        "expression",
        "base"
      ]
    }
  ],
  "logical": [
    {
      "label": "LOGICAL (expression [, char-expression-format])",
      "documentation": "Converts any data type into the LOGICAL data type. expression An expression in the data type that you want to convert to logical. char-expression-format A character expression that evaluates to a valid logical format, such as \" si/no \", or",
      "parameters": [
        "expression",
        "char-expression-format"
      ]
    }
  ],
  "lookup": [
    {
      "label": "LOOKUP (expression, list [, delimiter])",
      "documentation": "Returns an INTEGER value giving the position of an expression in a list. Returns a 0 if the expression is not in the list. expression A constant, field name, variable name, or expression that results in a character value that",
      "parameters": [
        "expression",
        "list",
        "delimiter"
      ]
    }
  ],
  "maximum": [
    {
      "label": "MAXIMUM (expression, expression [, expression] ...)",
      "documentation": "Compares two or more values and returns the largest value. expression A constant, field name, variable name, or expression. If there is a mixture of decimal and integer data types, decimal type is returned. In this procedure, if the CreditLimit",
      "parameters": [
        "expression",
        "expression",
        "expression"
      ]
    }
  ],
  "hex-decode": [
    {
      "label": "HEX-DECODE(expression)",
      "documentation": "Converts a string of type CHAR or LONGCHAR consisting of an even number of hexadecimal digits (0 through 9 and A through F) into a MEMPTR value. expression An expression of type CHAR or LONGCHAR containing the value you want",
      "parameters": [
        "expression"
      ]
    }
  ],
  "member": [
    {
      "label": "MEMBER (string)",
      "documentation": "Parses a reference to a member of an ABL r-code library and returns the simple member name. string A character expression (a constant, field name, variable or expression that results in a character value) whose value is the pathname of",
      "parameters": [
        "string"
      ]
    }
  ],
  "message-digest": [
    {
      "label": "MESSAGE-DIGEST(hash-algorithm, data-to-hash[, hash-key])",
      "documentation": "Hashes any of several types of source data using the specified hashing algorithm, and returns a RAW message digest value whose size and security depends on the algorithm. hash-algorithm A character string that specifies the hashing algorithm to use to",
      "parameters": [
        "hash-algorithm",
        "data-to-hash",
        "hash-key"
      ]
    }
  ],
  "message-lines": [
    {
      "label": "MESSAGE-LINES",
      "documentation": "Returns, as an INTEGER value, the number of lines in the message area at the bottom of the window. Note: Does not apply to SpeedScript programming. The following example displays a message on each available message line: r-messl.p",
      "parameters": []
    }
  ],
  "minimum": [
    {
      "label": "MINIMUM (expression, expression[, expression]...)",
      "documentation": "Compares two or more values and returns the smallest. expression A constant, field name, variable name, or expression. If there is a mixture of decimal and integer data types, decimal type is returned. This procedure prompts the user for an",
      "parameters": [
        "expression",
        "expression",
        "expression"
      ]
    }
  ],
  "hex-encode": [
    {
      "label": "HEX-ENCODE(expression)",
      "documentation": "Converts a RAW or MEMPTR value into a string of type LONGCHAR consisting of an even number of hexadecimal digits (0 through 9 and A through F). expression A RAW or MEMPTR expression containing the value you want to convert.",
      "parameters": [
        "expression"
      ]
    }
  ],
  "mtime": [
    {
      "label": "MTIME ([datetime-expression])",
      "documentation": "Returns an INTEGER value representing the time in milliseconds. If the MTIME function has no arguments, it returns the current number of milliseconds since midnight (similar to TIME, which returns seconds since midnight). datetime-expression An expression that evaluates to a",
      "parameters": [
        "datetime-expression"
      ]
    }
  ],
  "next-value": [
    {
      "label": "NEXT-VALUE (sequence [, logical-dbname] [, tenant-id])",
      "documentation": "Returns the next INT64 value of a static sequence, incremented by the positive or negative value defined in the Data Dictionary. sequence An identifier that specifies the name of a sequence defined in the Data Dictionary. logical-dbname An identifier that",
      "parameters": [
        "sequence",
        "logical-dbname",
        "tenant-id"
      ]
    }
  ],
  "normalize": [
    {
      "label": "NORMALIZE (string, normalization-form)",
      "documentation": "Returns the normalized form of a character string based on the specified Unicode normalization form. string The source string to normalize. The value may be of type CHARACTER or LONGCHAR. If the string is a CHARACTER value, -cpinternal must be",
      "parameters": [
        "string",
        "normalization-form"
      ]
    }
  ],
  "now": [
    {
      "label": "NOW",
      "documentation": "Returns the current system date, time, and time zone as a DATETIME-TZ value. The NOW function returns the system date and time of the client or server machine that serves as the time source for applications running during the ABL",
      "parameters": []
    }
  ],
  "num-aliases": [
    {
      "label": "NUM-ALIASES",
      "documentation": "Returns an INTEGER value that represents the number of aliases defined. The NUM-ALIASES function uses no arguments. This procedure displays the number of defined aliases. It also displays the aliases and logical database names of all connected databases. r-numal.p ALIAS",
      "parameters": []
    }
  ],
  "num-dbs": [
    {
      "label": "NUM-DBS",
      "documentation": "Takes no arguments; returns the number of connected databases as an INTEGER value. This procedure uses NUM-DBS to display the logical name and database restrictions of all connected databases: r-numdbs.p ALIAS function , CONNECT statement , CONNECTED function , CREATE",
      "parameters": []
    }
  ],
  "num-entries": [
    {
      "label": "NUM-ENTRIES (list[, character])",
      "documentation": "Returns the number of elements in a list of character strings as an INTEGER value. list A character expression containing a list of character strings separated with a character delimiter. The list can be a variable of type CHARACTER or",
      "parameters": [
        "list",
        "character"
      ]
    }
  ],
  "integer": [
    {
      "label": "INTEGER (expression)",
      "documentation": "Converts an expression of any data type, with the exception of BLOB, CLOB, and RAW, to a 32-bit integer value of data type INTEGER, rounding that value if necessary. expression A constant, field name, variable name, or expression. The function",
      "parameters": [
        "expression"
      ]
    }
  ],
  "is-column-codepage": [
    {
      "label": "IS-COLUMN-CODEPAGE (field)",
      "documentation": "Returns TRUE if the specified CLOB field is a COLUMN-CODEPAGE CLOB. Otherwise, it returns FALSE (that is, if the CLOB is a DBCODEPAGE CLOB or a TTCODEPAGE CLOB). field The name of a CLOB field.",
      "parameters": [
        "field"
      ]
    }
  ],
  "opsys": [
    {
      "label": "OPSYS",
      "documentation": "Identifies the operating system being used, so that a single version of a procedure can work differently under different operating systems. Returns the value of that operating system. Valid values are \"UNIX\" and \"WIN32\". Note: For both 32-bit and 64-bit",
      "parameters": []
    }
  ],
  "os-drives": [
    {
      "label": "OS-DRIVES",
      "documentation": "(Windows only) Returns a comma-separated list of available drives. The following procedure populates a selection list with the output of the OS-DRIVES function, and then displays the list and prompts the user to select a drive. The procedure then informs",
      "parameters": []
    }
  ],
  "os-getenv": [
    {
      "label": "OS-GETENV (environment-variable)",
      "documentation": "Returns a string that contains the value of the desired environment variable in the environment in which the ABL session is running. environment-variable The name of the environment variable whose value you want to find. This procedure prompts a user",
      "parameters": [
        "environment-variable"
      ]
    }
  ],
  "page-number": [
    {
      "label": "PAGE-NUMBER [(stream | STREAM-HANDLE handle)]",
      "documentation": "Returns the page number of the output destination as an INTEGER value. If the output stream is not paged, PAGE-NUMBER returns a value of 0. stream The name of an output stream. If you do not name a stream, PAGE-NUMBER",
      "parameters": [
        "stream",
        "STREAM-HANDLE",
        "handle"
      ]
    }
  ],
  "lastkey": [
    {
      "label": "LASTKEY",
      "documentation": "Returns, as an INTEGER value, the integer key code of the most recent event read from the user (that is, from the keyboard or mouse) during an interaction with a procedure. Note: Does not apply to SpeedScript programming. In this",
      "parameters": []
    }
  ],
  "last-of": [
    {
      "label": "LAST-OF (break-group)",
      "documentation": "Returns a TRUE value if the current iteration of a DO, FOR EACH, or REPEAT . . . BREAK block is the last iteration for a particular value of a break group. break-group The name of a field or expression",
      "parameters": [
        "break-group"
      ]
    }
  ],
  "proc-handle": [
    {
      "label": "PROC-HANDLE",
      "documentation": "Returns a value in the appropriate data type (usually INTEGER) that is a unique identifier for a stored procedure. This procedure runs the stored procedure pcust and writes the procedure handle to the variable iHandle. It writes the results of",
      "parameters": []
    }
  ],
  "list-widgets": [
    {
      "label": "LIST-WIDGETS (event-name [, platform])",
      "documentation": "Returns a comma-separated list of objects and widget types that respond to a specified event. Note: Does not apply to SpeedScript programming. event-name A character-string expression that evaluates to an event name. platform A character-string value that specifies a display",
      "parameters": [
        "event-name",
        "platform"
      ]
    }
  ],
  "proc-status": [
    {
      "label": "PROC-STATUS",
      "documentation": "Returns the return status from a stored procedure. The return status is an INTEGER value that indicates whether a stored procedure failed and why. This procedure runs the ORACLE stored procedure pcust and writes the results of the stored procedure",
      "parameters": []
    }
  ],
  "md5-digest": [
    {
      "label": "MD5-DIGEST(data-to-hash[, hash-key])",
      "documentation": "Hashes the specified data using the RSA Message Digest Hash Algorithm (MD5), and returns a 16-byte binary message digest value as a RAW value. Note: This function is provided for backward compatibility only and should not be used in new",
      "parameters": [
        "data-to-hash",
        "hash-key"
      ]
    }
  ],
  "progress": [
    {
      "label": "PROGRESS",
      "documentation": "Returns one of the following character values which identifies the ABL product that is running: Full, Query or Run-time. Can also return COMPILE if you use the Developer's Toolkit, or COMPILE-ENCRYPT if you use the run-time Compiler. Note: Does not",
      "parameters": []
    }
  ],
  "month": [
    {
      "label": "MONTH (date)",
      "documentation": "Evaluates a date expression and returns a month INTEGER value from 1 to 12, inclusive. date A date expression where you want a month value. datetime-expression An expression that evaluates to a DATETIME or DATETIME-TZ. The MONTH function returns the",
      "parameters": [
        "date"
      ]
    },
    {
      "label": "MONTH (datetime-expression)",
      "documentation": "Evaluates a date expression and returns a month INTEGER value from 1 to 12, inclusive. date A date expression where you want a month value. datetime-expression An expression that evaluates to a DATETIME or DATETIME-TZ. The MONTH function returns the",
      "parameters": [
        "datetime-expression"
      ]
    }
  ],
  "promsgs": [
    {
      "label": "PROMSGS",
      "documentation": "Returns the current value of the ABL PROMSGS variable. This example uses the PROMSGS function to determine whether the default message file (promsgs) is in use. If not, it uses the PROMSGS function again to display the name of the",
      "parameters": []
    }
  ],
  "propath": [
    {
      "label": "PROPATH",
      "documentation": "Returns the current value of the PROPATH environment variable. This procedure first displays a comma-separated list of the directories in the current PROPATH . It then displays each directory in the current PROPATH , one per line. r-ppath1.p ABL stores",
      "parameters": []
    }
  ],
  "proversion": [
    {
      "label": "PROVERSION [(mode)]",
      "documentation": "Returns the version of ABL, or release of OpenEdge, you are running. You can also optionally retrieve additional release information, such as the service pack version number and the hot fix version number. mode An optional integer expression that identifies",
      "parameters": [
        "mode"
      ]
    }
  ],
  "quoter": [
    {
      "label": "QUOTER (expression [, quote-char [, null-string]])",
      "documentation": "Converts the specified data type to CHARACTER and encloses the results in quotes when necessary. The QUOTER function is intended for use in QUERY-PREPARE where a character predicate must be created from a concatenated list of string variables to form",
      "parameters": [
        "expression",
        "quote-char",
        "null-string"
      ]
    },
    {
      "label": "DEFINE VARIABLE mychar As CHARACTER NO-UNDO INITIAL \"Lift Line Skiing\". ... qhandle:QUERY-PREPARE(\"FOR EACH Customer WHERE Customer.Name = \" + QUOTER(mychar))",
      "documentation": "Converts the specified data type to CHARACTER and encloses the results in quotes when necessary. The QUOTER function is intended for use in QUERY-PREPARE where a character predicate must be created from a concatenated list of string variables to form",
      "parameters": [
        "FOR",
        "EACH",
        "Customer",
        "WHERE",
        "Customer",
        "Name",
        "QUOTER",
        "mychar"
      ]
    },
    {
      "label": "FOR EACH Customer WHERE Customer.Name = \"Lift Line Skiing\".",
      "documentation": "Converts the specified data type to CHARACTER and encloses the results in quotes when necessary. The QUOTER function is intended for use in QUERY-PREPARE where a character predicate must be created from a concatenated list of string variables to form",
      "parameters": []
    }
  ],
  "r-index": [
    {
      "label": "R-INDEX (source, target [, starting])",
      "documentation": "Returns an INTEGER value that indicates the position of the target string within the source string. In contrast to the INDEX function, R-INDEX performs the search from right to left. source A constant, field name, variable name, or expression that",
      "parameters": [
        "source",
        "target",
        "starting"
      ]
    },
    {
      "label": "R-INDEX(\"abcd\", \"c\")",
      "documentation": "Returns an INTEGER value that indicates the position of the target string within the source string. In contrast to the INDEX function, R-INDEX performs the search from right to left. source A constant, field name, variable name, or expression that",
      "parameters": [
        "abcd",
        "c"
      ]
    }
  ],
  "random": [
    {
      "label": "RANDOM (low, high)",
      "documentation": "Returns a random INTEGER value between two integers (inclusive). Note: This function returns a number from a pseudorandom sequence of numbers rather than a truly random sequence. The Alternate Random Number Generator (-rand) parameter determines whether the same sequence of",
      "parameters": [
        "low",
        "high"
      ]
    }
  ],
  "raw": [
    {
      "label": "RAW (field[, position[, length]])",
      "documentation": "(ORACLE only) Extracts bytes from a field. field Any field from which you want to extract bytes. position An integer expression that indicates the position of the first byte you want to extract from field . The default value of",
      "parameters": [
        "field",
        "position",
        "length"
      ]
    }
  ],
  "recid": [
    {
      "label": "RECID (record)",
      "documentation": "Returns the unique internal identifier of the database record currently associated with the record buffer you name. This internal identifier has the data type RECID, an 8-byte value that is supported by OpenEdge databases and some non-OpenEdge DataServers. This function",
      "parameters": [
        "record"
      ]
    }
  ],
  "record-length": [
    {
      "label": "RECORD-LENGTH (buffer)",
      "documentation": "Returns the length of a record in a buffer as an INTEGER value. buffer A database buffer containing a record. The RECORD-LENGTH function is especially useful when implementing ABL-based database replication, which involves storing entire database records in log record",
      "parameters": [
        "buffer"
      ]
    }
  ],
  "rejected": [
    {
      "label": "REJECTED(buffer-name)",
      "documentation": "Returns the current REJECTED attribute setting for a ProDataSet temp-table buffer. buffer-name The name of a ProDataSet temp-table buffer. This function is typically used with the SAVE-ROW-CHANGES( ) method. The REJECTED function corresponds to the REJECTED attribute . You can",
      "parameters": [
        "buffer-name"
      ]
    }
  ],
  "replace": [
    {
      "label": "REPLACE (source-string, from-string, to-string)",
      "documentation": "Returns a string with specified substring replacements. The data type of the returned value matches the data type of the expression passed to the function. source-string Specifies the base string to make replacements in. The source-string parameter can be any",
      "parameters": [
        "source-string",
        "from-string",
        "to-string"
      ]
    }
  ],
  "retry": [
    {
      "label": "RETRY",
      "documentation": "Returns a TRUE value if the current block is being reprocessed after a previous UNDO, RETRY . Using the RETRY function in a block turns off the default error processing, which result in no infinite loop protection for the block.",
      "parameters": []
    }
  ],
  "return-value": [
    {
      "label": "RETURN-VALUE",
      "documentation": "Provides a character string value returned by the most recently executed RETURN statement of a local or remote procedure, trigger block, user-defined function, method of a class, class constructor, or property accessor. For examples of the RETURN-VALUE function, see the",
      "parameters": []
    }
  ],
  "rgb-value": [
    {
      "label": "RGB-VALUE (redval, greenval, blueval)",
      "documentation": "Returns an INTEGER value that represents a combination of a red, green, and blue color value. This function allows you to define an arbitrary color, expanding beyond those colors defined in the color table. Note: Does not apply to SpeedScript",
      "parameters": [
        "redval",
        "greenval",
        "blueval"
      ]
    }
  ],
  "right-trim": [
    {
      "label": "RIGHT-TRIM (expression[, trim-chars])",
      "documentation": "Removes trailing white space, or other specified characters, from a CHARACTER or LONGCHAR expression. The data type of the returned value matches the data type of the expression passed to the function. expression An expression (a constant, field name, variable",
      "parameters": [
        "expression",
        "trim-chars"
      ]
    }
  ],
  "round": [
    {
      "label": "ROUND (expression, precision)",
      "documentation": "Rounds a decimal expression to a specified number of places after the decimal point. expression A decimal expression. precision A non-negative integer expression whose value is the number of places you want in the decimal result of the ROUND function.",
      "parameters": [
        "expression",
        "precision"
      ]
    }
  ],
  "row-state": [
    {
      "label": "ROW-STATE(buffer-name)",
      "documentation": "Returns an INTEGER value that represents the current change state of a static ProDataSet temp-table buffer. buffer-name The name of a ProDataSet temp-table buffer (preferably a before-image temp-table buffer). The ROW-STATE function corresponds to the ROW-STATE attribute . When the",
      "parameters": [
        "buffer-name"
      ]
    }
  ],
  "rowid": [
    {
      "label": "ROWID (record)",
      "documentation": "Returns the unique internal identifier of the database record currently associated with the record buffer you name. This internal identifier has the data type ROWID , which is supported for OpenEdge and all other DataServer databases. Note: The ROWID function",
      "parameters": [
        "record"
      ]
    }
  ],
  "screen-lines": [
    {
      "label": "SCREEN-LINES",
      "documentation": "Returns, as an INTEGER value, the number of lines you can use to display frames. This value omits the space used by the message area and status area. Note: Does not apply to SpeedScript programming. Here, a different number of",
      "parameters": []
    }
  ],
  "sdbname": [
    {
      "label": "SDBNAME ({ integer-expression | logical-name | alias })",
      "documentation": "Accepts an integer expression or a character expression as a parameter. If the parameter resolves to a currently connected non-OpenEdge database then the SDBNAME function returns the logical name of the schema holder database containing the non-OpenEdge schema. If the",
      "parameters": [
        "integer-expression",
        "logical-name",
        "alias"
      ]
    }
  ],
  "os-error": [
    {
      "label": "OS-ERROR",
      "documentation": "Returns, as an INTEGER value, an ABL error code that indicates whether an execution error occurred during the last OS-APPEND, OS-COPY, OS-CREATE-DIR, OS-DELETE, OS-RENAME or SAVE CACHE statement. The following procedure prompts the user to enter a file to delete,",
      "parameters": []
    }
  ],
  "num-results": [
    {
      "label": "NUM-RESULTS (query-name)",
      "documentation": "Returns, as an INTEGER value, the number of rows currently in the results list of a scrolling query. The results list is initialized when the query is opened. Depending on the query, the entire list is built immediately upon opening",
      "parameters": [
        "query-name"
      ]
    }
  ],
  "seek": [
    {
      "label": "SEEK ({ INPUT | OUTPUT | name | STREAM-HANDLE handle})",
      "documentation": "Returns the offset of the file pointer in a text file as an INT64 value. You define a procedure variable to hold the offset value and later position the file to that offset. INPUT If you specify INPUT, the SEEK",
      "parameters": [
        "INPUT",
        "OUTPUT",
        "name",
        "STREAM-HANDLE",
        "handle"
      ]
    }
  ],
  "set-db-client": [
    {
      "label": "SET-DB-CLIENT ({ client-principal-handle | ? } [, { integer-expression | logical-name |alias | ? }])",
      "documentation": "Sets the user identity for a specified connected OpenEdge database using an unsealed or a sealed client-principal object. For an unsealed client-principal object (in the INITIAL state), this function performs a user authentication operation on the user identity asserted by",
      "parameters": [
        "client-principal-handle",
        "integer-expression",
        "logical-name",
        "alias"
      ]
    }
  ],
  "set-effective-tenant": [
    {
      "label": "SET-EFFECTIVE-TENANT (tenant-expression[, database-name])",
      "documentation": "Sets the effective tenancy of a multi-tenant database connection for a super-tenant user. A super tenant has no real tenancy of its own, but can act as if it is a particular regular tenant without the user having to authenticate",
      "parameters": [
        "tenant-expression",
        "database-name"
      ]
    }
  ],
  "page-size": [
    {
      "label": "PAGE-SIZE [(stream | STREAM-HANDLE handle)]",
      "documentation": "Returns the page size (lines per page) of an output destination as an INTEGER value. If the output stream is not paged, PAGE-SIZE returns a value of 0. stream The name of an output stream. If you do not name",
      "parameters": [
        "stream",
        "STREAM-HANDLE",
        "handle"
      ]
    }
  ],
  "sha1-digest": [
    {
      "label": "SHA1-DIGEST(data-to-hash[, hash-key])",
      "documentation": "Hashes the specified data using the United States Government Secure Hash Algorithm (SHA-1), and returns a 20-byte binary message digest value as a RAW value. Note: This function is provided for backward compatibility only and should not be used in",
      "parameters": [
        "data-to-hash",
        "hash-key"
      ]
    }
  ],
  "ssl-server-name": [
    {
      "label": "SSL-SERVER-NAME (logical-database-name)",
      "documentation": "Returns the digital certificate subject name for an OpenEdge database connected via TLS. If a database connection does not exist or the connection is not using TLS (including a shared-memory connection), this function returns the Unknown value ( ? ).",
      "parameters": [
        "logical-database-name"
      ]
    }
  ],
  "string": [
    {
      "label": "STRING (source[, format])",
      "documentation": "Converts a value of any data type into a character value. source An expression of any data type that you want to convert to a character value. format The format you want to use for the new character value. This",
      "parameters": [
        "source",
        "format"
      ]
    }
  ],
  "substitute": [
    {
      "label": "SUBSTITUTE (base-string[, arg]...)",
      "documentation": "Returns a character string that is made up of a base string plus the substitution of arguments in the string. It allows you to use a single string in place of concatenated strings. The function is designed to simplify the",
      "parameters": [
        "base-string",
        "arg"
      ]
    }
  ],
  "substring": [
    {
      "label": "SUBSTRING (source, position [, length [, type]])",
      "documentation": "Extracts a portion of a character string from a field or variable. source A CHARACTER or LONGCHAR expression from which you want to extract characters or bytes. position An integer expression that indicates the position of the first character you",
      "parameters": [
        "source",
        "position",
        "length",
        "type"
      ]
    }
  ],
  "super": [
    {
      "label": "SUPER [(parameter [, parameter] ...)]",
      "documentation": "Runs the super procedure version of the current user-defined function. This language element must appear within a user-defined function, but can appear anywhere within the user-defined function. If this language element does not appear within a user-defined function, the compiler",
      "parameters": [
        "parameter",
        "parameter"
      ]
    },
    {
      "label": "SUPER version of user-defined function name invoked but could not be found",
      "documentation": "Runs the super procedure version of the current user-defined function. This language element must appear within a user-defined function, but can appear anywhere within the user-defined function. If this language element does not appear within a user-defined function, the compiler",
      "parameters": []
    }
  ],
  "pdbname": [
    {
      "label": "PDBNAME (integer-expression|logical-name|alias)",
      "documentation": "Returns the physical name of a currently connected database. integer-expression If the parameter supplied to PDBNAME is an integer expression, and there are, for example, three currently connected databases, then PDBNAME(1), PDBNAME(2), and PDBNAME(3) return their physical names. Also, continuing",
      "parameters": [
        "integer-expression",
        "logical-name",
        "alias"
      ]
    }
  ],
  "process-architecture": [
    {
      "label": "PROCESS-ARCHITECTURE",
      "documentation": "Identifies the bit value of the AVM process you are using at run time and returns this value as an INTEGER. Valid values are 32 for a 32-bit AVM and 64 for 64-bit AVM. For example, an application that uses",
      "parameters": []
    }
  ],
  "tenant-id": [
    {
      "label": "TENANT-ID ([database-name])",
      "documentation": "Returns the tenant ID (as an integer) of the real tenant associated with a database connection. database-name A character expression that evaluates to a logical database name or database alias. If the database is not enabled for multi-tenancy, the function",
      "parameters": [
        "database-name"
      ]
    }
  ],
  "tenant-name": [
    {
      "label": "TENANT-NAME ([database-name])",
      "documentation": "Returns the name (as a character string) of the real tenant associated with a database connection. database-name A character expression that evaluates to a logical database name or database alias. If the database is not enabled for multi-tenancy, the function",
      "parameters": [
        "database-name"
      ]
    }
  ],
  "tenant-name-to-id": [
    {
      "label": "TENANT-NAME-TO-ID (tenant-name [, database-name])",
      "documentation": "Returns the tenant ID associated with an input tenant name. tenant-name A character expression that evaluates to the name of a tenant. database-name A character expression that evaluates to a logical database name or database alias. If no database is",
      "parameters": [
        "tenant-name",
        "database-name"
      ]
    }
  ],
  "terminal": [
    {
      "label": "TERMINAL",
      "documentation": "In Windows, in graphical interfaces, TERMINAL returns WIN3. In Windows, in character interfaces, TERMINAL returns CO80, BW80, or MONO, depending on the monitor type. On UNIX, TERMINAL returns the value of the $TERM environment variable. In batch mode, TERMINAL returns",
      "parameters": []
    }
  ],
  "today": [
    {
      "label": "TODAY",
      "documentation": "Returns the current system date. This procedure prints the date in the first line at the top of each page of a report. Instead of using TODAY in the FORM statement, the procedure uses a variable to hold the date.",
      "parameters": []
    }
  ],
  "timezone": [
    {
      "label": "TIMEZONE ([datetime-tz-expression | char-expression])",
      "documentation": "Returns an INTEGER value representing the time zone offset from Coordinated Universal Time (UTC), in minutes. Use this function together with the STRING function to produce the time in hours, minutes, and seconds. Note: Coordinated Universal Time (UTC) is the",
      "parameters": [
        "datetime-tz-expression",
        "char-expression"
      ]
    }
  ],
  "to-rowid": [
    {
      "label": "TO-ROWID (rowid-string)",
      "documentation": "Converts a string representation of a ROWID to a valid ROWID value. rowid-string A string representation of a ROWID. Since ROWID values are a variable sequence of hexadecimal digits, rowid-string must be in the form \"0x hex-digits \", where hex-digits",
      "parameters": [
        "rowid-string"
      ]
    }
  ],
  "transaction": [
    {
      "label": "TRANSACTION",
      "documentation": "Returns a LOGICAL value that indicates whether a transaction is currently active. Transaction object handle",
      "parameters": []
    }
  ],
  "trim": [
    {
      "label": "TRIM (expression [, trim-chars])",
      "documentation": "Removes leading and trailing white space, or other specified characters, from a CHARACTER or LONGCHAR expression. The data type of the returned value matches the data type of the expression passed to the function. expression An expression (a constant, field",
      "parameters": [
        "expression",
        "trim-chars"
      ]
    }
  ],
  "truncate": [
    {
      "label": "TRUNCATE (expression, decimal-places)",
      "documentation": "Truncates a decimal expression to a specified number of decimal places, returning a decimal value. expression A decimal expression that you want to truncate. decimal-places A non-negative integer expression that indicates the number of decimal places for a truncated expression",
      "parameters": [
        "expression",
        "decimal-places"
      ]
    }
  ],
  "type-of": [
    {
      "label": "TYPE-OF (object-reference, object-type-name).",
      "documentation": "Verifies that the class instance to which the specified object reference points is an instance of the specified object type, inherits from the specified super class, or implements the specified interface. If the object reference is valid and points to",
      "parameters": [
        "object-reference",
        "object-type-name"
      ]
    }
  ],
  "unbox": [
    {
      "label": "UNBOX (object-reference)",
      "documentation": "(.NET) Unboxes a .NET System.Object or array object and returns a value of a corresponding ABL primitive or array type. object-reference Specifies an object reference to a boxed .NET primitive value ( System.Object ) or to a one-dimensional .NET array",
      "parameters": [
        "object-reference"
      ]
    }
  ],
  "userid": [
    {
      "label": "USERID [(logical-dbname)]",
      "documentation": "Returns a character string representing the user ID for the specified database connection identity. logical-dbname The logical name of the database from whose connection identity you want to retrieve the user ID. The logical database name must be a character",
      "parameters": [
        "logical-dbname"
      ]
    }
  ],
  "valid-event": [
    {
      "label": "VALID-EVENT (handle, event-name [, platform])",
      "documentation": "Verifies whether a specified event is valid for a specified widget. For each type of widget, only certain events are valid. The function returns a value (TRUE/FALSE). Note: Does not apply to SpeedScript programming. handle An expression that produces a",
      "parameters": [
        "handle",
        "event-name",
        "platform"
      ]
    }
  ],
  "valid-handle": [
    {
      "label": "VALID-HANDLE (handle)",
      "documentation": "Verifies that a handle is valid. Note: Does not apply to SpeedScript programming. handle An expression that evaluates to a value of type HANDLE. If the handle represents an object that is currently valid, VALID-HANDLE returns TRUE. If the handle",
      "parameters": [
        "handle"
      ]
    }
  ],
  "valid-object": [
    {
      "label": "VALID-OBJECT ({ handle|object-reference })",
      "documentation": "Verifies that an object reference points to a valid ABL or .NET class-based object instance or an ABL handle-based object. If the object reference represents an object that is currently valid, the function returns TRUE. If the object reference is",
      "parameters": [
        "handle",
        "object-reference"
      ]
    }
  ],
  "program-name": [
    {
      "label": "PROGRAM-NAME(n)",
      "documentation": "Returns the name of the calling program. n The numeric argument. If n is 1, the name of the current program is returned. If n is 2, the name of the calling program is returned. If there is no calling",
      "parameters": [
        "n"
      ]
    }
  ],
  "weekday": [
    {
      "label": "WEEKDAY (date)",
      "documentation": "Evaluates a date expression and returns the day of the week as an INTEGER value from 1 (Sunday) to 7 (Saturday) for that date. date A date expression for which you want the day of the week. datetime-expression An expression",
      "parameters": [
        "date"
      ]
    },
    {
      "label": "WEEKDAY (datetime-expression)",
      "documentation": "Evaluates a date expression and returns the day of the week as an INTEGER value from 1 (Sunday) to 7 (Saturday) for that date. date A date expression for which you want the day of the week. datetime-expression An expression",
      "parameters": [
        "datetime-expression"
      ]
    }
  ],
  "year": [
    {
      "label": "YEAR (date)",
      "documentation": "Evaluates a date expression and returns the year value of that date, including the century, as an INTEGER value. date A date expression for which you want to determine the year. datetime-expression An expression that evaluates to a DATETIME or",
      "parameters": [
        "date"
      ]
    },
    {
      "label": "YEAR (datetime-expression)",
      "documentation": "Evaluates a date expression and returns the year value of that date, including the century, as an INTEGER value. date A date expression for which you want to determine the year. datetime-expression An expression that evaluates to a DATETIME or",
      "parameters": [
        "datetime-expression"
      ]
    }
  ],
  "widget-handle": [
    {
      "label": "WIDGET-HANDLE (handle-string)",
      "documentation": "This function is supported only for backward compatibility. Use the HANDLE function instead. Converts a string representation of a handle to a valid handle. CAUTION: Use this function only to convert a handle previously stored as a string value back",
      "parameters": [
        "handle-string"
      ]
    }
  ],
  "query-off-end": [
    {
      "label": "QUERY-OFF-END (query-name)",
      "documentation": "Returns a LOGICAL value indicating whether the specified query is positioned at the end of its result list (either before the first record or after the last record). query-name A character expression that evaluates to the name of a currently",
      "parameters": [
        "query-name"
      ]
    }
  ],
  "search": [
    {
      "label": "SEARCH (opsys-file)",
      "documentation": "Searches the directories and libraries defined in the PROPATH environment variable for a file. The SEARCH function returns the full pathname of the file unless it is found in your current working directory. If SEARCH does not find the file,",
      "parameters": [
        "opsys-file"
      ]
    }
  ],
  "sqrt": [
    {
      "label": "SQRT (expression)",
      "documentation": "Returns the square root (as a DECIMAL value) of an expression you specify. expression A numeric expression. If the value of the expression is negative, SQRT returns the Unknown value ( ? ). This procedure prompts for a number and",
      "parameters": [
        "expression"
      ]
    }
  ],
  "setuserid": [
    {
      "label": "SETUSERID (userid, password [, logical-dbname])",
      "documentation": "Authenticates a user identity for a specified database connection, verifying that the user ID and password supplied to the SETUSERID function match a user account in the _User table of the database. (This restriction does not apply to authentication with",
      "parameters": [
        "userid",
        "password",
        "logical-dbname"
      ]
    }
  ],
  "time": [
    {
      "label": "TIME",
      "documentation": "Returns an INTEGER value representing the time as the number of seconds since midnight. Use this function together with the STRING function to produce the time in hours, minutes, and seconds. In r-time.p , the timeleft variable is set to",
      "parameters": []
    }
  ]
};
