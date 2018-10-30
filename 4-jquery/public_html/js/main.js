$(".shape").click(function () {
    console.log($(this).css("background-color"));
    console.log($(this).attr("class"));
    //hideShape($( this ));
});

function hideShape(shape) {
    console.log("CLICKED!" + shape);
    shape.style.display = "none";
}