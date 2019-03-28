(function($) {
    $.fn.phoneMaskModern = function(options) {
        return this.each(function () {
            var $input = $(this);
            if ($input.is("input")) {
                var basic_str = '',
                    formatted_str = '',
                    digit_count = 0;

                $input.on('input', function (e) {
                    var target = e.target;

                    basic_str = strToBasic(target.value);
                    formatted_str = strToFormatted(basic_str);

                    $input.val(formatted_str);
                });

                $input.keypress(function (e) {
                    var target = e.target;
                    var charCode = (e.which) ? e.which : e.keyCode;
                    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 43) {
                        return false;
                    }
                    if (charCode === 43 && digit_count !== 0) return false;

                    var digit = parseInt(String.fromCharCode(charCode));

                    if (digit_count === 0) {
                        if (charCode === 43) {
                            digit = 7;
                        }

                        if (digit === 7) {
                            formatted_str = '+7 (';
                        } else if (digit === 8) {
                            formatted_str = '+7 (';
                        } else if (digit === 9) {
                            formatted_str = '+7 (9';
                        } else {
                            return false;
                        }
                        basic_str = strToBasic(formatted_str);
                        target.value = formatted_str;
                        $input.val(formatted_str);
                        return false;
                    }

                    setTimeout(function() {
                        basic_str = strToBasic(target.value);
                        formatted_str = strToFormatted(basic_str);

                        $input.val(formatted_str);
                        basic_str = strToBasic(target.value);
                    }, 0);

                    return true;
                });

                function strToBasic(str) {
                    var res = str.replace(/\D/g, '');
                    if (res.charAt(0) !== '7') {
                        res = '7' + res;
                    }
                    digit_count = res.length;

                    return res;
                }
                function strToFormatted(str) {
                    var temp = str,
                        res = '';
                    if (temp.charAt(0) === '7') {
                        res = '+7 (';
                        temp = temp.substring(1);
                    }
                    if (temp.length > 3) {
                        res += temp.substring(0, 3) + ') ';
                        temp = temp.substring(3);

                        if (temp.length > 3) {
                            res += temp.substring(0, 3) + '-';
                            temp = temp.substring(3);

                            if (temp.length > 2) {
                                res += temp.substring(0, 2) + '-';
                                temp = temp.substring(2);

                                if (temp.length > 2) {
                                    res += temp.substring(0, 2);
                                    temp = '';
                                }
                            }
                        }
                    }

                    res += temp;
                    return res;
                }
            }
        })
    };
}(jQuery));
