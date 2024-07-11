document.addEventListener('DOMContentLoaded', () => {
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    if (errorMessage && errorMessage.textContent.trim() !== '') {
        setTimeout(() => {
            errorMessage.classList.add('show');
        }, 100); // Delay to start sliding in

        setTimeout(() => {
            errorMessage.classList.remove('show');
            errorMessage.classList.add('hide');
        }, 3500); // Time before starting to slide out

        setTimeout(() => {
            errorMessage.remove();
        }, 4000); // Delay to remove the element after the slide-out
    }

    if (successMessage && successMessage.textContent.trim() !== '') {
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 100); // Delay to start sliding in

        setTimeout(() => {
            successMessage.classList.remove('show');
            successMessage.classList.add('hide');
        }, 3500); // Time before starting to slide out

        setTimeout(() => {
            successMessage.remove();
        }, 4000); // Delay to remove the element after the slide-out
    }
});

function goBack() {
    window.history.back();
}