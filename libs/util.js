define(function(require,exports,module){
    $.fn.outerHTML = function() { //只处理一个
        $this = $(this);
        if ($this.length && $this[0].hasOwnProperty("outerHTML")) {
            return $this[0].outerHTML;
        }
        var h = $this.html();
        var s = $this.wrap("<div></div>").parent().html();
        $this.empty().html(h);
        return s;
    };
    _.mixin({
        isElement: function(val) {
            return _.isObject(val) && val.nodeName;
        },
        getAt: function(arr, index) {
            if (!arr) return void 0;
            if (!_.isArray(arr)) arr = _.toArray(arr);
            if (index < 0) {
                index = arr.length + index;
            }
            if (index < 0) {
                return void 0;
            }
            return arr[index];
        },
        iterator:function(obj,filter){
            var keys=null;
            if(_.isArray(obj)){
                keys=_.range(obj.length);
            }
            else{
                keys=_.keys(obj);
            }
            var pos=0;
            return {
                first:function(){
                    if(this.isEmpty()) return;
                    return obj[keys[0]];
                },
                current:function(){
                    if(this.isEmpty()) return;
                    return obj[keys[pos]];
                },
                next:function(){
                    if(this.isEmpty()) return;
                    var result=null;
                    while(pos+1<keys.length&&(result=obj[keys[++pos]])){
                        if(filter(result)) return result;
                    }
                    return ;
                },
                isEmpty:function(){
                    return !keys;
                }
            };
        }
        /*,
        quickSortBy : function(list,iteratee) {
            if (!list.length || list.length == 1) return;
            (function f(arr, left, right, fun) {
                if (left >= right) return;
                var l = left,
                    h = right,
                    v = arr[l];
                while (l != h) {
                    if (arr[h--] >= v) continue;
                    h++;
                    arr[l] = arr[h];
                    break;
                }

                while (l != h) {
                    if (arr[l++] <= v) continue;
                    l--;
                    arr[h] = arr[l];
                    break;
                }
                arr[l] = v;
                arguments.callee(arr, left, l - 1, fun);
                arguments.callee(arr, l + 1, right, fun);
            })(list, 0, list.length - 1, iteratee || function(a) {
                return a;
            });
            return list;
        }*/
    });
});