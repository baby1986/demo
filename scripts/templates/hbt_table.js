define(function(require,exports,module){
    var control= require("../base/hbb-control");
    var droppable=require("../base/hbb-droppable");
    var resizable=require("../base/hbb-resizble");
    var argumentNullError=require("../exceptions/hbe-argumentNullException");
    var argumentError=require("../exceptions/hbe-argumentException");
    var typeError=require("../exceptions/hbe-typeError");

    var tableOP = function () {
        var base=this.base(control,"hbt-table");
        var resizable=this.base(resizable,true);
    };

    tableOP.prototype.setSelected=setSelected;
    tableOP.prototype.setSelected=setSelected;
    tableOP.prototype.clearSelected=clearSelected;
    tableOP.prototype.cancelSelect=cancelSelect;
    tableOP.prototype.getCellsOfRow=getCellsOfRow;
    tableOP.prototype.getCellSize = getCellSize;
    tableOP.prototype.getCellEx = getCellEx;
    tableOP.prototype.getCell = getCell;
    tableOP.prototype.getCellOfTrueIndex = getCellOfTrueIndex;
    tableOP.prototype.getCellAfterTrueIndex =getCellAfterTrueIndex ;
    tableOP.prototype.getRowHeight = getRowHeight;
    tableOP.prototype.getCellsBetweenTrueIndex = getCellsBetweenTrueIndex;
    tableOP.prototype.insertRow=insertRow;
    tableOP.prototype.deleteRow = deleteRow;
    tableOP.prototype.insertCol=insertCol;
    tableOP.prototype.deleteCol = deleteCol;
    tableOP.prototype.merger=merger;
    tableOP.prototype.split=split;
    tableOP.prototype.splitEx =splitEx;
    tableOP.prototype.create=create;
    tableOP.prototype.renderTo=renderTo;
    tableOP.prototype.bindTo=bindTo;
    tableOP.prototype.resize=resize;
    tableOp.prototype.getCellsBetween = getCellsBetween;

    function firstCell(row, pos) {
        if (!row || !row.cells.length || typeof (pos) != "object") {
            return;
        }
    
        pos.index = 0;
        return row.cells[0];
    }

    function curCell(row, pos) {
        if (!row) {
            return;
        }
        return row.cells[pos.index];
    }

    function nextCell(row, pos) {
        if (!row || typeof (pos) != "object" || pos.index === undefined) {
            return;
        }
        var col = row.cells[pos.index];
        if (!col) {
            return;
        }

        pos.index++;
        return row.cells[pos.index];
    }

    function getNextPos(row, pos) {  

        if (!row || typeof (pos) != "object") {
            return;
        }
        if (row.cells.length === 0) {
            return 0;
        }

        var nextTrueIndex = 0;
        if (pos.index === undefined) {
            pos.index = 0;
        }

        var coli = curCell(row, pos);
        if (coli.rowIndex == row.index) {
            nextTrueIndex = coli.trueIndex + coli.colSpan;
            coli = nextCell(row, pos);
        }

        while (coli) {
            if (coli.trueIndex > nextTrueIndex) {
                return pos.index;
            }
            nextTrueIndex = coli.trueIndex + coli.colSpan;
            coli = nextCell(row, pos);
        }
        pos.index = row.cells.length;

        return row.cells.length;
    }

    function pushCell(row, pos, index, rowspan, colspan) {

        if (!pos || pos.index === undefined) {
            pos = {};
            pos.index = 0;
        }

        var result;

        var curindex = getNextPos(row, pos);

        if (curindex === 0) {
            result = { rowIndex: row.index, cellIndex: index, trueIndex: 0, rowSpan: rowspan, colSpan: colspan };
            row.cells = [result].concat(row.cells);
            row.trueIndexs = [];
            row.trueIndexs[0] = 0;
        }
        else {
            var precol = row.cells[pos.index - 1];
            if (curindex == row.cells.length) {
                result = { rowIndex: row.index, cellIndex: index, trueIndex: precol.trueIndex + precol.colSpan, rowSpan: rowspan, colSpan: colspan }; //colspan==precol.colspan   + precol.colSpan
                row.cells.push(result);
                row.trueIndexs.length = index;
                row.trueIndexs[index] = row.cells.length - 1;
            }
            else if (curindex < row.cells.length) {
                var cells2 = row.cells.slice(pos.index);
                row.cells.length = pos.index;
                result = { rowIndex: row.index, cellIndex: index, trueIndex: precol.trueIndex + precol.colSpan, rowSpan: rowspan, colSpan: colspan }; //+ precol.colSpan
                row.cells.push(result);
                row.trueIndexs.push(row.cells.length - 1);
                row.cells = [].concat(row.cells, cells2);
            }
        }
        return result;
    }

    //由于脏涉及到无线向上追溯的问题，所有直接设置属性就可以了
    //type ["all","rowindex"]
    function setDirty(tableElement/*,rowIndex,rowCount*/){
        tableElement=getTableElement(tableElement);
        if(!tableElement) return;
        $(tableElement).data("dirty","all");
/*            rowIndex=option.rowIndex||0;
        rowCount=rowCount||-1;
        var type=rowIndex===0&&(rowCount===-1||rowCount===tableElement.rows.length)?"all":"part";
        if(type==="all"){
            refreshDataAsync(tableElement);
            $(tableElement).data("dirty","all");
            return;
        }

        var dirty=$(tableElement).data("dirty")||[];
        if(dirty==="all") {refreshDataAsync(tableElement);return;}
        dirty.push({rowIndex:rowIndex,rowCount:rowCount});
        refreshDataAsync(tableElement);*/
    }

    function getDirty(tableElement){
        tableElement=getTableElement(tableElement);
        if(!tableElement) return;
        return $(tableElement).data("dirty")==="all";
/*            var dirty=$(tableElement).data("dirty")||[];
        if(dirty==="all") return [{rowIndex:0,rowCount:tableElement.rows.length}];
        if(!dirty.length) return;
        //tidy
        var tydied=[];
        var rowLength=tableElement.rows.length;
        dirty=_.groupBy(dirty,"rowIndex");
        _each(dirty,function(ends,rowIndex){
            var end=_.reduce(ends,function(countj,counti){
                if(countj==-1||counti==-1) return rowLength-rowIndex;
                return Math.max(countj,counti);
            });
            tydied.push({rowIndex:rowIndex,rowCount:end});
        });
        return tydied;*/
    }

    function refreshDataAsync(tableElement) {
        _.defer(_.bind(this,function(){getData(tableElement);}));
    }

    function refreshData(tableElement/*,index,loop*/) {
        tableElement=getTableElement(tableElement);
        if(!tableElement) return;
        var tableinfo=$table.data("hbd-tableinfo");
        var dirty=getDirty(tableElement);

        if(tableinfo&&(!dirty)) return;

        var tableObject={rows:[]};
        var index=0,loop = tableElement.rows.length - index;
        tableObject.rows.length = loop + index;

        while (loop) {

            var rowElementi = tableElement.rows[index];
            var rowObjecti = tableObject.rows[index];

            if (rowObjecti === undefined) {
                rowObjecti = { index: index };
                tableObject.rows[index] = rowObjecti;
            }

            rowObjecti.index = index;
            rowObjecti.cells = [];
            rowObjecti.trueIndexs = [];
            rowObjecti.cellLength = 0;
            if (index > 0) {
                var rowpre = tableObject.rows[index - 1];
                var coljpre = firstCell(rowpre);
                while (coljpre) {
                    if (coljpre.rowIndex + coljpre.rowSpan - 1 >= index) {
                        rowObjecti.cells.push(coljpre);
                        loop = Math.max(loop, coljpre.rowIndex + coljpre.rowSpan - index);
                    }
                    coljpre = nextCell(rowpre);
                }
            }
            var pos2 = { index: 0 };
            for (var j = 0, icolobjlen = rowElementi.cells.length; j < icolobjlen; j++) {
                var coljobj = rowElementi.cells[j];
                var cell = pushCell(rowObjecti, pos2, j, coljobj.rowSpan || 1, coljobj.colSpan || 1);
                loop = Math.max(cell.rowSpan - 1, loop);
            }

            //维护行号
            /*
            var cell0 = rowObjecti.cells[0];
            if (cell0.parentNode.rowIndex == index) {
                if (index + 1 != tableObjectElement.rows.length && rowElementi.cells[0].clientHeight >= 8) {//cell0.clientHeight
                    rowElementi.cells[0].innerHTML = index + 1 + "";
                }
            }
            */

            index++;
            loop--;
        }
    }

    function cellElementsValidate(tableElement,cellElements) {
        if (!cellElements || !cellElements.length) {
            return;
        }
        var tableObject=getTableObject(tableElement);
        tableElement=tableObject.element;

        var result = {};
        result.rowLength = 0;
        result.cellLength = 0;
        result.block = true;
        result.rows = [];
        result.table = tableElement;
        var sign = [];
        var rowLength = tableElement.rows.length;
        //rowSpan会根据实际数据给出，colSpan给出的数据不准确，但依然可以用
        //当rowspan2遇到colspan2时他们重叠了
        for (var i = 0; i < cellElements.length; i++) {
            var cellElementi = cellElements[i];
            var cellObjecti=getCell(tableObject,null,cellElementi);
            var celliRowIndex=cellObjecti.rowIndex;
            if (cellObjecti.cellIndex < 2 ||  celliRowIndex+ 1 == rowLength) {
                continue;
            }
            var rowObjecti = tableObject.rows[celliRowIndex];
            var rowElementi=tableElement.rows[celliRowIndex];
            if (sign[celliRowIndex] === undefined) {
                result.rows.push({ cells: [cellObjecti], rowIndex: celliRowIndex, cellLenght: 1 });
                sign[celliRowIndex] = result.rows.length - 1;
            }
            else {
                result.rows[sign[celliRowIndex]].cells.push(cellObjecti);
                result.rows[sign[celliRowIndex]].cellLenght++;
            }
            //试探行
            for (var j = 1; j < (cellObjecti.rowSpan || 1) ; j++) {
                if (sign[celliRowIndex + j] === undefined) {
                    result.rows.push({ cells: [cellObjecti], rowIndex: celliRowIndex + j, cellLenght: 0 });
                    sign[celliRowIndex + j] = result.rows.length - 1;
                }
                else {
                    result.rows[sign[celliRowIndex + j]].cells.push(cellObjecti);
                }
            }
        }
        sign = null;
        result.rows=_.sortBy(_.toArray(result.rows),function (item) { return item.rowIndex; });

        var lastRowIndex = result.rows[0].rowIndex - 1, lastCellSpan = -1, firstCellTrueIndex = -1, nextTrueIndex = -1;
        result.rowLength = result.rows.length;
        for (var k = 0; k < result.rowLength; k++) {
            var rowObjectk = result.rows[k];
            if (lastRowIndex + 1 != rowObjectk.rowIndex) {
                result.block = false;
            }
            rowObjectk.cells=_.sortBy(_.toArray(rowObjectk.cells),function (item) { return item.trueIndex; });
            var totle = 0;
            var lastcellIndex = -1;
            for (var l = 0; l < rowObjectk.cells.length; l++) {
                var cellk = rowObjectk.cells[l];
                if (firstCellTrueIndex == -1) {
                    firstCellTrueIndex = cellk.trueIndex;
                }
                if (l === 0) {
                    if (firstCellTrueIndex != cellk.trueIndex) {
                        result.block = false;
                    }
                }
                else if (nextTrueIndex != cellk.trueIndex) {
                    result.block = false;
                }
                nextTrueIndex = cellk.trueIndex + cellk.colSpan;
                totle += cellk.colSpan;
            }
            if (lastCellSpan == -1) {
                lastCellSpan = totle;
            }
            if (lastCellSpan != totle) {
                result.block = false;
            }
            lastRowIndex = rowObjectk.rowIndex;
            lastCellSpan = totle;
        }
        result.cellLength = lastCellSpan;
        return result;
    }

    //处理最后一行如果会合并的问题
    function mergerLastRow(tableElement,rowIndex,cellIndex) {
        var cellObject=getCell(tableElement,rowIndex,cellIndex);
        if(!cellObject) return;
        var tableObject=cellObject.tableObject;
        tableElement=tableObject.element;
        rowIndex=cellObject.rowIndex;cellIndex=cellObject.cellIndex;

        var trueIndex = cellObject.trueIndex;
        var allRowElements = tableElement.rows;
        var mergerRect = [{ trueIndex: trueIndex, colSpan: cellObject.colSpan }];
        
        for (var i = 0;i + 1 < allRowElements.length; i++) {
            var rowElementi = allRowElements[i];
            var rowMergerRect = [];
            for (var j = 0; j < mergerRect.length; j++) {
                var rectj = mergerRect[j];
                var cols = getCellsBetweenTrueIndex(tableObject,i, rectj.trueIndex, rectj.trueIndex + rectj.colSpan - 1); //当前行里找，合并其他行时已经处理

                for (var k = 0; k < cols.length; k++) {
                    var colk = cols[k];
                    var firstmergerindex = Math.max(rectj.trueIndex, colk.trueIndex);
                    var colspan = Math.min(rectj.trueIndex + rectj.colSpan, colk.trueIndex + colk.colSpan) - firstmergerindex;
                    if (colspan > 1) {
                        rowMergerRect.push({ trueIndex: firstmergerindex, colSpan: colspan });
                    }
                }
            }
            mergerRect = rowmergerRect;
            if (!rowMergerRect.length) {
                return;
            }
        }
        //alert(mergerRect.length);
        for (var m=allRowElements.length - 2; m >= 0; m--) {
            var rowi = allRowElements[i];
            for (var n = mergerRect.length - 1; n >= 0; n--) {
                var rectn = mergerRect[n];
                var td = getCellOfTrueIndex(rowi, rectn.trueIndex);
                if (td.rowIndex != m) {
                    continue;
                }
                var tdobj = tableElement.rows[td.rowIndex].cells[td.index];
                tdobj.colSpan -= rectn.colSpan - 1;
            }
        }
        //处理最后一行
        var lastrow = _.last(tableElement.rows, -1);
        for (var p=mergerRect.length - 1;p >= 0; p--) {
            var rectp = mergerRect[p];
            var widthrelease = 0;
            for (var q = rectp.colSpan - 1; q > 0; q--) {
                widthrelease += parseInt(lastrow.cells[rectp.trueIndex + q].style.width.replace("px", ""));
                lastrow.deleteCell(rectp.trueIndex + q);
            }
            var celladd = lastrow.cells[rectp.trueIndex];
            celladd.style.width = parseInt(celladd.style.width) + widthrelease;
        }

        setDirty(tableObject/*,lastrow.rowIndex,1*/);
    }

    function getTableElement(tableElement){
        if(_.isObject(tableElement)&&tableElement.element) return tableElement.element;
        if(!_.isElement(tableElement)){
            return;
        }
        while("TRTDTBODYTHEAD".indexOf(tableElement.nodeName.toUpperCase()>-1)){
            tableElement=tableElement.parentNode;
        }
        if(tableElement.nodeName.toUpperCase()==="TABLE"&&tableElement.className.indexOf(getClass())>-1){
            return tableElement;
        }
        return;
    }

    function getData(tableElement){
        //处理脏数据
        if(_.isObject(tableElement)&&tableElement.element){
            return refreshData(tableElement);
        }
        else if((tableElement=getTableElement(tableElement))){
            var $table=$(tableElement);
            var tableinfo=refreshData(tableElement);
            tableinfo.element=tableElement;
            return tableinfo;
        }
    }

    function getRowElement(tableElement,rowIndex,valid){
        if(arguments.length===1&&_.isElement(tableElement)&&tableElement.nodeName.toUpperCase()==="TR"){
            if(valid)valid.count=1;
            return rowIndex;
        }
        if(!_.isNumber(rowIndex)) return;
        tableElement=getTableElement(tableElement);
        if(!tableElement) return;
        if(valid)valid.count=2;
        return tableElement.rows[rowIndex];
    }

    function getCellElement(tableElement,rowIndex,cellIndex,valid){
        if(arguments.length===1&&_.isElement(tableElement)&&tableElement.nodeName.toUpperCase()==="TD"){
            if(valid)valid.count=1;
            return cellIndex;
        }
        else if(arguments.length==2&&_.isElement(tableElement)&&tableElement.nodeName.toUpperCase()==="TR"&&_.isNumber(rowIndex)){
            if(valid)valid.count=2;
            return tableElement.cells[rowIndex];
        }
        var rowElement=getRowElement(tableElement,rowIndex);
        if(!_.isNumber(cellIndex)||!rowElement) return;
        if(valid)valid.count=3;
        return rowElement.cells[cellIndex];
    }

    function getLastRow(tableElement){
        return _.last(tableElement.rows);
    }

    //resizeHeight,resizewidth是改变量
    //兼容旧格式rowindex为行数
    //为obj时为制定列需要有调整和配合resizewidth完成制定单元格的调整{rowindex:3,cellIndex:3}
    function resizeCtl(tableElement,rowIndex,resizeHeight,resizewidth) {

        var tableObject=getData(tableElement);
        tableElement=tableObject.element;

        var cellmodify = {},fires = [],type,cellIndex;
        if (_.isObject(rowIndex)) {
            cellmodify = rowIndex;
            rowIndex = cellmodify.rowIndex;
            cellIndex = cellmodify.cellIndex;
            type = cellmodify.type;
        }

        if (typeof (rowIndex) != "number" || tableElement.rows.length <= rowIndex || rowIndex < 0) {
            return;
        }

        if (cellIndex === undefined) {

            var rowObjct = tableObject.rows[rowIndex];
            for (var i = rowObjct.cells.length - 1; i >= 2; i--) {
                var cellObjecti = rowObjct.cells[i];
                var cellElement = tableElement.rows[cellObjecti.rowIndex].cells[cellObjecti.cellIndex];
                fires.push({
                    type: "resize",
                    target: cellElement.firstChild,
                    regclass: null,
                    container: cellElement,
                    clientHeight: getCellSize(tableObject,rowIndex,cellElement).height + (resizeHeight || 0),//cellElement.clientHeight + (resizeHeight || 0)
                });
            }
        }
        else if (typeof (cellIndex) == "number") {
            //单元格调整的
            if (tableElement.rows[rowIndex].cells.length <= cellIndex) {
                return;
            }

            if (type === "cell") {
                var cellElementx = tableElement.rows[rowIndex].cells[cellIndex];
                var size = getCellSize(tableObject,rowIndex,cellElementx);
                fires.push({
                    type: "resize",
                    target: cellElementx.firstChild,
                    regclass: null,
                    container: cellElementx,
                    clientHeight: size.height + (resizeHeight || 0),// cellElementx.clientHeight + (resizeHeight || 0),
                    clientWidth: size.width + (resizewidth || 0) //cellElementx.clientWidth + (resizewidth || 0)
                });
            }
            else if (type == "col") {
                //列调整的暂时不提供，考虑到插入行列的情况会比较复杂，需要再做设计，而且现有控件不涉及到宽度的调整
            }
        }

        for (var k = fires.length - 1; k >= 0; k--) {
            //base.fireEvent(fires[k]);
            var fi = fires[k];
            $(fi.container).triggerHandler(fi.type, fi);//不冒泡
        }
    }

    function getCellsOfRow(tableElement,rowIndex,valid){

        var rowElement=getRowElement(tableElement,rowIndex,valid);
        if(!rowElement) return;
        rowIndex=rowElement.rowIndex;

        var tableObject=getData(tableElement);
        tableElement=tableObject.element;

        var result=[];
        _.each(tableObject.rows[rowIndex].cells,function(elem,index){
            var tdElement=tableElement.rows[elem.rowIndex].cells[elem.cellIndex];
            result.push({
                td:tdElement,
                rowIndex:elem.rowIndex,
                cellIndex:elem.cellIndex,
                trueIndex:elem.trueIndex,
                rowSpan:elem.rowSpan,
                colSpan:elem.colSpan,
                tableObject:tableObject,
                inTable:true
            });
        });
        return result;
    }

    function getCellSize(tableElement,rowIndex,cellIndex) {
        var cellObject = getCell(tableElement,rowIndex, cellIndex);
        if(!cellObject) return;
        tableElement=cellObject.tableObject.element;
        rowIndex=cellObject.rowIndex;cellIndex=cellObject=cellIndex;

        var tdheight = 0, tdwidth = 0;
        for (var i = 0; i < cellObject.rowSpan; i++) {
            var rowi = tableElement.rows[rowIndex + i];
            tdheight += (rowi.cells[0].offsetHeight || (rowi.cells[0].style.height.toString().replace("px", "") - 0));
        }
        var rowlast = _.last(tableElement.rows);
        for (var j = 0; j < cellObject.colSpan; j++) {
            var cellx = rowlast.cells[cellObject.trueIndex + j];
            tdwidth += (cellx.offsetWidth || (cellx.style.width.toString().replace("px", "") - 0));
        }
        return ({
            width: tdwidth,
            height: tdheight
        });
    }

    function getCellEx(tableElement,rowIndex, cellIndex,valid) {
        var cellObject = getCell(tableElement,rowIndex, cellIndex,valid);
        rowIndex=cellObject.rowIndex;cellIndex=cellObject.cellIndex;
        tableElement=cellObject.tableObject.element;
        if (!cellObject) return;
        return $.extend(tdobj, getCellSize(cellObject.tableObject,rowIndex, cellObject));
    }

    function getCell(tableElement,rowIndex,cellIndex,valid) {

        var cellElement=getCellElement(tableElement,rowIndex,cellIndex,valid);
        if(!cellElement) return;

        var tableObject=getData(tableElement);
        tableElement=tableObject.element;

        return {
            element:cellElement,
            rowIndex:rowIndex,
            cellIndex:cellIndex,
            trueIndex:tableObject.rows[rowIndex].trueIndexs[cellIndex],
            rowSpan:tdElement.rowSpan||1,
            colSpan:tdElement.colSpan||1,
            tableObject:tableObject,
            inTable:true
        };
    }

    function getCellOfTrueIndex(tableElement,rowIndex,trueIndex) {
        var cellObjects=getCellsOfRow(tableElement,rowIndex);
        if(!cellObjects){
            return;
        }

        trueIndex=_.last(arguments);

        return _.find(cellObjects,function(elem,index){
            if(index+elem.colSpan-1>=trueIndex){
                return;
            }
            return elem;
        });
    }

    function getCellAfterTrueIndex(tableElement,rowindex,trueIndex) {

        var cellObjects=getCellsOfRow(tableElement,rowIndex);
        rowIndex=cellObject.rowIndex;

        trueIndex=_.last(arguments);

        var _case=false;
        return _.find(cellObjects,function(elem,index){
            if(_case&&rowIndex==elem.rowIndex) {
                return elem;
            }
            else if(!_case&&index+elem.colSpan-1>=trueIndex){
                _case=true;
            }
        });
    }

    function getRowHeight(tableElement,rowIndex,border) {
        var rowElement=getRowElement(tableElement,rowIndex);
        if(!rowElement) throw new typeError("[TableObject,rowIndex] or TableRowObject",rowIndex);

        var cell1 = rowElement.cells[1];
        var result = defaultTDHeight + (border ? 1 : 0);
        if (cell1) {
            var innerheight = (cell1.style.height || (defaultTDHeight + "")).replace("px", "") - 0;
            var outerheight = (cell1.style.borderTopWidth || "1").replace("px", "") - 0;
            result = border ? (innerheight + outerheight) : innerheight;
        }
        return result;
    }

    function getCellsBetweenTrueIndex(tableElement,rowIndex, trueIndex, trueIndex2, currow) {

        if (trueIndex < 0 || trueIndex2 < 0) return;

        var tableObject=getData(tableElement||rowIndex);
        if(!tableObject) return;
        tableElement=tableObject.element;
        var rowElement=getRowElement(tableElement,rowIndex);
        if(!rowElement) return;
        rowIndex=rowElement.rowIndex;

        if(trueIndex>trueIndex2){
            var temp = trueIndex;trueIndex=trueIndex2;trueIndex2=temp;
        }

        var pos = {};
        var result = [];


        var tdObject=getCellOfTrueIndex(tableElement,rowElement,trueIndex);
        var td2Object=getCellOfTrueIndex(tableElement,rowElement,trueIndex2);

        _.each(tableObject.rows[rowIndex].cells.slice(tdObject.position,tdObject.position+1),function(elem,index){
            var tdElement=tableElement.rows[elem.rowIndex].cells[elem.cellIndex];
            result.push({
                td:tdElement,
                rowIndex:elem.rowIndex,
                cellIndex:elem.cellIndex,
                trueIndex:trueIndex,
                rowSpan:tdElement.rowSpan,
                colSpan:tdElement.colSpan,
                tableObject:tableObject,
                inTable:true,
                position:index
            });
        });
        return result;
    }

    //向前插的模式,length为appendrow,如果count>1则返回的是最后一个添加的对象
    function insertRow(tableElement,rowIndex,count,pre) {
        var valid={};
        var rowElement = getRowElement(tableElement,rowIndex,valid);
        if(!rowElement) throw new typeError("","[tableElement,rowIndex] or tableRowElement",tableElement,rowIndex);
        rowIndex=rowElement.rowIndex;

        var tableObject=getData(tableElement);
        tableElement=tableObject.element;

        //last-row
        if(__DEV__&&rowIndex + 1 == tableElement.rows.length){
            console.error("last row did't work!");
            return;
        }

        var cellObjects=getcellObjectsOfRow(tableObject,rowElement);

        if(arguments.length>valid.count+2){
            pre=!!_.getAt(arguments,valid.count+2);
            count=_.getAt(argumentsvalid.count+1);
        }
        else if(arguments.length>valid.count){
            count=_.getAt(arguments,valid.count+1);
        }
        pre=pre||true;count=count||1;

        var firstIndex=Number.MAX_VALUE,lastIndex=0;

        if (!pre) rowIndex++;
        var _case=true;
        while(count--){
            var newRowElement=tableElement.insertRow(rowIndex);
            var newCell=newRowElement.insertCell(0);
            newCell.className = "hbt-cell0";
            newCell=newRowElement.insertCell(1);
            newCell.className = "hbt-cell1";
            newCell.style.height = defaultTDHeight + "px";
            for(var i=2,pos=2;i<cellObjects.length;i++){
                var cellObjecti=cellObjects[i];
                firstIndex=Math.min(firstIndex,cellObjecti.rowIndex);
                lastIndex=Math.max(lastIndex,cellObjecti.rowIndex+cellObjecti.rowSpan-1);
                if(cellObjecti.rowIndex==rowIndex&&(pre || cellObjecti.rowSpan == 1)){
                    newcell = newRowElement.insertCell(pos++);
                    newcell.rowSpan = 1;
                    newcell.colSpan = cellj.colSpan;
                    newcell.className = "hbt-cell hbt-packeded";
                }
                else if(_case){
                    _case=false;
                    cellObjecti.element.rowSpan+=count+1;
                }
            }
        }

        setDirty(tableObject/*,rowIndex*/);

        resizeCtl(tableObject,rowIndex);

        return true;
    }

    function deleteRow(tableElement,rowIndex,count) {
        var valid={};

        var rowElement =getRowElement(tableElement,rowIndex,valid);
        if(!rowElement) throw new typeError("","[tableElement,rowIndex] or tableRowElement",tableElement,rowIndex);
        rowIndex=rowElement.rowIndex;

        var tableObject=getData(tableElement);
        tableElement=tableObject.element;
        
        //last-row
        if(__DEV__&&rowIndex + 1 == tableElement.rows.length){
            console.error("last row did't work!");
            return;
        }

        if(arguments.length>valid.count){
            count=_.getAt(argumentsvalid.count+1);
        }

        count=count||1;
        //save last-row
        count=Math.min(tableElement.rows.length-rowIndex-1,count);

        rowElement=tableElement.rows[rowIndex+count];
        var cells=getCellsOfRow(tableObject,rowElement);

        var cellLast=null;
        var downOverFlow=false;
        var upOverFlow=false;
        //down-overflow
        for(var j=cells.length-1;j>=0;j--){
            var cellj=cells[j];
            if(cellj.rowIndex<rowIndex)continue;
            cellsreverse=cellj.element;
            if(cellj.rowSpan==1) continue;
            downOverFlow=true;
            cellj.element.rowSpan=off;
            if(!cellLast){
                rowElement.appendChild(cellj.element);
            }
            else{
                rowElement.insertBefore(cellj.element,cellLast);
            }
        }

        rowElement=tableElement.rows[rowIndex];
        cells=getCellsOfRow(tableElement,rowElement);
        var k=1;
        do{
            for(var i=cells.length-1;i>=0;i--){
                var celli=cells[i];if(celli.element)celli=celli.element;
                var celliRowIndex=celli.parentNode.rowIndex;
                var rowSpan=celli.rowSpan;
                
                if(celliRowIndex<rowIndex){
                    upOverFlow=true;
                    var delCount=Math.min(rowSpan-(rowIndex-celliRowIndex),count);
                    celli.rowSpan-=delCount;
                    continue;
                }
                rowElement.deleteCell(celli.cellIndex);
            }
            rowElement=tableElement.rows[rowIndex+k];
            cells=getCellsOfRow(tableObject,rowElement);
        }while(k<count);

        setDirty(tableObject/*,rowIndex*/);
        if(upOverFlow)resizeCtl(tableObject,rowindex);
        if(downOverFlow)resizeCtl(tableObject,rowindex+1);
        return true;
    }

    function insertCol(tableElement,rowIndex,cellIndex, count, pre) {
        var valid={};
        var cellObject=getCell(tableElement,rowIndex,cellIndex,valid);
        if(!cellObject) throw new typeError("","[tableElement,rowIndex,cellIndex] or [tableRowElement,cellIndex] or tableCellElement",tableElement,rowIndex,cellIndex);
        rowIndex=cellObject.rowIndex;cellIndex=cellObject.cellIndex;
        //less then 2
        if(__DEV__&&cellIndex<2) {
            console.error("first cell and seconde cell did't work");
            return;
        }
        var tableObject=cellObject.tableObject;
        tableElement=tableObject.element;

        if(arguments.length>valid.count+2){
            pre=!!_.getAt(arguments,valid.count+2);
            count=_.getAt(argumentsvalid.count+1);
        }
        else if(arguments.length>valid.count){
            count=_.getAt(arguments,valid.count+1);
        }
        pre=pre||true;count=count||1;

        var trueIndex=cellObject.trueIndex;
        if (!pre) trueIndex += cellObject.colSpan - 1;//如果选中的是个合并的格子，这个很有帮助

        for (var i = 0, rowlen = tableObject.rows.length; i < rowlen;) {
            var rowObjecti = tableObject.rows[i];
            var rowElementi = tableElement.rows[i];
            var cellObjecti = getCellOfTrueIndex(tableObject,rowElementi, trueIndex);
            //最后一行
            var widthrelease = 0;
            var widthreleasepremode = 0;
            var widthreleasepre = 0;
            if (i + 1 == rowlen) {
                var oldlen = rowElementi.cells.length - 2;
                var newlen = oldlen + count;
                for (var k = 2, celllen = rowElementi.cells.length; k < celllen; k++) {
                    var celli = rowElementi.cells[k];
                    var old = ((celli.style.width || celli.offsetWidth) + "").replace("px", "");
                    var newx = parseInt(old * oldlen / newlen, 10) || 0;
                    widthrelease += old - newx;
                    celli.style.width = newx + "px";
                }

                widthreleasepremode = (widthrelease) % count;
                widthreleasepre = (widthrelease) / count;
            }

            if (cellObjecti.rowIndex == rowObjecti.rowIndex && cellObjecti.colSpan == 1) {
                for (var j = 0; j < count; j++) {
                    var newCellElement;
                    if (!pre) {
                        newCellElement = rowElementi.insertCell(cellObjecti.cellIndex + 1);
                    }
                    else {
                        newCellElement = rowElementi.insertCell(cellObjecti.cellIndex);
                    }
                    if (i + 1 == rowlen) {
                        newCellElement.style.width = (parseInt(widthreleasepre, 10)) + (widthreleasepremode > 0 ? 1 : (widthreleasepremode + 0.5)) + "px";
                        widthreleasepremode--;
                        newCellElement.className = "hbt-row-last";
                        newCellElement.style.height = "0px";
                    }
                    else {
                        // newCellElement.innerHTML = "&nbsp;";
                        newCellElement.rowSpan = cellObjecti.rowSpan;
                        newCellElement.className = "hbt-cell hbt-packed";
                    }
                }
            }
            else {
                rowElementi.cells[cellObjecti.cellIndex].colSpan = cellObjecti.colSpan + count;
            }

            i += cellObjecti.rowSpan;
        }

        setDirty(tableObject);
        //做比例控制

        return;
    }

    function deleteCol(tableElement,rowIndex,cellIndex) {

        var cellObject=getCell(tableElement,rowIndex,cellIndex);
        if(!cellObject) throw new typeError("","[tableElement,rowIndex,cellIndex] or [tableRowElement,cellIndex] or tableCellElement",tableElement,rowIndex,cellIndex);
        rowIndex=cellObject.rowIndex;cellIndex=cellObject.cellIndex;
        //less then 2
        if(__DEV__&&cellIndex<2) {
            console.error("first cell and seconde cell did't work");
            return;
        }
        var tableObject=cellObject.tableObject;
        tableElement=tableObject.element;

        var trueIndex=cellObject.trueIndex;

        //no more column
        if (trueIndex == 2 && tableElement.cells.length == 3) {
            return false;
        }
        var trueIndex2 = trueIndex + cellObject.colSpan - 1;
        var deleteSpan = cellObject.colSpan;


        var deletePX = 0;
        for (var rowLength = tableObject.rows.length, i = rowLength - 1; i >= 0; i--) {
            var rowObjecti = tableObject.rows[i];
            var rowElementi = tableElement.rows[i];

            var cellObjects = getCellsBetweenTrueIndex(tableObject,rowObjecti, trueIndex, trueIndex2, true); //注意这里的true
            if (i == rowLength - 1) {
                for (var z = 0; z < cellObjects.length; z++) {
                    var cellz = rowElementi.cells[cellObjects[z].cellIndex];
                    deletePX += ((cellz.style.width || cellz.offsetWidth) + "").replace("px", "") - 0;
                }
            }
            if (cellObjects.length === 0) {
                continue;
            }
            if (cellObjects.length == 1) {
                if (cellObjects[0].trueIndex >= trueIndex && cellObjects[0].colSpan <= objcol.colSpan) {
                    //需要移除colofindex
                    rowElementi.deleteCell(cellObjects[0].cellIndex);
                }
                else if (cellObjects[0].trueIndex < trueIndex && cellObjects[0].trueIndex + cellObjects[0].colSpan - 1 > trueIndex2) {
                    rowElementi.cells[cellObjects[0].cellIndex].colSpan = cellObjects[0].colSpan - deleteSpan;
                }
                else if (cellObjects[0].trueIndex < trueIndex) {
                    //需要调整单元格的合并
                    rowElementi.cells[cellObjects[0].cellIndex].colSpan = trueIndex - cellObjects[0].trueIndex;
                }
                else {
                    rowElementi.cells[cellObjects[0].cellIndex].colSpan = cellObjects[0].trueIndex + cellObjects[0].colSpan - 1 - trueIndex2;
                }
            }
            else {
                //需要调整单元格的合并
                var cellLast = _.last(cellObjects);
                if (cellLast.trueIndex + cellLast.colSpan - 1 > trueIndex2) {
                    rowElementi.cells[cellLast.cellIndex].colSpan = cellLast.trueIndex + cellLast.colSpan - 1 - trueIndex2;
                }
                //移除包括colofindex及之后到colofindex2之间的所有单元格
                for (var j = cellObjects.length - 1; j >= 0; j--) {
                    var colj = cellObjects[j];
                    if (colj.trueIndex >= trueIndex && colj.trueIndex + colj.colSpan - 1 <= trueIndex2) {
                        rowElementi.deleteCell(colj.cellIndex);
                    }
                }

                //移除colofindex
                if (cellObjects[0].trueIndex < trueIndex) {
                    rowElementi.cells[cellObjects[0].rowIndex].colSpan = trueIndex - cellObjects[0].trueIndex;
                }
            }

            if (rowElementi.cells.length == 2) {
                tableElement.deleteRow(i);
                //删除行后，如果本行有上面行的合并情况，需要处理合并信息
                for (var k = 0; k < rowObjecti.cells.length; k++) {
                    var cellObjectk = rowObjecti.cells[k];
                    if (cellObjectk.rowIndex != rowObjecti.rowIndex) {
                        tableElement.rows[cellObjectk.rowIndex].cells[cellObjectk.cellIndex].rowSpan = cellObjectk.rowSpan-1;
                    }
                }
            }
        }

        var lastrow =getLastRow(tableElement);
        for (var m = 2, celllen = lastrow.cells.length; m < celllen; m++) {
            var cellm = lastrow.cells[m];
            var oldlen = ((cellm.style.width || cellm.offsetWidth) + "").replace("px", "") - 0;
            cellm.style.width = oldlen + deletePX / (celllen - 2) + "px";
        }

        setDirty(tableObject);

        return true;
    }

    //返回合并后的新对象
    function merger(tableElement,cellElements) {

        if(arguments.length===1) {
            cellElements=tableElement;
            if(!_.isArray(cellElements)||!cellElements.length) return;
            tableElement=cellElements[0];
        }
        else if(!_.isArray(cellElements)||cellElements.length<=1) throw new argumentNullError("","cellElements");

        var tableObject=getData(tableElement||cellElements[0]);
        tableElement=tableobject.element;

        var tidy = cellElementsValidate(tableObject,cellElements);

        if (!tidy || !tidy.block) {
            //不符合要求，选中的不是一个区域
            return;
        }

        var firstRow = tidy.rows[0];
        var firstCell = firstRow.cells[0];
        var firstCellElement = tableElement.rows[firstRow.rowIndex].cells[firstCell.cellIndex];
        var rowSpan = tidy.rows.length;

        var lastDeleteRow, delCount, deleted = 0, deletedWidth = 0;
        var widthOfRow;
        //var delrows = [];
        for (var rowj = rowSpan - 1; rowj >= 0; rowj--) {
            var rowElementj = tableElement.rows(firstRow.rowIndex + rowj);
            var rowObject = tidy.rows[rowj];
            if (rowj !== 0 && rowObject.cellLenght + 2 == rowElementj.cells.length) {
                widthOfRow = getRowHeight(tableObject,rowElementj, true);
                //table.deleteRow(firstRow.rowIndex + rowj);
                if (lastDeleteRow === undefined || lastDeleteRow === null) {
                    lastDeleteRow = firstRow.rowIndex + rowj;
                    delCount = 1;
                    deleted++;
                    deletedWidth = widthOfRow;
                }
                else if (lastDeleteRow - delCount == firstRow.rowIndex + rowj) {
                    delCount++;
                    deleted++;
                    deletedWidth += widthOfRow;
                }
            }
            else {
                if (typeof (lastDeleteRow) == "number") {
                    var lastRowObject = tableObject.rows[lastDeleteRow];
                    //var cell0 = rowElementj.cells[0]; 吴江平注释 2013年4月7日15:56:47
                    var cellElement1 = rowElementj.cells[1];
                    widthOfRow = getRowHeight(rowElementj);
                    //cell0.style.height = widthOfRow + deletedWidth + "px";吴江平注释 2013年4月7日15:56:47
                    cellElement1.style.height = widthOfRow + deletedWidth + "px";
                    //cellElement1.innerHTML = cellElement1.style.height + "";
                    //delrows.push({ rowIndex: lastDeleteRow, count: delCount });
                    for (var x = 0; x < delCount; x++) {
                        tableElement.deleteRow(lastDeleteRow - delCount + 1);
                    }
                    for (var i = 0, celllen = lastRowObject.cells.length; i < celllen; i++) {
                        var celli = lastRowObject.cells[i];
                        if (celli.rowIndex + celli.rowSpan >= lastDeleteRow && celli.rowSpan > delCount) {
                            celli.rowSpan -= delCount;
                            tableElement.rows[celli.rowIndex].cells[celli.cellIndex].rowSpan = celli.rowSpan;
                        }
                    }
                    lastDeleteRow = null;
                    delCount = null;
                    deletedWidth = null;
                }
                for (var colj = rowObject.cells.length - 1; colj >= 0; colj--) {
                    if (colj === 0 && rowj === 0) {
                        break;
                    }
                    var cellj = rowObject.cells[colj];
                    if (cellj.rowIndex == rowObject.rowIndex) {
                        rowElementj.deleteCell(cellj.index);
                    }
                }
            }
        }

        firstCellElement.colSpan = tidy.colLength;
        //firstCellElement.style.height = tidy.rowsHight + "px";
        firstCellElement.rowSpan = tidy.rowLength - deleted;
        //判断没有单元格的行
/*        if (deleted > 0) {
            setDirty(tableobject,firstRow.rowIndex);
        }
        else {
            setDirty(tableobject,firstRow.rowIndex, firstCell.rowSpan);
        }*/
        setDirty(tableobject);
        //合并，不会使控件变小，不需要考虑事前启动事件
        resizeCtl(tableObject,{ rowIndex: firstCell.rowIndex, cellIndex: firstCell.cellIndex, type: "cell" });
        tidy = null;
        mergerLastRow(tableObject,firstCell.rowIndex,firstCell.cellIndex);
        return firstCellElement;
    }

    function split(tableElement,rowIndex,cellIndex,rowSplitTo,cellSplitTo) {

        var valid={};
        var cellObject=getCell(tableObject,rowIndex,cellIndex,valid);
        if (!cellObject) throw new typeError("","[tableElement,rowIndex,cellIndex] or [tableRowElement,cellIndex] or tableCellElement",tableElement,rowIndex,cellIndex);
        rowIndex=cellObject.rowIndex;cellIndex=cellObject.cellIndex;
        if(__DEV__&&cellIndex<2) {
            console.error("first cell and seconde cell did't work");
            return;
        }
        var tableObject=cellObject.tableObject;
        tableElement=tableObject.element;

        var rowObject = tableObject.rows[cellObject.rowIndex];
        if (cellObject.rowSpan + cellObject.colSpan === 2) {
            return;
        }

        if(arguments.length>valid.length+1){
            rowSplitTo=_.getAt(arguments,valid.length+1);
            cellSplitTo=_.getAt(arguments,valid.length+2);
        }
        else if(arguments.length>valid.length){
            rowSplitTo=_.getAt(arguments,valid.length+1);
        }

        rowSplitTo=rowSplitTo||cellObject.rowSpan;
        cellSplitTo=cellSplitTo||cellObject.colSpan;

        if (rowSplitTo > cellObject.rowSpan||cellSplitTo > cellObject.colSpan) {
            return;
        }

        var oldHeight = cellObject.element.clientHeight;
        var innerHTML = tdobjx.element.innerHTML;
        cellObject.element.innerHTML = "";
        var trueIndex = cellObject.trueIndex;

        for (var i = cellObject.rowIndex + cellObject.rowSpan - 1; i > cellObject.rowIndex + cellObject.rowSpan - rowSplitTo; i--) {
            var rowElementi = tableElement.rows[i];
            var cellObjectNext =getCellAfterTrueIndex(tableObject,i,trueIndex);
            var insertIndex =  cellObjectNext? cellObjectNext.cellIndex : rowElementi.cells.length;
            for (var j = 1; j <= colsplit; j++) {
                rowElementi.insertCell(insertIndex).className = "hbt-cell hbt-packed";
                //newCell.innerHTML = "&nbsp;";
            }
            if (colsplit >= 1 && cellObject.colSpan > colsplit) {
                rowElementi.cells[insertIndex].colSpan = cellObject.colSpan - colsplit + 1;
            }
        }

        cellObject.element.rowSpan -= rowSplitTo - 1;
        cellObject.element.colSpan -= colsplit - 1;

        var rowElement=tableElement.rows[rowObject.rowIndex];

        while (colsplit--) {
            var newCell = rowElement.insertCell(cellObject.cellIndex + 1);
            //newCell.innerHTML = "&nbsp;";
            newCell.rowSpan = cellObject.element.rowSpan;
            newCell.className = "hbt-cell hbt-packed";
        }

        setDirty(tableObject/*,cellObject.rowIndex,cellObject.rowSpan*/);

        //base.setAttr("height", oldHeight, obj);
        var offsetHeight = cellObject.element.clientHeight - oldHeight;
        cellObject.element.innerHTML = innerHTML;
        //控件为了获取真实的高度需要先让自己的高度小于td的真实高度
        resizeCtl(tableObject,{ rowIndex: cellObject.rowIndex, cellIndex: cellObject.cellIndex, type: "cell" }, offsetHeight);
        return cellObject.element;
    }

    function splitEx(tableElement,rowIndex,cellIndex,rowSplitTo,cellSplitTo) {

        var cellObject=getCell(tableObject,rowIndex,cellIndex);
        if (!cellObject) throw new typeError("","[tableElement,rowIndex,cellIndex] or [tableRowElement,cellIndex] or tableCellElement",tableElement,rowIndex,cellIndex);
        rowIndex=cellObject.rowIndex;cellIndex=cellObject.cellIndex;
        if(__DEV__&&cellIndex<2) {
            console.error("first cell and seconde cell did't work");
            return;
        }
        var tableObject=cellObject.tableObject;
        tableElement=tableObject.element;

        var rowObject = tableObject.rows[cellObject.rowIndex];

        if (cellObject.rowSpan == rowSplitTo && cellObject.colSpan == cellSplitTo) {
            return split(tableObject,rowIndex,cellObject,rowSplitTo, cellSplitTo);
        }

        var colSpan = cellObject.colSpan;
        if (colSpan < cellSplitTo) {
            var trueIndex1 = cellObject.trueIndex;
            var trueIndex2 = cellObject.trueIndex + cellObject.colSpan - 1;
            var cellSpanInc = cellSplitTo - cellObject.colSpan;
            for (var i = 0, rowLength = tableElement.rows.length; i < rowLength; /*i++*/) {
                var rowElementi = tableElement.rows[i];
                var colObjecti = getCellOfTrueIndex(tableObject,i,trueIndex2);
                if (i + 1 == rowLength) {
                    //最后一行不处理合并操作
                    var newlen = colSpan + cellSpanInc;
                    var releaseWidth = 0;
                    for (var j = trueIndex1; j <= trueIndex2; j++) {
                        var cellElementj = rowElementi.cells[j];
                        var old = ((cellElementj.style.width || cellElementj.offsetWidth) + "").replace("px", "");
                        var x = parseInt(old * colSpan / newlen, 10) || 0;
                        releaseWidth += old - x;
                        cellElementj.style.width = x + "px";
                        //cellElementj.innerHTML = cellElementj.style.width + "";
                    }
                    var releaseWidthPre = releaseWidth / cellSpanInc;
                    var releaseWidthPremod = releaseWidth % cellSpanInc;
                    for (var k = 0; k < cellSpanInc; k++) {
                        var cellElementk = rowElementi.insertCell(colObjecti.cellIndex + 1);
                        cellElementk.className = "hbt-row-last";
                        cellElementk.style.width = (parseInt(releaseWidthPre, 10)) + (releaseWidthPremod > 0 ? 1 : (releaseWidthPremod + 0.5)) + "px";
                        releaseWidthPremod--;
                        //正式的删除掉
                        //cellElementk.innerHTML = cellElementk.style.width + "";
                    }
                }
                else {
                    colObjecti.colSpan += cellSpanInc;
                    rowElementi.cells[colObjecti.cellIndex].colSpan = colObjecti.colSpan;
                }
                i += colObjecti.rowSpan;
            }
        }

        if (rowSplitTo > td.rowSpan) {
            for (var ii = td.rowSpan; ii < rowSplitTo; ii++) {
                var newRow = tableElement.insertRow(rowObject.rowIndex + 1);
                var newCell = newRow.insertCell();
                newCell.className = "hbt-cell0";
                //newCell.style.cursor = "pointer";
                //newCell.innerHTML = rowObject.rowIndex + 2 + "";
                //newCell.style.height = defaultTDHeight + "px";
                newCell = newRow.insertCell();
                newCell.style.height = defaultTDHeight + "px";
                newCell.className = "hbt-cell1";
            }

            var rowSpanInc = rowSplitTo - td.rowSpan;
            for (var jj = 2, celllen = rowObject.cells.length; jj < celllen; jj++) {
                var cellObjectjj = rowObject.cells[jj];
                cellObjectjj.rowSpan += rowSpanInc;
                tableElement.rows[cellObjectjj.rowIndex].cells[cellObjectjj.cellIndex].rowSpan += rowSpanInc;
            }
        }

/*        if (colSpan < cellSplitTo) {
            setDirty(tableObject);
        }
        else {
            setDirty(tableObject,rowObject.rowIndex);
        }*/
        setDirty(tableObject);
        return split(tableobject,rowObject.rowIndex,cellObject, rowSplitTo, cellSplitTo);
    }


    function create(rowlen, collen, tablewidth) {
        var table = document.createElement("table"),tr,td;
        table.className = getClass();
        rowlen = rowlen || 1;
        collen = collen || 1;
        var twidth = Math.max(21 + collen * 2, (tablewidth||0));
        for (var i = 0; i < rowlen; i++) {
            tr = table.insertRow();
            tr.id = "tr" + i;
            td = tr.insertCell();
            td.className = "hbt-cell0";
            //td.style.cursor = "pointer";
            //td.innerHTML = i + 1 + "";
            //td.style.height = defaultTDHeight + "px";
            td = tr.insertCell();
            td.className = "hbt-cell1";
            td.style.height = defaultTDHeight + "px";
            for (var j = 0; j < collen; j++) {
                td = tr.insertCell();
                //td.innerHTML = "&nbsp;";
                td.className = "hbt-cell hbt-packed";
            }
        }
        tr = table.insertRow();
        td = tr.insertCell();
        td.className = "hbt-cell0 hbt-row-last";
        //td.style.cursor = "pointer";
        td.style.height = "0px";
        //td.style.width = "10px";
        td = tr.insertCell();
        td.className = "hbt-cell1 hbt-row-last";
        td.style.height = "0px";
        //td.style.width = "10px";
        //20+1边框,边框重叠
        twidth -= 21;
        var prewidth = parseInt(twidth / collen, 10); //prewidth最小是2
        var widthrelease = twidth - prewidth * collen;
        while(collen--){
            td = tr.insertCell();
            td.style.height = "0px";
            td.className = "hbt-row-last";
            td.style.width = prewidth + (widthrelease > 0 ? 1 : 0) + "px"; //剪掉边框
            widthrelease--;
        }
        //table.style.width = tablewidth + "px";
        return table;
    }

    function renderTo(elem, rowlen, collen, tablewidth) {
        var tableElement = base(control).renderTo(elem, rowlen, collen, tablewidth);
        var unbindFun=_.bind(bindEvent,this)(tableElement);
        return tableElement;
    }


    function bindTo(elem){
        var tableElement=getTableElement(elem);
        if(!tableElement) return;
        if(!$(tableElement).data("eventBinded")){
            var unbindFun=_.bind(bindEvent,this)(tableElement);
            $(tableElement).data("eventBinded",true);
        }
        return this;
    }


    function resize(tableElement,tablewidth,tableheight) {

        tableElement=getTableElement(tableElement);

        var lastrow = _.last(tableElement.rows);
        if (!lastrow || lastrow.cells.length <= 2) {
            return;
        }
        var celllen = lastrow.cells.length;

        //至少没个1px
        if (tablewidth < 21 + celllen) {
            return;
        }
        //剪掉第一列和第二列的宽度
        //tableElement.style.width = tablewidth + "px";
        tablewidth -= 21;

        if (lastrow.cells[0].className.indexOf("hbt-cell0-lastrow") == -1) {
            return;
        }
        var oldtablewidth = 0;
        var cellslen = [];
        for (var m = 2; m < celllen; m++) {
            var cellElementm = lastrow.cells[m];
            var oldlenm = ((cellElementm.style.width || cellElementm.offsetWidth) + "").replace("px", "") - 0;
            oldtablewidth += oldlenm;
            cellslen.push(oldlenm);
        }

        var newtablewidth = 0;
        for (var i = 2; i < celllen; i++) {
            var cellElementi = lastrow.cells[i];
            var oldleni = cellslen[i - 2];
            var newx = parseInt(oldleni * tablewidth / oldtablewidth, 10) || 0;
            newtablewidth += newx;
            cellElementi.style.width = newx + "px";
        }

        var lenrelease = tablewidth - newtablewidth;
        var precompensate = parseInt(lenrelease / (celllen - 2), 10);
        lenrelease -= precompensate * (celllen - 2);
        for (var j = 2; j < celllen && lenrelease > 0; j += 2) {
            var cellelementj = lastrow.cells[j];
            var curwidthj = parseInt(cellelementj.style.width, 10);
            cellelementj.style.width = curwidthj + precompensate + 1 + "px";
            lenrelease--;
        }

        for (var k = 3; k < celllen && lenrelease > 0; k += 2) {
            var cellElementk = lastrow.cells[k];
            var curwidthk = parseInt(cellElementk.style.width, 10);
            cellElementk.style.width = curwidthk + precompensate + 1 + "px";
            lenrelease--;
        }
    }

    function getCellsBetween(tableElement,rowIndex1,cellIndex1,rowIndex2,cellIndex2) {
        var cellObject1,cellObject2;
        if(arguments.length===2){
            cellObject1=getCell(tableElement);
            cellObject2=getCell(rowIndex1);
        }
        else if(arguments.length===3){
            cellObject1=getCell(rowIndex1);
            cellObject2=getCell(cellIndex1);
        }
        else {
            cellObject1=getCell(tableElement,rowIndex1,cellIndex1);
            cellObject2=getCell(tableElement,rowIndex2,cellIndex2);   
        }

        if(!cellObject1||!cellObject2){
            throw new typeError("","[cellElement,cellElement]",tableElement,rowIndex1,cellIndex1,rowIndex2,cellIndex2);
        }

        var tableObject=cellObject1.tableObject;
        tableElement=tableObject.element;

        rowIndex1=cellObject1.rowIndex;cellIndex1=cellObject1.cellIndex;
        cellIndex1=cellObject1.cellIndex;cellIndex2=cellObject2.cellIndex;

        if (rowIndex1 == rowIndex2 && cellIndex1 == cellIndex2) {
            return [cellObject1.element];
        }
        //处理行编号max-2
        var mintruecellIndex = Math.max(Math.min(cellObject1.trueIndex, cellObject2.trueIndex), 2);
        var maxtruecellIndex = Math.max(cellObject1.trueIndex + cellObject1.colSpan - 1, cellObject2.trueIndex + cellObject2.colSpan - 1);
        var minrow = Math.min(cellObject1.rowIndex, cellObject2.rowIndex);
        var maxrow = Math.max(cellObject1.rowIndex + cellObject1.rowSpan - 1, cellObject2.rowIndex + cellObject2.rowSpan - 1);

        var result = [];
        for (var i = minrow; i <= maxrow; i++) {
            var rowObjecti = tableObject.rows[i];
            if (i == tableElement.rows.length - 1) {
                break;
            }
            var cellObjects = getCellsBetweenTrueIndex(tableObject,rowObjecti.rowIndex, mintruecellIndex, maxtruecellIndex);
            for (var j = 0; j < cellObjects.length; j++) {
                var cellObjectj = cellObjects[j];
                var ireset = false;
                result.push(tableElement.rows[cellObjectj.rowIndex].cells[cellObjectj.cellIndex]);
                if (cellObjectj.rowIndex < minrow) {
                    minrow = cellObjectj.rowIndex;
                    i = minrow - 1;
                    ireset = true;
                    result = [];
                }
                if (cellObjectj.rowIndex + cellObjectj.rowSpan - 1 > maxrow) {
                    maxrow = cellObjectj.rowIndex + cellObjectj.rowSpan - 1;
                }
                if (cellObjectj.trueIndex < mintruecellIndex) {
                    mintruecellIndex = cellObjectj.trueIndex;
                    if (i != minrow) {
                        result = [];
                        i = minrow - 1;
                        ireset = true;
                    }
                }
                if (cellObjectj.trueIndex + cellObjectj.colSpan - 1 > maxtruecellIndex) {
                    maxtruecellIndex = cellObjectj.trueIndex + cellObjectj.colSpan - 1;
                    if (i != minrow) {
                        result = [];
                        i = minrow - 1;
                        ireset = true;
                    }
                }
                if (ireset) {
                    break;
                }
            }
        }

        return result;
    }

    function getSelected(tableElement) {
        tableElement=getTableElement(tableElement);
        if(!tableElement) return;
        return $.makeArray($(tableElement).children(".hbt-cell-selected"));
    }

    function setSelected(tableElement,rowIndex,cellIndex) {
        render(tableElement,rowIndex,cellIndex);
    }

    function render(tableElement,rowIndex,cellIndex) {
        var cellElement = getCell(tableElement,rowIndex,cellIndex);
        if (!cellElement) return;
        var cell = cellElement.td;
        var $cell = $(cell);
        if ($cell.hasClass("hbt-cell0") || $cell.hasClass("hbt-cell1")) return;
        var b = {
            borderLeftColor: cell.style.borderBottomColor,
            borderLeftStyle: cell.style.borderBottomStyle,
            borderLeftWidth: cell.style.borderBottomWidth,
            borderTopColor: cell.style.borderBottomColor,
            borderTopStyle: cell.style.borderBottomStyle,
            borderTopWidth: cell.style.borderBottomWidth,
            borderRightColor: cell.style.borderBottomColor,
            borderRightStyle: cell.style.borderBottomStyle,
            borderRightWidth: cell.style.borderBottomWidth,
            borderBottomColor: cell.style.borderBottomColor,
            borderBottomStyle: cell.style.borderBottomStyle,
            borderBottomWidth: cell.style.borderBottomWidth
        };
        $cell.addClass("hbt-cell-selected")
                .attr("hbt-old-border", $.toJSON(b))
                .css("border", "#FFA613 2px solid");//仅仅作为标记
    }

    /*
    function renderSelect() {
        var cells = this.getSelected();
        $.each(cells, function (index, cell) {
            render(cell);
        });
    }
    */

    function cancelSelect(tableElement) {
        var cells = getSelected(tableElement);
        $.each(cells, function (index, cell) {
            var $cell = $(cell);
            if (!$cell.hasClass("hbt-cell-selected")) return;
            $cell.removeClass("hbt-cell-selected").css($.evalJSON($cell.attr("hbt-old-border"))).removeAttr("hbt-cell-selected");
        });
    }


    function clearSelected(tableElement) {
        tableElement=getTableElement(tableElement);
        if(!tableElement) return;
        $(tableElement).children(".hbt-cell-selected").each(function (index, elem) {
            cancelSelect();
        });
    }

    var name = "cn.com.HBCK.ITPlat.Templates.HbtTable";
    module.exports = exports[name] = oo.register(name, tableOP);

    function bindEvent(tableElement) {
        if (!tableElement.parentNode) return;

        var mousebutton = { left: 1, middle: 2, right: 3 };
        var movestate = { start: 0, moving: 1, movingspan: 2, end: 3 };
        var selectcanvecss = {
            "position": "absolute",
            "background-color": "rgb(70,90,125)",
            "border": "1px #ffa613 solid",
            "width": "0px",
            "height": "0px",
            "top": "0px",
            "left": "0px",
            "padding": "0px",
            "margin": "0px"
        };

        var dottedlinecss = {
            "position": "fixed",
            "z-index": "1000000"
        };

        var $table = $(tableElement);
        var $p = $(tableElement.parentNode);
        var $doc = $(tableElement.ownerDocument);

        $p.children("#hbt-table-selectcanve,#hbt-table-dottedLine").remove();
        var $selectCanve = $('<div id="hbt-table-selectcanve"></div>').css(selectcanvecss).hide().appendTo($p);
        var $dottedLine = $('<div id="hbt-table-dottedLine"></div>').css(dottedlinecss).hide().appendTo($p);
        var $fastmenu = $("");

        var selectevent = {
            down:selectDown,
            wheel:selectWheel,
            wheeldelay:selectWheelDelay,
            up:selectUp,
            move:selectMove
        };

        var resizeevent = {
            resize:resize,
        };

        var rowresizeevent = {
            tip:rowResizeTip,
            down:rowResizeDown,
            move:rowResizeMove,
            up:rowRezieUp,
            cancle: rowReizeCancle,
        };

        var colresizeevent = {
            tip:colResizeTip,
            down:colResizeDown,
            move:colResizeMove,
            up:colResizeUp,
            cancle:colResizeCancle,
        };
        /*
        var ctrlselectevent = {
            move: _.bind(ctrlMove, this),
            drop: _.bind(ctrlDrop, this),
            cancle:_.bind(ctrlMoveCancle, this)
        }
        */

        var menu = {
            show:showMenu,
            hide:hideMenu
        };

        var touchpos = {};
        var move = 0;
        var touch = {};
        //var drag = null, dragLength = 0

        $p.on("resize", resizeevent.resize)
            .on("mousedown", selectevent.down)
            .on("mousemove", rowresizeevent.tip)
            .on("mousedown", rowresizeevent.down)
            .on("mousemove", colresizeevent.tip)
            .on("mousedown", colresizeevent.down);

        //ff,opear不支持onselectstart事件，但支持样式-moz-user-select，moz的话jquery会自己加
        $table.css("user-select", "none")[0].onselectstart = function () {
            return false;
        };

        function selectMove(e) {

            if (move == movestate.start) {
                $selectCanve.show();
                move = movestate.moving;
            }

            $selectCanve.css({
                left: e.pageX > touchpos.pageX ? touchpos.pageX - 2 : e.pageX + 1,//-2 +1 是为了鼠标所指的地方是表格，而不是selectdiv
                top: e.pageY > touchpos.pageY ? touchpos.pageY - 2 : e.pageY + 1,
                width: Math.abs(e.pageX - touchpos.pageX),
                height: Math.abs(e.pageY - touchpos.pageY)
            });
        }

        function selectUp(e) {
            var elem = e.target;
            $p.off("mousemove", selectevent.move).off("mouseup", selectevent.up);
            var cells = getCellsBetween(drag.obj, elem);
            drag = null;
            setSelected(cells);
            //dragLength = getSelected().length;
            $selectCanve.hide().html("");
        }

        function selectWheelDelay(m, wheelType, mouseType) {
            var weewe = 0;
            var inc = $p.scrollTop() - m,
                t = $selectCanve.position().top,
                h = $selectCanve.height();

            if (h < inc) {
                inc = -inc;
                if ((h + inc) < 0) {
                    var c = -inc; inc = -h; h = c;
                }
                mouseType = mouseType == "top" ? "Bottom" : "top";
                wheelType = wheelType == "down" ? "up" : "down";
            }

            if (wheelType == "down") {  //下滚
                if (mouseType == "top") $selectCanve.height(h - inc); //鼠标在上
                else $selectCanve.css({ top: t - inc, height: h + inc });//鼠标在下
                touchpos.pageY -= inc;
            }
            else {  //上滚
                if (mouseType == "top") $selectCanve.height(h + inc);//鼠标在上
                else $selectCanve.css({ top: t + inc, height: h - inc });//鼠标在下
                touchpos.pageY += inc;
            }
        }

        function selectWheel(e) {
            if ($selectCanve.is(":hidden")) return;
            //FF,Opera[detail3的倍数]
            var delta = e.detail ? -e.detail / 3 : e.wheelDelta / 120;
            var wheelType = delta > 0 ? "up" : "down";
            var mouseType = touchpos.pageY < e.pageY ? "Bottom" : "top";
            var top = $p.scrollTop();
            setTimeout(wheeldelay(top, wheelType, mouseType), 10);
        }
        /*
        function ctrlMoveCancle() {
            $p.of("mousemove", ctrlselectevent.move).off("mouseup", ctrlselectevent.drop);
            move = movestate.end;
            drag = null;
            $p.css("cursor", "normal");
            $selectCanve.hide().html();
        }

        function ctrlMove(e) {
            if (!e.ctrlKey) {
                ctrlselectevent.cancle();
                return;
            }

            if (move == movestate.start) {
                $p.css("cursor", "move");
                $selectCanve.show();
                move = movestate.moving;;
            }
            $selectCanve.css({ "left": e.pageX + 1, "top": e.pageY + 1 });
        }

        function ctrlDrop(e) {

            var elem = e.target;
            var objnow = base.getObj(elem);
            if (objnow && objnow.colIndex > 1 &&
                    (drag.rowIndex != objnow.rowIndex || drag.colIndex != objnow.colIndex)) {
                base.parseboard.copyObj(drag.obj);
                base.parseboard.parseObj(objnow);
                cancelSelect();
                base.setSelObj(objnow);
                renderSelect();
                base.parseboard.clear();
            }

            ctrlselectevent.cancle();
        }
        */

        function showMenu(e) {

        }

        function hideMenu(e) {
            $fastmenu.hide();
        }

        function selectDown(e) {//框选、点选操作
            var elem = e.target;
            var tdobj = getTDEx(elem);

            if (!tdobj) return;

            menu.hide(e);

            if (e.which == mousebutton.right) {//menu
                menu.show(e);
                return;
            }
            else if ($p.css("cursor") == "w-resize") {
                return;
            }
            else if (e.ctrlKey && e.which == mousebutton.left) {//多选
                setSelected(elem);
                $p.off("mousemove", selectevent.move)
                    .off("mousewheel", selectevent.wheel)
                    .off("mouseup", selectevent.up);
            }
            else if (e.which == mousebutton.left) {//框选
                //removeEvent("mousedown", "modifyColWidthMouseDown");
                clearSelected();
                move = movestate.start;
                $p.on("mousemove", selectevent.move)
                    .on("mousewheel", selectevent.wheel)
                    .on("mouseup", selectevent.up);
            }

            if (!Array.prototype.getAt.call(getSelected(), -1)) {
                $p.off("mousemove", selectevent.move)
                    .off("mousewheel", selectevent.wheel)
                    .off("mouseup", selectevent.up);
                return;
            }

            $selectCanve.css({
                left: e.pageX,
                top: e.pageY,
                width: 0,
                height: 0
            });

            touchpos.pageX = e.pageX;
            touchpos.pageY = e.pageY;

            //拖拽要整体做，不用表格单独做
            /*
            if (dragLength == 1 && e.ctrlKey && e.which == mousebutton.left) {
                var tdhtml = "<table class=\"hbt-selectcanve\" style=\"width:100%;height:100%\"><tr>" + $.outerHTML(tdobj.td) + "</tr></table>";
                $selectCanve.html(tdhtml).css({ width: tdobj.width, height: tdobj.height });

                move = movestate.start;
                $p.one("mousemove", ctrlselectevent.move);
                $p.one("mouseup", ctrlselectevent.drop);
            }
            else {
                $p.off("mousemove", ctrlselectevent.move);
                $p.off("mouseup", ctrlselectevent.drop);
            }
            */
        }

        function resize() {
            if (resize.tId === undefined || resize.tId === null) {
                _.throttle(resizeevent.resize, 150);
                return;
            }
            if (tableElement && tableElement.style.width.indexOf("px") == -1) {
                resize($p.width(),void(0),tableElement);
            }
        }

        function rowResizeTip(e) {
            if (e.which == mousebutton.left) {
                return;
            }
            var $elem = $(e.target);
            if ($elem.prop(nodeName).toUpperCase == "TD" && $elem.hasClass("hbt-cell0")&&
             Math.abs(e.pageY - $elem.off().top - $elem.height()) <= 2) {
                $p.css("cursor", "n-resize");
            }
            else if ($p.css("cursor") == "n-resize") {
                $p.css("cursor", "");
            }
        }

        function rowResizeDown(e) {
            if ($p.css("cursor") != "n-resize") {
                return;
            }
            if (e.which != mousebutton.left) {
                return;
            }
            $table.off("mousemove", rowresizeevent.tip);

            if (rowresizeevent.cancle(e)) {
                return;
            }

            touch = e.target;
            $dottedLine.height("1px").css({
                "border-top": "1px dashed #000",
                "border-left": "",
                "top": e.pageY,
                "left": e.pageX,
                "height": "1px",
                "width": $p.width()
            }).show();
            $p.on("mousemove", rowresizeevent.move).one("mouseup", rowresizeevent.up);

            //showCellHeight(event, elem);
        }

        function rowResizeMove(e) {
            var $elem = $(e.target);
            //选择的优先级要高于调整高度
            if (rowresizeevent.cancle(e)) {
                return;
            }
            $dottedLine.css("top", e.pageX);
            //怎是去掉即时效果
            /*var cellheight =touch.height()
            var modiHeight = e.pageY-(touch.offset().top+cellheight);
            cellheight =+ modiHeight;
            showCellHeight(event, "", (cellheight < 0 ? 0 : cellheight) + "px"); //2是误差 cellheight- 2
            */
        }

        function rowRezieUp(e) {
            var $touch = $(touch);
            var touchheight = $touch.height(), touchbottom = $touch.offset().top + touchheight;
            var offset = e.pageY - touchbottom;
            var newheight = touchheight + offset;
            if (offset < 0 && newheight < 1) {
                offset = -touchheightt + 1;
            }

            if (offset !== 0) {
                var td = getTD(touch);
                $touch.html();
                resizeCtl(td.rowIndex, offset);

                //drag2.style.height = newheight + "px";
                tableElement.rows[td.rowIndex].cells[1].style.height = newheight < 0 ? 1 : newheight + "px";
                //为了刷新行号样式，无其他实际作用
                if (newheight < 14) {
                    $touch.css({ "font-size": newheight + "px", "line-height": newheight + "px" });
                }
                else {
                    $touch.css({ "font-size": "", "line-height": "" });
                }
                $touch.html(td.rowIndex + 1 + "");
            }
            rowresizeevent.cancle(e, true);
        }

        function rowReizeCancle(e, force) {
            var $elem = $(e.target);
            if (force || $elem.prop(nodeName).toUpperCase != "TD" || $elem.prop("cellIndex") > 0) {
                $p.off("mousemove", rowresizeevent.move)
                    .off("mouseup", rowresizeevent.up)
                    .on("mousemove", rowresizeevent.tip).css("cursor", "");
                $dottedLine.hide();
                touch = {};
                return true;
            }
            return false;
        }

        function colResizeTip(e) {
            if (e.which == mousebutton.left) {
                return;
            }
            var $elem = $(e.target);
            if ($elem.prop(nodeName).toUpperCase != "TD" || $elem.hasClass("hbt-cell0") || $elem.hasClass("hbt-cell1")) {
                return;
            }
            if (Math.abs(e.pageX - $elem.off().left - $elem.width()) <= 2) {
                var td = getTD(elem);
                if (!td) return;
                var tdcur = tableElement.rows[td.rowIndex].cells[td.colIndex];
                var lasttd = Array.prototype.getAt.call(tableElement.table.rows[td.rowIndex].cells, -1);
                var tdtrueindex = lasttd.trueIndex + lasttd.colSpan - 1;
                if ((tdcur.trueIndex + td.colSpan - 1) == tdtrueindex || tdcur.trueIndex < 2) { return; }
                $p.css("cursor", "w-resize");
            }
            else if ($p.css("cursor") == "w-resize") {
                $p.css("cursor", "");
            }
        }

        function colResizeDown(e) {
            if ($p.css("cursor") != "w-resize") {
                return;
            }
            if (e.which != mousebutton.left) {
                return;
            }

            var $elem = $(e.target);
            if ($elem.prop(nodeName).toUpperCase != "TD" || !$elem.hasClass("hbt-cell")||
                 $elem.parentsUntil("table")[0] !== tableElement) {
                return;
            }

            $p.off("mousemove", colresizeevent.tip);

            touch = e.target;

            $dottedLine.css({
                "border-top": "",
                "border-left": "1px dashed #000",
                "top": e.pageY,
                "left": e.pageX,
                "height": "1px",
                "width": $p.width()
            }).show();
            $p.on("mousemove", colresizeevent.move).one("mouseup", colresizeevent.up);
        }

        function colResizeMove(e) {
            var lastrow = Array.prototype.getAt.call(tableElement.rows, -1);
            var td = base.getTD(touch);
            var $touch = $(td.td);
            var startX = $touch.offset().left + $touch.width();
            var endX = event.pageX;
            var moveX = endX - startX;
            var tdtrueindex = getCellTrueIndex(td) + td.colSpan - 1;
            if ((moveX < 0 && Math.abs(moveX) > parseInt(lastrow.cells[tdtrueindex].style.width)) || moveX > 0 && Math.abs(moveX) > parseInt(lastrow.cells[tdtrueindex + 1].style.width)) {
                colresizeevent.cancle(e, true);
                return;
            }
            $dottedLine.css("left", event.pageX);
        }

        function colResizeUp(e) {
            var td = getTD(touch);
            var tdnext = base.getTD(tableElement.rows[td.rowIndex].cells[td.colIndex + 1]);
            if (!tdnext) {
                colresizeevent.cancle(e, true);
                return;
            }
            var lastrow = Array.prototype.getAt.call(tableElement.rows, -1);
            var $touch = $(td.td);
            var startX = $touch.offset().left + $touch.width();
            var endX = e.clientX;
            var tdtrueindex = base.tableop.getCellTrueIndex(td) + td.colSpan - 1;
            var offsetwidth = endX - startX;
            var td1width = td.td.clientWidth + offsetwidth, td2width = tdnext.td.clientWidth - offsetwidth;
            if (offsetwidth === 0 || td1width <= 1 || td2width <= 1) {
                colresizeevent.cancle(e, true);
                return;
            }

            lastrow.cells[tdtrueindex].style.width = lastrow.cells[tdtrueindex].style.width.replace("px", "") - 0 + offsetwidth;
            lastrow.cells[tdtrueindex + 1].style.width = lastrow.cells[tdtrueindex + 1].style.width.replace("px", "") - offsetwidth;
            //调前面的格子
            for (var i = 0; i < td.td.colIndex; i++) {
                var lrtd = lastrow.cells[trueIndex - td.td.colIndex + 1];
                var newx = parseInt(old * oldlen / newlen, 10) || 0;
                widthrelease += old - newx;
            }

            colresizeevent.cancle(e, true);
        }

        function colResizeCancle(e, force) {
            $p.off("mousemove", colresizeevent.move)
                .off("mouseup", colresizeevent.up)
                .on("mousemove", colresizeevent.tip);
            touch = {};
            $p.css("cursor", "");
            $dottedLine.hide();
        }

        function unbindEvent() {
            $p.off("resize", resizeevent.resize)
                .off("mousedown", selectevent.down)
                .off("mousemove", selectevent.move)
                .off("mouseup", selectevent.up)
                .off("mousemove", rowresizeevent.tip)
                .off("mousedown", rowresizeevent.down)
                .off("mousemove", rowresizeevent.move)
                .off("mouseup", rowresizeevent.up)
                .off("mousemove", colresizeevent.tip)
                .off("mousedown", colresizeevent.down)
                .off("mousemove", colresizeevent.move)
                .off("mouseup", colresizeevent.up);
        }

        return unbindEvent;
    }
});