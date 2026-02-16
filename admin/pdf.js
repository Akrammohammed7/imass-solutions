
alert('here');

var formpdf = $('#maindiv'),
    cache_width = formpdf.width(),
    a4 = [595.28, 990.89]; // for a4 size paper width and height

var canvasImage,
    winHeight = a4[1],
    formHeight = formpdf.height(),
    formWidth  = formpdf.width();

var imagePieces = [];

// on create pdf button click
$('#pdfbtn').on('click', function() {
    alert('here in pdfbtn click ');
    $('body').scrollTop(0);
    imagePieces = [];
    imagePieces.length = 0;
    mainpdf();
});

// main code
function mainpdf() {
    alert('ere');
    //$('body').scrollTop(0);
    imagePieces = [];
    imagePieces.length = 0;
    
    alert('ere');

    getCanvas().then(function(canvas){
        alert('after canvas'+canvas);
        canvasImage = new Image();
        canvasImage.src= canvas.toDataURL("image/png");
        canvasImage.onload = splitImage;
    });
}

// create canvas object
function getCanvas() {
    alert('in canvas');
    formpdf.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
    return html2canvas(formpdf, {
        imageTimeout: 2000,
        removeContainer: true
    });

    alert('finish canvas');
}


// chop image horizontally
function splitImage(e) {
    alert('in splitImage');
    var totalImgs = Math.round(formHeight/winHeight);
    for(var i = 0; i < totalImgs; i++) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        canvas.width = formWidth;
        canvas.height = winHeight;
        //                    source region                   dest. region
        ctx.drawImage(canvasImage, 0, i * winHeight, formWidth, winHeight, 0, 0, canvas.width, canvas.height);

        imagePieces.push(canvas.toDataURL("image/png"));
    }
    console.log(imagePieces.length);
    createPDF();
}

// crete pdf using chopped images
function createPDF() {
    var totalPieces = imagePieces.length - 1;
    var doc = new jsPDF({
        unit: 'px',
        format: 'a4'
    });
    imagePieces.forEach(function(img){
        doc.addImage(img, 'JPEG', 20, 40);
        if(totalPieces)
            doc.addPage();
        totalPieces--;
    });
    doc.save('techumber-html-to-pdf.pdf');
    formpdf.width(cache_width);
}