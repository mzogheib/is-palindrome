(function () {
    var submitButton = document.getElementsByTagName('button')[0];
    var textarea = document.getElementsByTagName('textarea')[0];
    var result = document.getElementsByClassName('result')[0];

    result.innerHTML = '';
    textarea.value = '';
    textarea.focus();
    textarea.addEventListener('input', onTextareaChange);

    submitButton.disabled = true;
    submitButton.addEventListener('click', checkPalindrome);

    function checkPalindrome() {
        var input = textarea.value;
        var inputLength = input ? input.length : 0;

        if (inputLength < 2) {
            return;
        }

        if (isPalindrome(input)) {
            result.innerHTML = '👍';
            track('submit-valid', input, inputLength);
        } else {
            result.innerHTML = '👎';
            track('submit-invalid', input, inputLength);
        }
    }

    function onTextareaChange () {
        submitButton.disabled = textarea.value.length < 2;
    }

    // Source: https://www.grammarly.com/blog/16-surprisingly-funny-palindromes/
    function isPalindrome(str) {
        var re = /[\W_]/g;
        var lowRegStr = str.toLowerCase().replace(re, '');
        var reverseStr = lowRegStr.split('').reverse().join('');
        return reverseStr === lowRegStr;
    }

    function track(action, label, value) {
        var category = 'palindrome';
        gtag('event', action, { 'event_category': category, 'event_label': label, 'value': value });
    }
})();