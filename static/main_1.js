// $(document).ready(function() {
//     $('#upload__result').hide();
//     $('#predict').hide();

//     function readURL(input) {
//         if (input.files && input.files[0]) {
//             var reader = new FileReader();
//             reader.onload = function (e) {
//                 $('.upload__image-wrapper').css('background-image', 'url(' + e.target.result + ')');
//             }
//             reader.readAsDataURL(input.files[0]);
//         }
//     }
//     $('#upload-image').change(function() {
//         $('#upload-file').hide();
//         $('#upload__result').text('');
//         $('#predict').show();
//         $('#upload__content').hide();
//         readURL(this);
//     });

//     $('#predict').click(function() {
//         var form_data = new FormData($('#upload-file')[0]);

//         $.ajax({
//             type: 'POST',
//             url: '/predict',
//             data: form_data,
//             contentType: false,
//             cache: false,
//             processData: false,
//             async: true,
//             success: function(data) {
//                 $('#predict').hide();
//                 $('#upload-file').show();
//                 $('#upload__result').fadeIn(600);
//                 $('#upload__result').text(' Result: ' + data);
//                 console.log('Success');
//             },
//         });
//     });
// });