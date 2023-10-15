
let btnDownload = document.querySelector(".btn-download")
let form = document.querySelector(".model")
let closeBtn = document.querySelector(".close")



btnDownload.addEventListener("click", ()=>{
    form.classList.add("active")
   

})


closeBtn.addEventListener("click" , ()=> {
    form.classList.remove("active")
})

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
        // Get form fields by their IDs
        var nameField = document.getElementById("text1");
        var emailField = document.getElementById("email");
        var mobileField = document.getElementById("text2");
        var messageField = document.getElementById("message");

        console.log(nameField, emailField, mobileField, messageField);
        if (validateForm(nameField,emailField, messageField, mobileField)) {
        // Submit the form via AJAX or perform other actions
        console.log('Form is valid');

        console.log('sendFeedback');
        sendFeedback('contact', { message_html: `Hi my Name is ${nameField.value} my mobile no and email id are as follows ${mobileField.value} , ${emailField.value} and my message is : "${messageField.value}" `, from_name: nameField.value, reply_to: emailField.value }, nameField,emailField, messageField, mobileField)

    } else {
        // Show validation errors
        console.log('Form is not valid');
    }
});

document.getElementById('myForm1').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
        // Get form fields by their IDs
        var nameField = document.getElementById("brouchertext1");
        var emailField = document.getElementById("broucheremail");
        var mobileField = document.getElementById("brouchertext2");
        var messageField = document.getElementById("brouchermessage");

        console.log(nameField, emailField, mobileField, messageField);
    if (validateForm(nameField,emailField, messageField, mobileField)) {
        console.log('Form is valid');
        sendFeedback('contact', { message_html: `Details for Download of Broucher - Hi my Name is ${nameField.value} my mobile no and email id are as follows ${mobileField.value} , ${emailField.value} and my message is : "${messageField.value}" `, from_name: nameField.value, reply_to: emailField.value }, nameField,emailField, messageField, mobileField)

    } else {
        // Show validation errors
        console.log('Form is not valid');
    }
});

function validateForm(nameField,emailField, messageField, mobileField) {

    // Regular expressions for email and phone number validation
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number

    // Add your validation logic here
    if (nameField.value === "" || emailField.value === "" || mobileField.value === "" || messageField.value === "") {
        console.log(nameField.value, emailField.value ,mobileField.value ,messageField)
        alert("Please fill in all the fields.");
        return false; // Prevent the form from submitting if validation fails
    }
        // Check email format
        if (!emailRegex.test(emailField.value)) {
            alert("Please enter a valid email address.");
            return false; // Prevent the form from submitting if validation fails
        }
    
        // Check phone number format
        if (!phoneRegex.test(mobileField.value)) {
            alert("Please enter a valid 10-digit phone number.");
            return false; // Prevent the form from submitting if validation fails
        }

   return true;
}
    function sendFeedback(value,variables,nameField,emailField, messageField, mobileField) {
        emailjs.send("service_zd0hg9s", "template_3ykwfv7", {
            from_name: variables.from_name,
            message: variables.message_html,
            reply_to: variables.reply_to,
        }).then((_response) => {
console.log('sent mail');
                        nameField.value = '';
                        emailField.value = '';
                        messageField.value = '';
                        mobileField.value = '';

                        form.classList.remove("active")
        })
            // Handle errors
            .catch((err) => {
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', err);
                setSubmitFlag(true);
            })
    }