define(["jquery"], function () {
    return {
        val: function (e, val) {
            var $e = $(e);
            if (val === void (0)) {
                ret = $e.val();
                return;
            }
            $e.val(val);
        }
        , enable: function (e, b) {
            b ? $(e).removeAttr("disabled") : $(e).attr("disabled", "disabled");
        }
        , visible: function (e, v) {
            v ? $(e).show() : $(e).hide();
        }
        , validate: function (e) {
            e;
        }
    }
});