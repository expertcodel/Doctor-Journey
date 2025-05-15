// !function(){"use strict";window.addEventListener("load",function(){var t=document.getElementsByClassName("needs-validation");t&&Array.prototype.filter.call(t,function(e){e.addEventListener("submit",function(t){!1===e.checkValidity()&&(t.preventDefault(),t.stopPropagation()),e.classList.add("was-validated")},!1)})},!1)}();

(function () {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });

    document.addEventListener("DOMContentLoaded", function() {
      function OTPInput() {
          const inputs = document.querySelectorAll('#otp > input');
          for (let i = 0; i < inputs.length; i++) {
              inputs[i].addEventListener('input', function() {
                  if (this.value.length > 1) {
                      this.value = this.value[0]; //    
                  }
                  if (this.value !== '' && i < inputs.length - 1) {
                      inputs[i + 1].focus(); //   
                  }
              });
  
              inputs[i].addEventListener('keydown', function(event) {
                  if (event.key === 'Backspace') {
                      this.value = '';
                      if (i > 0) {
                          inputs[i - 1].focus();   
                      }
                  }
              });
          }
      }
    
  
      OTPInput();
  
      



  })

 


})();



  