DEFINE VARIABLE cName AS CHARACTER NO-UNDO.
DEFINE VARIABLE lin-tp-in AS INTEGER NO-UNDO.
DEFINE VARIABLE t-title AS CHARACTER NO-UNDO.

{examples/ar/fmsg.i}

RUN examples/po/item-price-p.p.

DEFINE TEMP-TABLE ttCustomer NO-UNDO
    FIELD CustNum AS INTEGER
    FIELD Customer-Name AS CHARACTER
    FIELD Balance-Amount AS DECIMAL.

def temp-table tt-coa2
        field coa-code   like coa-mst.coa-code
        FIELD amount   AS DECIMAL
        FIELD ppn      AS decimal.

ASSIGN cName = "OpenEdge ABL".
ASSIGN lin-tp-in = 10 - 2.
ASSIGN t-title = "Title keyword should not highlight inside variable name.".
ASSIGN ttCustomer.
ASSIGN tt-coa2.

MESSAGE "Line pertama~
Line kedua"
    VIEW-AS ALERT-BOX INFO.

{lib/lock-rec.i
               &db=symix.
               &file=prqitem-d
               &where="where prqitem-d.req-num = preqitem.req-num 
                        and prqitem-d.req-line = preqitem.req-line"
               &abort="next PROG."
               &not-avail="next PROG."
               }

FOR EACH Customer NO-LOCK:
    DISPLAY Customer.Name.
    DISPLAY Customer.Balance-Amount.
END.

ASSIGN Customer.

Loop:
REPEAT:
    LEAVE Loop.
END.

IF cName <> "" THEN DO:
    MESSAGE cName VIEW-AS ALERT-BOX INFO.
END.
ELSE DO:
    MESSAGE "Empty name" VIEW-AS ALERT-BOX INFO.
END.

IF SELECTION = "ADD" THEN DO WITH FRAME layout:
    MESSAGE "Add mode" VIEW-AS ALERT-BOX INFO.
END.

IF AVAILABLE Customer THEN
    DISPLAY Customer.Name.
ELSE
    MESSAGE "Customer not available" VIEW-AS ALERT-BOX INFO.

IF index-collection > 1 THEN
    UP 1.
ELSE UP FRAME-DOWN - 1.

IF cName <> "" THEN
DO:
    MESSAGE cName VIEW-AS ALERT-BOX INFO.
END.
ELSE
DO:
    MESSAGE "Empty name" VIEW-AS ALERT-BOX INFO.
END.

IF sp_sjd.qty_rec - sp_sjd.qty_returned < INPUT FRAME f-body lin-qty THEN
    {ar/fmsg.i "'Quantity Received >  Quantity Surat Jalan ' + string(sp_sjd.qty_rec - sp_sjd.qty_returned)"
        "undo, retry."}
END.

ASSIGN lpb-linex.lpb-num = lpb-num-view
    lpb-linex.lpb-seq = lin-line
    lpb-linex.item = lch-item
    lpb-linex.u-m = lch-u-m
    lpb-linex.po-num = po-num-v
    lpb-linex.po-line = po-line-v
    lpb-linex.po-release = IF index(lpb-num-view,"I") <> 0 THEN 1 ELSE 0
    lpb-linex.loc = lch-loc
    lpb-linex.lot = lch-lot
    lpb-linex.qty-received = lin-qty
    lpb-linex.qty-received-conv =
    {lib/round.i "lin-qty * t-cf-to-base"
        parms.u-m-round-factor}.
    ldc-qty-rec = ldc-qty-rec + INPUT lin-qty.
