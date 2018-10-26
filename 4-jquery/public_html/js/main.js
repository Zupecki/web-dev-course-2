$(".shape").click(function () {
    hideShape(self);
});

function hideShape(shape) {
    console.log("CLICKED!");
    shape.style.display = "none";
}